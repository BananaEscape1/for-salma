(function () {
  const CODE    = '2510';
  const DOTS    = [0,1,2,3].map(i => document.getElementById('d' + i));
  const ERROR   = document.getElementById('pc-error');
  const BUTTONS = document.querySelectorAll('.pc-btn[data-n]');
  const DEL     = document.getElementById('pc-del');
  const OVERLAY = document.getElementById('wrong-overlay');
  const TRY_BTN = document.getElementById('try-again-btn');
  const HINT    = document.getElementById('wrong-hint');

  let entered = '';
  let locked  = false;
  let wrongAttempts = 0;
  let hintRevealed = false;
  const HINTS = [
    'It was in October.',
    'It was when I confessed.',
    'It is 2510.'
  ];

  // ── create hint reveal button ──
  const hintContainer = HINT.parentElement;
  const hintBtn = document.createElement('button');
  hintBtn.id = 'reveal-hint-btn';
  hintBtn.textContent = 'Reveal Hint';
  hintBtn.style.cssText = `
    background: rgba(232, 84, 122, 0.15);
    border: 1px solid rgba(232, 84, 122, 0.4);
    color: #e8547a;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    transition: all 0.3s ease;
    margin-bottom: 12px;
  `;
  hintBtn.addEventListener('mouseenter', () => {
    hintBtn.style.background = 'rgba(232, 84, 122, 0.25)';
    hintBtn.style.borderColor = 'rgba(232, 84, 122, 0.6)';
  });
  hintBtn.addEventListener('mouseleave', () => {
    hintBtn.style.background = 'rgba(232, 84, 122, 0.15)';
    hintBtn.style.borderColor = 'rgba(232, 84, 122, 0.4)';
  });
  hintContainer.insertBefore(hintBtn, HINT);

  // ── hide hint initially ──
  HINT.style.display = 'none';

  hintBtn.addEventListener('click', () => {
    hintRevealed = !hintRevealed;
    if (hintRevealed) {
      HINT.style.display = 'block';
      hintBtn.textContent = 'Hide Hint';
    } else {
      HINT.style.display = 'none';
      hintBtn.textContent = 'Reveal Hint';
    }
  });

  // ── spawn floating bg decorations ──
  const DECO    = document.getElementById('bg-deco');
  const SYMBOLS = ['♥','♥','♥','★','♥','✦','♥','♡','✿'];
  for (let i = 0; i < 24; i++) {
    const s = document.createElement('span');
    s.textContent          = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    s.style.left           = Math.random() * 100 + 'vw';
    s.style.bottom         = '-30px';
    s.style.fontSize       = (11 + Math.random() * 16) + 'px';
    s.style.color          = ['#e8547a','#f4879e','#c94070','#f7a8b8','#ffb3c8'][
                               Math.floor(Math.random() * 5)];
    s.style.animationDuration = (6 + Math.random() * 9) + 's';
    s.style.animationDelay    = (Math.random() * 8) + 's';
    DECO.appendChild(s);
  }

  // ── update dot indicators ──
  function updateDots() {
    DOTS.forEach((dot, i) => {
      dot.classList.toggle('filled', i < entered.length);
    });
  }

  // ── wrong code ──
  function wrongCode() {
    locked  = true;
    entered = '';
    wrongAttempts++;
    updateDots();
    HINT.textContent = HINTS[Math.min(wrongAttempts, HINTS.length) - 1];
    hintRevealed = false;
    HINT.style.display = 'none';
    document.getElementById('reveal-hint-btn').textContent = 'Reveal Hint';
    OVERLAY.classList.add('visible');
  }

  function tryAgain() {
    if (!OVERLAY.classList.contains('visible')) return;
    OVERLAY.classList.remove('visible');
    ERROR.textContent = '';
    locked = false;
  }

  TRY_BTN.addEventListener('click', tryAgain);

  // ── correct code ──
  function correctCode() {
    locked = true;
    // light up all dots
    DOTS.forEach(d => {
      d.style.background  = '#e8547a';
      d.style.borderColor = '#e8547a';
      d.style.transform   = 'scale(1.2)';
    });
    // dissolve to dark then hand off to Act 2
    setTimeout(() => {
      document.getElementById('dissolve').classList.add('visible');
    }, 500);
    setTimeout(() => {
      window.startAct2();
    }, 1500);
  }

  // ── handle button press ──
  function press(n) {
    if (locked || entered.length >= 4) return;
    entered += n;
    updateDots();
    if (entered.length === 4) {
      setTimeout(() => {
        if (entered === CODE) correctCode();
        else wrongCode();
      }, 140);
    }
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      tryAgain();
    } else if (/^\d$/.test(event.key)) {
      press(event.key);
    } else if (event.key === 'Backspace') {
      DEL.click();
    }
  });

  BUTTONS.forEach(btn =>
    btn.addEventListener('click', () => press(btn.dataset.n))
  );

  DEL.addEventListener('click', () => {
    if (locked) return;
    entered = entered.slice(0, -1);
    ERROR.textContent = '';
    updateDots();
  });

})();