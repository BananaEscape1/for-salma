function initAct6(containerId) {
  const el = document.getElementById(containerId);

  el.innerHTML = `<div id="act6-scene">
    <canvas id="act6-aurora"></canvas>
    <canvas id="act6-particles"></canvas>
    <div id="act6-content">
      <p id="act6-intro">and one last thing...</p>
      <div id="act6-scroll">
        <div id="act6-letter"></div>
        <div id="act6-signature" class="hidden">
          <p class="a6-love">I love you, Salma. ❤️</p>
          <p class="a6-anniversary">Happy anniversary, My Lovely Eepy Sou. ❤️</p>
          <p class="a6-from">— Ahmed</p>
        </div>
      </div>
    </div>
  </div>`;

  /* ── STYLES ── */
  const style = document.createElement('style');
  style.textContent = `
  #act6-scene {
    position: absolute; inset: 0;
    background: #050510;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; font-family: 'Nunito', sans-serif;
  }

  /* ── AURORA CANVAS ── */
  #act6-aurora {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 0;
    opacity: 0.85;
  }

  /* ── PARTICLES ── */
  #act6-particles {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 2;
  }

  /* ── CONTENT ── */
  #act6-content {
    position: relative; z-index: 3;
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-start;
    overflow-y: auto; padding: 48px 24px 80px;
    scrollbar-width: none;
  }
  #act6-content::-webkit-scrollbar { display: none; }

  /* ── INTRO LINE ── */
  #act6-intro {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(22px, 6vw, 36px);
    color: rgba(200,180,255,0.85);
    text-align: center;
    margin-bottom: 40px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 1.2s ease, transform 1.2s ease;
    letter-spacing: .04em;
    text-shadow: 0 0 20px rgba(180,140,255,0.5);
  }
  #act6-intro.visible {
    opacity: 1; transform: translateY(0);
  }

  /* ── SCROLL / LETTER ── */
  #act6-scroll {
    width: 100%; max-width: 640px;
    background: rgba(10, 5, 20, 0.65);
    border: 1px solid rgba(180,140,255,0.15);
    border-radius: 20px;
    padding: 36px 32px 40px;
    backdrop-filter: blur(20px);
    box-shadow:
      0 0 0 1px rgba(180,140,255,0.08),
      0 20px 60px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.05);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1s ease, transform 1s ease;
  }
  #act6-scroll.visible {
    opacity: 1; transform: translateY(0);
  }

  /* ── LETTER TEXT ── */
  #act6-letter {
    font-family: 'Nunito', sans-serif;
    font-size: clamp(13px, 3.2vw, 16px);
    line-height: 1.9;
    color: rgba(235, 225, 255, 0.88);
    text-align: left;
    white-space: pre-wrap;
  }

  #act6-letter strong {
    font-weight: 700;
    color: #e8547a;
    text-shadow: 0 0 10px rgba(232,84,122,0.4);
  }

  /* cursor blink */
  #act6-cursor {
    display: inline-block;
    width: 2px; height: 1.1em;
    background: rgba(200,180,255,0.8);
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: blink 0.8s step-end infinite;
  }
  @keyframes blink {
    0%,100% { opacity: 1; }
    50%      { opacity: 0; }
  }

  /* paragraph spacing */
  .a6-para { margin-bottom: 1.4em; }
  .a6-para:last-child { margin-bottom: 0; }

  /* ── SIGNATURE ── */
  #act6-signature {
    margin-top: 36px;
    display: flex; flex-direction: column;
    align-items: center; gap: 10px;
    border-top: 1px solid rgba(180,140,255,0.15);
    padding-top: 28px;
    opacity: 0; transition: opacity 2s ease;
  }
  #act6-signature.visible { opacity: 1; }
  #act6-signature.hidden  { display: none; }

  .a6-love {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(24px, 6.5vw, 40px);
    color: #e8547a;
    text-align: center; line-height: 1.3;
    text-shadow:
      0 0 20px rgba(232,84,122,0.6),
      0 0 50px rgba(232,84,122,0.3);
    animation: love-pulse 2.5s ease-in-out infinite;
  }
  @keyframes love-pulse {
    0%,100% { text-shadow: 0 0 20px rgba(232,84,122,0.6), 0 0 50px rgba(232,84,122,0.3); }
    50%      { text-shadow: 0 0 35px rgba(232,84,122,0.9), 0 0 80px rgba(232,84,122,0.5); }
  }

  .a6-anniversary {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(18px, 5vw, 28px);
    color: rgba(200,180,255,0.8);
    text-align: center;
    text-shadow: 0 0 16px rgba(180,140,255,0.4);
  }

  .a6-from {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(15px, 4vw, 22px);
    color: rgba(200,180,255,0.45);
    text-align: center; margin-top: 4px;
  }
  `;
  document.head.appendChild(style);

  /* ══════════════════════════════
     AURORA CANVAS
  ══════════════════════════════ */
  const auroraCanvas = document.getElementById('act6-aurora');
  const actx         = auroraCanvas.getContext('2d');

  function resizeAurora() {
    auroraCanvas.width  = window.innerWidth;
    auroraCanvas.height = window.innerHeight;
  }
  resizeAurora();
  window.addEventListener('resize', resizeAurora);

  /* aurora wave definitions */
  const waves = [
    { color: [120, 60, 220],  speed: 0.0004, amp: 0.22, freq: 1.8,  phase: 0,    yBase: 0.28 },
    { color: [180, 60, 200],  speed: 0.0006, amp: 0.18, freq: 2.2,  phase: 1.5,  yBase: 0.32 },
    { color: [232, 84, 122],  speed: 0.0003, amp: 0.15, freq: 1.5,  phase: 0.8,  yBase: 0.38 },
    { color: [100, 40, 180],  speed: 0.0005, amp: 0.20, freq: 2.8,  phase: 2.1,  yBase: 0.22 },
    { color: [200, 100, 200], speed: 0.0007, amp: 0.12, freq: 3.2,  phase: 3.0,  yBase: 0.44 },
    { color: [80,  30, 160],  speed: 0.0002, amp: 0.25, freq: 1.2,  phase: 4.5,  yBase: 0.18 },
  ];

  let auroraTime = 0;

  function drawAurora(ts) {
    auroraTime = ts * 0.001;
    const W = auroraCanvas.width;
    const H = auroraCanvas.height;

    actx.clearRect(0, 0, W, H);

    waves.forEach(w => {
      const phase = auroraTime * w.speed * 10000 + w.phase;

      /* build the aurora curtain shape */
      actx.beginPath();
      actx.moveTo(0, H);

      const steps = 80;
      for (let i = 0; i <= steps; i++) {
        const x  = (i / steps) * W;
        const t  = (i / steps) * Math.PI * 2 * w.freq + phase;
        const y  = H * w.yBase + Math.sin(t) * H * w.amp
                 + Math.sin(t * 1.7 + phase * 0.5) * H * w.amp * 0.4;
        if (i === 0) actx.moveTo(x, y);
        else         actx.lineTo(x, y);
      }

      actx.lineTo(W, H);
      actx.lineTo(0, H);
      actx.closePath();

      const [r, g, b] = w.color;
      const grad = actx.createLinearGradient(0, H * (w.yBase - w.amp), 0, H);
      grad.addColorStop(0,   `rgba(${r},${g},${b},0.0)`);
      grad.addColorStop(0.3, `rgba(${r},${g},${b},0.18)`);
      grad.addColorStop(0.6, `rgba(${r},${g},${b},0.10)`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0.0)`);

      actx.fillStyle = grad;
      actx.fill();
    });

    requestAnimationFrame(drawAurora);
  }
  requestAnimationFrame(drawAurora);

  /* ══════════════════════════════
     FLOATING PARTICLES
  ══════════════════════════════ */
  const pCanvas = document.getElementById('act6-particles');
  const pctx    = pCanvas.getContext('2d');
  pCanvas.width  = window.innerWidth;
  pCanvas.height = window.innerHeight;

  const particles = [];
  const PSYMS = ['♥','♡','✦','·','·','·','✦'];

  for (let i = 0; i < 35; i++) {
    particles.push({
      x:    Math.random() * pCanvas.width,
      y:    Math.random() * pCanvas.height,
      vy:   -(0.2 + Math.random() * 0.5),
      vx:   (Math.random() - 0.5) * 0.3,
      size: 8 + Math.random() * 10,
      sym:  PSYMS[Math.floor(Math.random() * PSYMS.length)],
      op:   Math.random(),
      dop:  0.003 + Math.random() * 0.004,
      color: Math.random() > 0.5
        ? `rgba(232,84,122,`
        : `rgba(180,140,255,`
    });
  }

  function drawParticles() {
    pctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    particles.forEach(p => {
      p.y  += p.vy;
      p.x  += p.vx;
      p.op += p.dop;
      if (p.op > 1)  { p.op = 1;  p.dop *= -1; }
      if (p.op < 0)  { p.op = 0;  p.dop *= -1; }
      if (p.y < -20) { p.y = pCanvas.height + 10; p.x = Math.random() * pCanvas.width; }

      pctx.globalAlpha = p.op * 0.55;
      pctx.fillStyle   = p.color + p.op * 0.55 + ')';
      pctx.font        = p.size + 'px serif';
      pctx.fillText(p.sym, p.x, p.y);
    });
    pctx.globalAlpha = 1;
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* ══════════════════════════════
     LETTER CONTENT
  ══════════════════════════════ */
  const PARAGRAPHS = [
    `A year ago, I thought I knew what loving someone looked like. I had a picture in my head — smooth, certain, uncomplicated. Then I spent a year with you, and that picture fell apart completely. What replaced it was so much more real that I don't think I have the right words for it yet. But I'm going to try anyway, because you deserve the attempt.`,

    `I've always kept a careful distance from the world. Not out of coldness — out of something quieter than fear but just as limiting. Most people I've met, I've kept at arm's length without ever quite deciding to. The kind of closeness where boundaries stop applying, where someone sees you fully and you let them — that used to shake me. And then there's you. Because of you I felt a whirlwind of things I didn't even know I was capable of feeling. Things I hadn't given myself permission to feel before. And somehow, impossibly, none of it frightened me. With you it just felt like finally exhaling after holding my breath for a very long time.`,

    `Someone once said all it takes is twenty seconds of insane bravery for something great to follow. I think about that a lot — and I think I've needed those twenty seconds more than once with you. The first time, walking into a room I didn't know would change everything. Then again when I asked you to join our movie nights, which sounds innocent enough, except I knew exactly why I was asking. And then once more, when I finally stopped pretending and just told you how I felt — the scariest and most necessary thing I've ever done. Three separate moments of borrowed courage. One very good outcome.`,

    `When I looked at you, the noise just stopped. Everything did. And in that quiet, one thought rose up so clearly it felt like it had always been there waiting: *I WANT MORE*. More time. More of her. The privilege — and I mean that word precisely — of simply being somewhere in her orbit. I walked out of that room already changed and had no idea.`,

    `I've loved listening to you this year more than I know how to say. Not just what you say — though that has undone me more times than I can count — but the way you say it. The way your laugh arrives before you've decided to let it, like it couldn't wait for permission. The way your smile does something to the weight of a room even through a screen, even across all the distance between us. I have spent this entire year being quietly wrecked by these things, and I would not change a single second of it.`,

    `But here is what I didn't expect: I didn't expect to love you more after the hard parts. I thought love was something you kept safe from difficulty — something fragile you protected so it wouldn't get scratched. I was wrong. Every fight we had, every misunderstanding that sat between us longer than it should have, every moment we discovered something about each other that neither of us quite knew how to hold yet — none of it made me love you less. Not once. Every single time, when the dust settled and I looked across at you, there was just more. More certainty. More depth. More of whatever this is that I don't have a word big enough for. Every hard thing we came through didn't diminish what we have — it proved it.`,

    `You are one of the strongest people I have ever known, and somehow also the most precious thing I have ever been trusted with. I don't take that lightly. I don't think I ever will.`,

    `You came in and shattered the way I saw the world. Not violently — gently, the way light fills a room without asking. I didn't notice it happening and then one day everything looked different and I couldn't remember what it had looked like before. I don't want to remember. That version of the world, the one without you in it, holds nothing for me now.`,

    `And somewhere in the middle of all of it, a question started living in me that hasn't left since: *what can I do for you? How many ways can I make you smile?* It's not a debt I'm trying to repay — it's just what you awakened in me. You've done more for me than you probably realize, and the only answer I've found is to keep showing up, keep learning you, keep finding new ways to make you feel everything you've made me feel.`,

    `So here is what I want to say, on this day, a year from that afternoon when everything quietly changed: I am not afraid of what we still don't know about each other. I am not afraid of the next fight, the next discovery, the next thing that tests us and makes us figure each other out all over again. I am looking forward to all of it — every new version of you I haven't met yet, every layer we haven't reached, every moment that will teach me how to love you in some way I don't know about yet. The more time I spend with you, the more I learn about you — it only deepens it. It always has. I don't think it's going to stop.`,

    `If I could give you anything today, I would give you the sky — every blue, unclouded inch of it. But since I can't, I'll give you this instead: me. Completely, stubbornly, and with absolutely no intention of stopping.`,

    `I chose you a year ago. I choose you today. And I will choose you every year that follows, for as long as you'll have me.`,
  ];
  /* ══════════════════════════════
     TYPEWRITER
  ══════════════════════════════ */
  const letterEl = document.getElementById('act6-letter');
  const sigEl    = document.getElementById('act6-signature');
  const introEl  = document.getElementById('act6-intro');
  const scrollEl = document.getElementById('act6-scroll');

  let paraIndex = 0;
  let charIndex = 0;
  let currentParaEl = null;
  let cursor = null;
  let typing = false;

  function createCursor() {
    cursor = document.createElement('span');
    cursor.id = 'act6-cursor';
    return cursor;
  }

  function nextPara() {
    if (paraIndex >= PARAGRAPHS.length) {
      /* all paragraphs done — show signature */
      if (cursor) cursor.remove();
      setTimeout(() => {
        sigEl.classList.remove('hidden');
        requestAnimationFrame(() => sigEl.classList.add('visible'));
      }, 600);
      return;
    }

    currentParaEl = document.createElement('p');
    currentParaEl.className = 'a6-para';
    letterEl.appendChild(currentParaEl);

    cursor = createCursor();
    currentParaEl.appendChild(cursor);

    charIndex = 0;
    typing    = true;
    typeChar();
  }

  /* speed: mobile-first comfortable pace */
  function getDelay() {
    const len = PARAGRAPHS[paraIndex]?.length || 100;
    if (len > 400) return 45;
    if (len > 200) return 55;
    return 65;
  }

  function typeChar() {
    if (!typing) return;
    const para = PARAGRAPHS[paraIndex];

    if (charIndex < para.length) {
      // Check if we're at an emphasized phrase (*text*)
      if (para[charIndex] === '*') {
        const endIdx = para.indexOf('*', charIndex + 1);
        if (endIdx !== -1) {
          const boldText = para.substring(charIndex + 1, endIdx);
          const strongEl = document.createElement('strong');
          strongEl.textContent = boldText;
          currentParaEl.insertBefore(strongEl, cursor);
          charIndex = endIdx + 1;
          
          /* only auto-scroll if near bottom */
          const content = document.getElementById('act6-content');
          const scrollDist = content.scrollHeight - content.scrollTop - content.clientHeight;
          if (scrollDist < 150) {
            content.scrollTop = content.scrollHeight;
          }
          
          setTimeout(typeChar, getDelay());
          return;
        }
      }

      const textNode = document.createTextNode(para[charIndex]);
      currentParaEl.insertBefore(textNode, cursor);
      charIndex++;

      /* only auto-scroll if near bottom */
      const content = document.getElementById('act6-content');
      const scrollDist = content.scrollHeight - content.scrollTop - content.clientHeight;
      if (scrollDist < 150) {
        content.scrollTop = content.scrollHeight;
      }

      setTimeout(typeChar, getDelay());
    } else {
      /* paragraph done */
      if (cursor) cursor.remove();
      paraIndex++;
      setTimeout(() => {
        nextPara();
      }, paraIndex < PARAGRAPHS.length ? 320 : 200);
    }
  }

  /* ── SEQUENCE ── */
  // 1 — intro line fades in
  setTimeout(() => {
    introEl.classList.add('visible');
  }, 500);

  // 2 — scroll card appears
  setTimeout(() => {
    scrollEl.classList.add('visible');
  }, 1800);

  // 3 — typing begins
  setTimeout(() => {
    nextPara();
  }, 2800);
}