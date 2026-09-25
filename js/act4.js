function initAct4(containerId, onDone) {
  const el = document.getElementById(containerId);

  el.innerHTML = `<div id="act4-scene">
    <div id="act4-bg-deco"></div>
    <canvas id="act4-canvas"></canvas>

    <!-- PART A: dialog box -->
    <div id="act4-dialog">
      <div class="a4-titlebar">
        <span class="a4-titlebar-title">LOVE.exe</span>
        <div class="a4-titlebar-btns">
          <span>─</span><span>□</span><span>✕</span>
        </div>
      </div>
      <div class="a4-dialog-body">
        <div class="a4-dots">
          <span>♥</span><span>·</span><span>♥</span><span>·</span><span>♥</span>
        </div>
        <p class="a4-question">♡ Happy 1 year, my love ♡<br>Still love me?</p>
        <div id="act4-cat">
          <!-- CSS pixel cat -->
          <div class="cat-face">
            <div class="cat-ear left"></div>
            <div class="cat-ear right"></div>
            <div class="cat-inner-ear left"></div>
            <div class="cat-inner-ear right"></div>
            <div class="cat-eye left" id="cat-eye-l"></div>
            <div class="cat-eye right" id="cat-eye-r"></div>
            <div class="cat-blush left"></div>
            <div class="cat-blush right"></div>
            <div class="cat-nose"></div>
            <div class="cat-mouth" id="cat-mouth"></div>
            <div class="cat-heart visible" id="cat-heart">♥</div>
          </div>
        </div>
        <div class="a4-btn-row">
          <button id="a4-yes">YES</button>
          <button id="a4-no">NO</button>
        </div>
      </div>
    </div>

    <div id="act4-no-warning" aria-hidden="true">
      <img src="Img/milk-and-mocha-ezgif.com-added-text.gif" alt="Milk and Mocha" />
    </div>

    <!-- PART B: love meter -->
    <div id="act4-meter">
      <p class="meter-title" id="meter-title">How much do you love me?</p>
      <img class="meter-baby" id="meter-baby" src="Img/shy.gif" alt="Shy baby" />
      <p class="meter-reaction" id="meter-reaction">drag the needle...</p>
      <div class="meter-wrap">
        <canvas id="meter-canvas" width="300" height="170"></canvas>
        <div class="meter-pct" id="meter-pct">0%</div>
      </div>
      <p class="meter-hint">hold and drag left or right</p>
    </div>

    <!-- PART B payoff -->
    <div id="act4-payoff">
      <img class="payoff-gif" src="Img/peach-and-goma-peach-loves-goma.gif" alt="Peach and Goma in love" />
      <p class="payoff-text">♥ I love you babe ♥</p>
      <button id="act4-next">keep going →</button>
    </div>

  </div>`;

  /* ── STYLES ── */
  const style = document.createElement('style');
  style.textContent = `
  #act4-scene {
    position: fixed; inset: 0;
    min-height: 100dvh;
    background-color: #ffadc8;
    background-image:
      linear-gradient(90deg, rgba(255,255,255,.28) 50%, transparent 50%),
      linear-gradient(rgba(255,255,255,.28) 50%, transparent 50%);
    background-size: 28px 28px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
    font-family: 'Fredoka One', cursive;
  }
  #act4-canvas {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 10;
  }
  #act4-no-warning {
    position: absolute; inset: 0; z-index: 30;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255, 220, 231, 0.96);
    opacity: 0; pointer-events: none;
    transition: opacity 0.25s ease;
  }
  #act4-no-warning.visible {
    opacity: 1; pointer-events: all;
  }
  #act4-no-warning img {
    width: min(360px, 82vw); max-height: 72vh;
    object-fit: contain; image-rendering: auto;
  }
  #act4-bg-deco {
    position: absolute; inset: 0;
    pointer-events: none; overflow: hidden; z-index: 0;
  }
  .a4-bg-sym {
    position: absolute; bottom: -20px;
    animation: a4float linear infinite;
    color: rgba(232,84,122,0.25);
  }
  @keyframes a4float {
    0%   { transform: translateY(0) rotate(0deg); opacity:0; }
    10%  { opacity:1; }
    100% { transform: translateY(-110vh) rotate(20deg); opacity:0; }
  }

  /* ── DIALOG ── */
  #act4-dialog {
    position: relative; z-index: 5;
    background: #ffdce7;
    border: 4px solid #c85d73;
    border-radius: 0;
    width: min(390px, 92vw);
    box-shadow: 8px 8px 0 rgba(151,58,79,.3);
    opacity: 0; transform: scale(0.85);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  #act4-dialog.visible { opacity:1; transform: scale(1); }

  .a4-titlebar {
    background: #df7f98;
    border-bottom: 4px solid #c85d73;
    border-radius: 0;
    padding: 8px 12px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .a4-titlebar-title {
    color: white; font-size: 17px; letter-spacing: .05em;
  }
  .a4-titlebar-btns {
    display: flex; gap: 8px;
    color: rgba(255,255,255,0.7); font-size: 14px; cursor: default;
  }

  .a4-dialog-body {
    padding: 18px 20px 22px;
    display: flex; flex-direction: column; align-items: center; gap: 12px;
  }
  .a4-dots { display:flex; gap:6px; font-size:22px; color:#e8547a; }
  .a4-question {
    font-family: 'Courier New', monospace;
    font-size: clamp(18px, 4.8vw, 22px); font-weight: 700;
    color: #682b3d; text-align: center; line-height: 1.5;
    text-shadow: 1px 1px 0 rgba(255,255,255,.45);
  }

  /* ── PIXEL CAT ── */
  .cat-face {
    position: relative;
    width: 144px; height: 124px;
    background: #17151b;
    border-radius: 0;
    border: 0;
    clip-path: polygon(
      0 24%, 8% 24%, 8% 10%, 20% 10%, 20% 0,
      34% 0, 34% 10%, 66% 10%, 66% 0, 80% 0,
      80% 10%, 92% 10%, 92% 24%, 100% 24%,
      100% 82%, 90% 82%, 90% 92%, 78% 92%, 78% 100%,
      22% 100%, 22% 92%, 10% 92%, 10% 82%, 0 82%
    );
    image-rendering: pixelated;
    flex-shrink: 0;
  }
  .cat-ear {
    display: none;
  }
  .cat-inner-ear {
    display: none;
  }

  .cat-eye {
    position: absolute; top: 35px;
    width: 34px; height: 30px;
    background: #fffaf3; border-radius: 0;
    border: 0;
  }
  .cat-eye::after {
    content: '';
    display: block;
    position: absolute;
    top: 8px;
    left: 12px;
    width: 10px;
    height: 14px;
    background: #17151b;
  }
  .cat-eye.left  { left: 23px; }
  .cat-eye.right { right: 23px; }

  /* happy eyes — curved lines */
  .cat-eye.happy {
    background: transparent; border: none;
    width: 16px; height: 8px;
    border-top: 3px solid white;
    border-radius: 50% 50% 0 0;
    top: 24px;
  }
  .cat-eye.happy::after { display: none; }

  /* squint — wide arcs */
  .cat-eye.squint {
    background: transparent; border: none;
    width: 16px; height: 5px;
    border-top: 3px solid white;
    border-radius: 50% 50% 0 0;
    top: 26px;
  }
  .cat-eye.squint::after { display: none; }

  .cat-blush {
    display: block;
    position: absolute;
    top: 76px;
    width: 18px;
    height: 7px;
    background: #f15d7d;
    opacity: 0.9;
  }
  .cat-blush.left {
    left: 18px;
  }
  .cat-blush.right {
    right: 18px;
  }

  .cat-nose {
    display: none;
  }

  .cat-mouth {
    display: none;
  }
  .cat-mouth.happy {
    border-bottom: 3px solid white;
    border-left: 3px solid white;
    border-right: 3px solid white;
    border-radius: 0 0 14px 14px;
    width: 28px; height: 12px;
    top: 48px;
  }
  .cat-mouth.flat {
    border-bottom: none;
    border-top: 2.5px solid white;
    border-radius: 10px 10px 0 0;
    top: 54px;
  }

  .cat-heart {
    position: absolute; top: 62px; left: 50%;
    transform: translateX(-50%);
    font-size: 70px; line-height: .8; color: #ed3f5f;
    text-shadow: 4px 4px 0 #b92d4c;
    opacity: 0; transition: opacity 0.3s;
  }
  .cat-heart.visible { opacity: 1; }

  @keyframes act4-happy-jump {
    0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
    18%      { transform: translateX(-22px) translateY(-24px) rotate(-5deg); }
    36%      { transform: translateX(-22px) translateY(0) rotate(-5deg); }
    54%      { transform: translateX(22px) translateY(-24px) rotate(5deg); }
    72%      { transform: translateX(22px) translateY(0) rotate(5deg); }
    88%      { transform: translateX(0) translateY(-12px) rotate(0deg); }
  }
  #act4-cat.act4-happy-jump {
    animation: act4-happy-jump 1.25s ease-in-out 2;
  }

  /* ── YES / NO BUTTONS ── */
  .a4-btn-row {
    display: flex; gap: 16px; margin-top: 4px; width: 100%;
    justify-content: center;
  }
  #a4-yes {
    background: #e8547a; color: white;
    border: 3px solid #c94070;
    border-radius: 0; padding: 10px 36px;
    font-family: 'Fredoka One', cursive; font-size: 24px;
    cursor: pointer; letter-spacing: .08em;
    box-shadow: 3px 3px 0 #c94070;
    transition: transform .2s ease, box-shadow .1s;
  }
  #a4-yes:active { transform: translate(2px,2px); box-shadow: 1px 1px 0 #c94070; }

  #a4-no {
    background: #fff0f5; color: #e8547a;
    border: 3px solid #e8547a;
    border-radius: 0; padding: 10px 36px;
    font-family: 'Fredoka One', cursive; font-size: 24px;
    cursor: pointer; letter-spacing: .08em;
    box-shadow: 3px 3px 0 #e8547a;
    position: relative; /* for dodge positioning */
    z-index: 20;
    transition: transform .15s ease, box-shadow .1s;
  }

  /* ── METER ── */
  #act4-meter {
    position: absolute; inset: 0; z-index: 4;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 14px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.8s ease;
  }
  #act4-meter.visible { opacity: 1; pointer-events: all; }

  .meter-title {
    font-family: 'Fredoka One', cursive;
    font-size: clamp(26px, 7.3vw, 41px);
    color: #682b3d; text-align: center;
    text-shadow: 1px 1px 0 rgba(255,255,255,.55);
  }
  .meter-baby {
    width: min(220px, 52vw);
    height: min(160px, 38vw);
    object-fit: contain;
    image-rendering: auto;
    filter: drop-shadow(0 5px 8px rgba(151,58,79,.18));
  }
  .meter-reaction {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(23px, 6.1vw, 32px);
    color: #8b3f56; min-height: 28px; text-align: center;
  }

  .meter-wrap {
    position: relative;
    width: 300px; display: flex;
    justify-content: center; align-items: flex-end;
  }
  #meter-canvas { cursor: grab; touch-action: none; }
  #meter-canvas:active { cursor: grabbing; }

  .meter-pct {
    position: absolute; bottom: 20px; left: 50%;
    transform: translateX(-50%);
    font-family: 'Fredoka One', cursive;
    font-size: 44px; color: #682b3d;
    text-shadow: 1px 1px 0 rgba(255,255,255,.7);
    pointer-events: none;
    transition: color .3s;
  }
  .meter-hint {
    font-family: 'Dancing Script', cursive;
    font-size: 23px; color: #8b3f56;
  }

  /* ── PAYOFF ── */
  #act4-payoff {
    position: absolute; inset: 0; z-index: 6;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 24px;
    opacity: 0; pointer-events: none;
    transition: opacity 1s ease;
  }
  #act4-payoff.visible { opacity: 1; pointer-events: all; }

  .payoff-gif {
    width: min(280px, 72vw);
    max-height: 42vh;
    object-fit: contain;
    filter: drop-shadow(0 8px 12px rgba(151,58,79,.2));
  }
  @keyframes payoff-bounce {
    0%,100% { transform: translateY(0) rotate(-3deg); }
    50%      { transform: translateY(-14px) rotate(3deg); }
  }
  #payoff-cat { animation: payoff-bounce .5s ease-in-out infinite; }

  .payoff-text {
    font-family: 'Fredoka One', cursive;
    font-size: clamp(26px, 7.3vw, 41px);
    color: #e8547a;
    text-shadow: 1px 1px 0 rgba(255,255,255,.8);
    text-align: center;
  }

  #act4-next {
    background: transparent;
    border: 2px solid rgba(232,84,122,0.5);
    border-radius: 40px;
    color: #e8547a;
    font-family: 'Fredoka One', cursive;
    font-size: 22px; padding: 10px 36px;
    cursor: pointer; letter-spacing: .06em;
    transition: all .2s;
  }
  #act4-next:hover {
    background: rgba(232,84,122,0.15);
    border-color: #e8547a; color: #e8547a;
  }

  @keyframes act4-shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-10px); }
    40%      { transform: translateX(10px); }
    60%      { transform: translateX(-8px); }
    80%      { transform: translateX(8px); }
  }
  .act4-shake { animation: act4-shake 0.4s ease; }

  @keyframes glitch {
    0%   { opacity: 1; transform: translateX(-50%) skewX(0deg); }
    20%  { opacity: 0.6; transform: translateX(-46%) skewX(-10deg); color: #ff0055; }
    40%  { opacity: 1; transform: translateX(-54%) skewX(5deg); color: #00ffff; }
    60%  { opacity: 0.8; transform: translateX(-50%) skewX(-3deg); }
    80%  { transform: translateX(-50%) skewX(0deg); color: #ffffff; }
    100% { opacity: 1; transform: translateX(-50%); color: #ffffff; }
  }
  .glitch { animation: glitch 0.6s steps(2) forwards; }
  `;
  document.head.appendChild(style);

  /* ── BG DECO ── */
  const bgEl = document.getElementById('act4-bg-deco');
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('span');
    s.className   = 'a4-bg-sym';
    s.textContent = ['♥','♡','✦','♥','♥'][Math.floor(Math.random()*5)];
    s.style.left  = Math.random()*100+'vw';
    s.style.bottom = '-20px';
    s.style.fontSize = (10+Math.random()*14)+'px';
    s.style.animationDuration = (7+Math.random()*8)+'s';
    s.style.animationDelay    = (Math.random()*8)+'s';
    bgEl.appendChild(s);
  }

  /* ── CANVAS BURST ── */
  const cvs  = document.getElementById('act4-canvas');
  cvs.width  = window.innerWidth;
  cvs.height = window.innerHeight;
  const ctx  = cvs.getContext('2d');
  let burst  = [];

  const COLS = ['#e8547a','#ff6b9d','#ffb3c8','#ff9eb5','#ffffff','#ffd6e0'];

  function spawnBurst(x, y, count = 80) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random()*Math.PI*2;
      const speed = 3 + Math.random()*9;
      burst.push({
        x, y,
        vx: Math.cos(angle)*speed,
        vy: Math.sin(angle)*speed - 4,
        size: 3 + Math.random()*5,
        color: COLS[Math.floor(Math.random()*COLS.length)],
        life: 1, decay: 0.013 + Math.random()*0.01,
        isHeart: Math.random() > 0.45
      });
    }
    drawBurst();
  }

  function drawBurst() {
    ctx.clearRect(0,0,cvs.width,cvs.height);
    burst = burst.filter(p => p.life > 0);
    burst.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.15;
      p.life -= p.decay;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle   = p.color;
      if (p.isHeart) {
        ctx.font = (p.size*3)+'px serif';
        ctx.fillText('♥', p.x, p.y);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1;
    if (burst.length > 0) requestAnimationFrame(drawBurst);
  }

  /* ══════════════════════════════
     PART A — DIALOG
  ══════════════════════════════ */
  const dialog   = document.getElementById('act4-dialog');
  const yesBtn   = document.getElementById('a4-yes');
  const noBtn    = document.getElementById('a4-no');
  const catEyeL  = document.getElementById('cat-eye-l');
  const catEyeR  = document.getElementById('cat-eye-r');
  const catMouth = document.getElementById('cat-mouth');
  const catHeart = document.getElementById('cat-heart');
  const btnRow   = noBtn.parentElement;
  const noWarning = document.getElementById('act4-no-warning');

  let noCount = 0;
  let yesScale = 1;
  let warningActive = false;

  // NO dodges
  noBtn.addEventListener('mouseenter', dodgeNo);
  noBtn.addEventListener('touchstart', dodgeNo, { passive: true });
  yesBtn.addEventListener('mouseenter', growYes);
  yesBtn.addEventListener('touchstart', growYes, { passive: true });

  function growYes() {
    yesScale = Math.min(1.35, yesScale + 0.08);
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.zIndex = '2';
  }

  function dodgeNo() {
    if (warningActive) return;
    noCount++;
    const scene  = document.getElementById('act4-scene');
    const sceneRect = scene.getBoundingClientRect();
    const bw     = noBtn.offsetWidth;
    const bh     = noBtn.offsetHeight;

    // Random position within the visible scene bounds.
    const maxX = Math.max(20, sceneRect.width - bw - 20);
    const maxY = Math.max(20, sceneRect.height - bh - 20);
    const newX = sceneRect.left + 10 + Math.random() * maxX;
    const newY = sceneRect.top + 10 + Math.random() * maxY;

    // Escape the transformed dialog stacking context before moving above the scene.
    if (noBtn.parentElement !== scene) scene.appendChild(noBtn);
    noBtn.style.position = 'fixed';
    noBtn.style.left     = newX + 'px';
    noBtn.style.top      = newY + 'px';
    noBtn.style.margin   = '0';

    // shrink a bit each time, min 0.5
    const scale = Math.max(0.5, 1 - noCount * 0.08);
    noBtn.style.transform = `scale(${scale})`;

    if (noCount === 5) {
      showNoWarning();
      return;
    }

    // cat reacts
    if (noCount >= 3) {
      catEyeL.className  = 'cat-eye left';
      catEyeR.className  = 'cat-eye right';
      catMouth.className = 'cat-mouth flat';
    }
  }

  function showNoWarning() {
    warningActive = true;
    noBtn.style.display = 'none';
    noWarning.classList.add('visible');

    setTimeout(() => {
      noWarning.classList.remove('visible');
      warningActive = false;
      noCount = 0;
      btnRow.appendChild(noBtn);
      noBtn.style.display = '';
      noBtn.style.position = '';
      noBtn.style.left = '';
      noBtn.style.top = '';
      noBtn.style.margin = '';
      noBtn.style.transform = '';
      catEyeL.className = 'cat-eye left';
      catEyeR.className = 'cat-eye right';
      catMouth.className = 'cat-mouth';
      dialog.style.display = '';
      dialog.style.opacity = '1';
      dialog.style.transform = 'scale(1)';
    }, 5000);
  }

  // YES fires
  yesBtn.addEventListener('click', () => {
    // reset no button
    noBtn.style.display = 'none';
    btnRow.appendChild(noBtn);
    noBtn.style.position  = '';
    noBtn.style.left      = '';
    noBtn.style.top       = '';
    noBtn.style.transform = '';
    yesBtn.style.transform = '';
    yesScale = 1;

    // cat goes happy
    catEyeL.className  = 'cat-eye left happy';
    catEyeR.className  = 'cat-eye right happy';
    catMouth.className = 'cat-mouth happy';
    catHeart.classList.add('visible');
    setTimeout(() => {
      document.getElementById('act4-cat').classList.add('act4-happy-jump');
    }, 250);

    // burst from dialog center
    const rect = dialog.getBoundingClientRect();
    spawnBurst(rect.left + rect.width/2, rect.top + rect.height/2, 60);

    // transition to meter
    setTimeout(() => {
      dialog.style.opacity = '0';
      dialog.style.transform = 'scale(0.9)';
    }, 2600);
    setTimeout(() => {
      dialog.style.display = 'none';
      showMeter();
    }, 3000);
  });

  // show dialog
  setTimeout(() => dialog.classList.add('visible'), 400);

  /* ══════════════════════════════
     PART B — LOVE METER
  ══════════════════════════════ */
  function showMeter() {
    const meter = document.getElementById('act4-meter');
    meter.classList.add('visible');
    initMeter();
  }

  function initMeter() {
    const mc       = document.getElementById('meter-canvas');
    const mctx     = mc.getContext('2d');
    const pctEl    = document.getElementById('meter-pct');
    const reactEl  = document.getElementById('meter-reaction');
    const babyEl   = document.getElementById('meter-baby');

    const CX = mc.width / 2;
    const CY = mc.height - 20;
    const R  = 120;

    let angle    = 0;     // 0 = far left, 1 = far right
    let broken   = false;
    let dragging = false;
    let lastPointerX = 0;
    let hasMoved = false;

    const REACTIONS = [
      { at: 0,   text: 'only that much?',    eyes: '',       mouth: ''      },
      { at: 0.1, text: 'hmm...',             eyes: '',       mouth: ''      },
      { at: 0.3, text: 'is that it? 😐',     eyes: 'squint', mouth: 'flat' },
      { at: 0.5, text: 'Half?? Seriously??', eyes: 'squint', mouth: 'flat' },
      { at: 0.75,text: 'you better keep going...', eyes: 'squint', mouth: '' },
      { at: 0.9, text: 'almost there...',    eyes: '',       mouth: ''      },
      { at: 1.0, text: '100%... really?',    eyes: '',       mouth: ''      },
    ];

    function drawGauge(pct) {
      mctx.clearRect(0, 0, mc.width, mc.height);

      const startA = Math.PI;
      const endA   = 0;
      const fillA  = Math.PI + pct * Math.PI;

      // track bg
      mctx.beginPath();
      mctx.arc(CX, CY, R, Math.PI, 0, false);
      mctx.strokeStyle = 'rgba(255,255,255,0.1)';
      mctx.lineWidth   = 22;
      mctx.lineCap     = 'round';
      mctx.stroke();

      // fill gradient
      const grad = mctx.createLinearGradient(CX-R, CY, CX+R, CY);
      grad.addColorStop(0,   '#ff9eb5');
      grad.addColorStop(0.5, '#e8547a');
      grad.addColorStop(1,   '#c94070');
      mctx.beginPath();
      mctx.arc(CX, CY, R, Math.PI, fillA, false);
      mctx.strokeStyle = grad;
      mctx.lineWidth   = 22;
      mctx.stroke();

      // tick marks
      for (let i = 0; i <= 10; i++) {
        const a   = Math.PI + (i/10)*Math.PI;
        const len = i % 5 === 0 ? 16 : 8;
        mctx.beginPath();
        mctx.moveTo(CX + (R-11)*Math.cos(a), CY + (R-11)*Math.sin(a));
        mctx.lineTo(CX + (R+len-11)*Math.cos(a), CY + (R+len-11)*Math.sin(a));
        mctx.strokeStyle = i % 5 === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)';
        mctx.lineWidth   = i % 5 === 0 ? 2 : 1;
        mctx.stroke();
      }

      // labels
      mctx.font      = 'bold 12px Nunito, sans-serif';
      mctx.fillStyle = 'rgba(255,255,255,0.45)';
      mctx.textAlign = 'center';
      [['0%', Math.PI], ['50%', Math.PI*1.5], ['100%', 0]].forEach(([lbl, a]) => {
        mctx.fillText(lbl,
          CX + (R+26)*Math.cos(a),
          CY + (R+26)*Math.sin(a) + 4
        );
      });

      // center label
      mctx.font      = 'bold 18px Fredoka One, cursive';
      mctx.fillStyle = 'rgba(255,255,255,0.3)';
      mctx.fillText('love', CX, CY - 18);

      // needle
      if (!broken) {
        const na = Math.PI + pct * Math.PI;
        const nx = CX + (R - 18) * Math.cos(na);
        const ny = CY + (R - 18) * Math.sin(na);
        mctx.beginPath();
        mctx.moveTo(CX, CY);
        mctx.lineTo(nx, ny);
        mctx.strokeStyle = '#ffffff';
        mctx.lineWidth   = 3;
        mctx.lineCap     = 'round';
        mctx.stroke();
        // pivot dot
        mctx.beginPath();
        mctx.arc(CX, CY, 7, 0, Math.PI*2);
        mctx.fillStyle = '#e8547a';
        mctx.fill();
        mctx.strokeStyle = '#ffffff';
        mctx.lineWidth   = 2;
        mctx.stroke();
      } else {
        // broken needle droops
        mctx.beginPath();
        mctx.moveTo(CX, CY);
        mctx.lineTo(CX + 15, CY - 10);
        mctx.lineTo(CX + 20, CY + 5);
        mctx.strokeStyle = 'rgba(255,255,255,0.5)';
        mctx.lineWidth   = 3; mctx.lineCap = 'round';
        mctx.stroke();
        mctx.beginPath();
        mctx.arc(CX, CY, 7, 0, Math.PI*2);
        mctx.fillStyle = '#555'; mctx.fill();
      }
    }

    function setBabyAnimation(src, alt) {
      if (babyEl.dataset.animation === src) return;
      babyEl.dataset.animation = src;
      babyEl.src = src;
      babyEl.alt = alt;
    }

    function updateReaction(pct) {
      if (!hasMoved) {
        reactEl.textContent = 'drag the needle...';
        setBabyAnimation('Img/shy.gif', 'Shy baby');
        return;
      }
      if (pct <= 0.3) {
        reactEl.textContent = 'only that much?';
        setBabyAnimation('Img/mochi-cat.gif', 'Mochi cat');
        return;
      }
      if (pct <= 0.5) {
        reactEl.textContent = 'that hurts';
        setBabyAnimation('Img/ezgif.com-remove-background.gif', 'Hurt reaction');
        return;
      }
      if (pct <= 0.7) {
        reactEl.textContent = 'Half?? Seriously??';
        setBabyAnimation('Img/peach-goma.gif', 'Peach and Goma');
        return;
      }
      if (pct <= 1.0) {
        reactEl.textContent = 'Aww, that is more like it!';
        setBabyAnimation('Img/heart-love.gif', 'Heart love');
        return;
      }
      let r = REACTIONS[0];
      for (const rx of REACTIONS) { if (pct >= rx.at) r = rx; }
      reactEl.textContent  = r.text;
      setBabyAnimation('Img/shy.gif', 'Shy baby');
    }

    drawGauge(0);
    updateReaction(0);

    // Horizontal drag logic: a click alone never changes the gauge.
    function onMove(clientX) {
      if (!dragging || broken) return;
      const deltaX = clientX - lastPointerX;
      lastPointerX = clientX;
      if (deltaX !== 0) hasMoved = true;
      angle = Math.max(0, Math.min(angle + deltaX / 260, 1.05));

      drawGauge(Math.min(angle, 1));
      updateReaction(angle);

      const display = Math.round(Math.min(angle, 1) * 100);
      pctEl.textContent = display + '%';

      // past 100% → BREAK
      if (angle > 1.0 && !broken) breakNeedle();
    }

    mc.addEventListener('pointerdown', event => {
      if (broken) return;
      dragging = true;
      lastPointerX = event.clientX;
      mc.setPointerCapture(event.pointerId);
    });
    mc.addEventListener('pointermove', event => onMove(event.clientX));
    mc.addEventListener('pointerup', event => {
      dragging = false;
      mc.releasePointerCapture?.(event.pointerId);
    });
    mc.addEventListener('pointercancel', () => dragging = false);

    function breakNeedle() {
      broken   = true;
      dragging = false;

      // glitch the percentage display
      const scene = document.getElementById('act4-scene');
      pctEl.textContent = 'ERROR';
      pctEl.classList.add('glitch');
      scene.classList.add('act4-shake');

      drawGauge(1);

      setTimeout(() => { pctEl.textContent = '∞'; pctEl.style.color = '#e8547a'; }, 600);

      reactEl.textContent = '💗 that\'s what I thought! 💗';
      setBabyAnimation('Img/yay.gif', 'Yay celebration');

      // big burst
      const rect = mc.getBoundingClientRect();
      spawnBurst(rect.left + CX, rect.top + CY - 40, 120);

      // show payoff
      setTimeout(() => {
        scene.classList.remove('act4-shake');
        document.getElementById('act4-meter').style.opacity = '0';
        document.getElementById('act4-meter').style.pointerEvents = 'none';
        setTimeout(() => showPayoff(), 400);
      }, 2200);
    }
  }

  /* ══════════════════════════════
     PAYOFF SCREEN
  ══════════════════════════════ */
  function showPayoff() {
    const payoff = document.getElementById('act4-payoff');
    payoff.classList.add('visible');

    // final burst
    spawnBurst(window.innerWidth/2, window.innerHeight/2, 100);

    document.getElementById('act4-next').addEventListener('click', () => {
      payoff.style.opacity = '0';
      setTimeout(() => {
        if (typeof onDone === 'function') onDone();
      }, 800);
    });
  }
}