function initAct3(containerId, onDone) {
  const el = document.getElementById(containerId);

  el.innerHTML = `
    <div id="act3-scene">
      <div id="act3-hearts-bg"></div>
      <canvas id="act3-canvas"></canvas>
      <div id="act3-bow-wrap">
        <svg id="act3-bow" viewBox="0 0 100 200"
             xmlns="http://www.w3.org/2000/svg">
              <defs>
            <linearGradient id="act3-bow-wood" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stop-color="#63391f"/>
              <stop offset="0.48" stop-color="#9b6032"/>
              <stop offset="1" stop-color="#704020"/>
            </linearGradient>
              </defs>

                  <!-- pronounced S-shaped recurve limbs -->
                  <path d="M52 100 C72 88 78 73 65 59 C51 45 34 35 29 19 C27 13 30 9 35 12"
                stroke="url(#act3-bow-wood)" stroke-width="5.5" stroke-linecap="round"
                stroke-linejoin="round" fill="none"/>
                  <path d="M52 100 C72 112 78 127 65 141 C51 155 34 165 29 181 C27 187 30 191 35 188"
                stroke="url(#act3-bow-wood)" stroke-width="5.5" stroke-linecap="round"
                stroke-linejoin="round" fill="none"/>
                  <path d="M50 98 C67 87 72 74 62 61 M50 102 C67 113 72 126 62 139"
                stroke="#c4834b" stroke-width="1.2" stroke-linecap="round"
                fill="none" opacity="0.65"/>

                  <!-- straight string aligned with the arrow -->
                  <path id="act3-string" d="M35 12 L35 188"
                    stroke="#df5477" stroke-width="2" stroke-linecap="round" fill="none"/>

              <!-- compact wrapped grip -->
                  <rect x="47" y="87" width="12" height="26" rx="4"
                fill="#63391f" opacity="0.95"/>
                  <path d="M48 91 L58 91 M47 97 L59 97 M47 103 L59 103 M48 109 L58 109"
                stroke="#b87842" stroke-width="1" opacity="0.7"/>
        </svg>
      </div>

      <!-- arrow sitting on the string -->
      <div id="act3-arrow">
        <svg viewBox="0 0 150 18" width="150" height="18"
             xmlns="http://www.w3.org/2000/svg">
          <!-- heart arrowhead -->
          <path d="M132 9 C132 4 136 1 140 3 C144 1 148 4 148 8
           C148 12 140 17 140 17 C140 17 132 13 132 9Z"
                fill="#e8547a"
                stroke="#c94070" stroke-width="0.5"/>
          <!-- shaft -->
          <line x1="17" y1="9" x2="136" y2="9"
                stroke="#7a4a2a" stroke-width="2.5"
                stroke-linecap="round"/>
          <!-- nock -->
          <rect x="13" y="6" width="5" height="6" rx="1"
                fill="#5a3018"/>
          <!-- fletching left -->
          <path d="M25 9 L10 2 L16 9 L10 16 Z"
                fill="#ff9eb5" opacity="0.85"/>
        </svg>
      </div>

      <div id="act3-heart-target">♥</div>
      <p id="act3-instruction">Shoot the heart</p>

      <div id="act3-title">
        <p class="act3-sub">Happy</p>
        <h1 class="act3-main">1 Year My Love</h1>
        <div class="act3-line"></div>
        <p class="act3-tagline">♥ and every year after this, Salma ♥</p>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #act3-scene {
      position: absolute;
      inset: 0;
      background: linear-gradient(170deg, #fff5f0 0%, #ffe8ef 50%, #ffd6e0 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      cursor: crosshair;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
    }

    #act3-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
    }

    #act3-hearts-bg {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    }

    .act3-bg-heart {
      position: absolute;
      animation: act3-float linear infinite;
      opacity: 0;
      color: #e8547a;
    }

    @keyframes act3-float {
      0%   { transform: translateY(0) rotate(0deg);       opacity: 0; }
      10%  { opacity: 0.5; }
      90%  { opacity: 0.3; }
      100% { transform: translateY(-110vh) rotate(20deg);  opacity: 0; }
    }

    /* ── BOW ── */
    #act3-bow-wrap {
      position: absolute;
      bottom: 48px;
      left: 50%;
      transform: translateX(-50%);
      width: 116px;
      opacity: 0;
      transition: opacity 0.7s ease;
      z-index: 3;
    }
    #act3-bow-wrap.visible { opacity: 1; }
    #act3-bow-wrap.leaning {
      animation: none;
    }
    #act3-bow {
      width: 100%;
      filter: drop-shadow(0 2px 6px rgba(120,60,20,0.25));
      animation: bow-sway 2.2s ease-in-out infinite;
    }
    @keyframes bow-sway {
      0%,100% { transform: rotate(-4deg) translateY(0); }
      50%      { transform: rotate(4deg)  translateY(-3px); }
    }
    /* ── ARROW ── */
    #act3-arrow {
      position: absolute;
      left: 50%;
      top: calc(100% - 164px);
      transform-origin: 13px 9px;
      transform: rotate(0deg);
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 4;
    }
    #act3-arrow.visible { opacity: 1; }
    #act3-arrow.leaning {
      animation: none;
    }
    #act3-arrow.dragging { cursor: grabbing; }

    /* ── HEART TARGET ── */
    #act3-heart-target {
      position: absolute;
      top: 12%;
      left: 50%;
      transform: translateX(-50%) scale(0.7);
      font-size: clamp(329px, 90vw, 516px);
      line-height: 1;
      color: #e8547a;
      text-shadow:
        0 0 24px rgba(232,84,122,0.6),
        0 0 50px rgba(232,84,122,0.3);
      opacity: 0;
      transition: opacity 0.8s ease, transform 0.8s ease;
      z-index: 1;
    }
    #act3-heart-target.visible {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
    @keyframes heart-pulse {
      0%,100% { filter: drop-shadow(0 0 12px rgba(232,84,122,0.5)); }
      50%      { filter: drop-shadow(0 0 28px rgba(232,84,122,0.9)); }
    }
    #act3-heart-target.visible {
      opacity: 1;
      transform: translateX(-50%) scale(1);
      animation: heart-pulse 1.8s ease-in-out infinite;
    }
    #act3-instruction {
      position: absolute;
      top: 59%;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      color: #c4637e;
      font-family: 'Dancing Script', cursive;
      font-size: clamp(22px, 5vw, 32px);
      text-align: center;
      text-shadow: 0 2px 8px rgba(255,255,255,0.7);
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 3;
    }
    #act3-instruction.visible { opacity: 1; }
    #act3-instruction.hidden { opacity: 0; }
    @keyframes heart-hit {
      0%   { transform: translateX(-50%) scale(1); }
      25%  { transform: translateX(-50%) scale(1.6) rotate(-8deg); }
      55%  { transform: translateX(-50%) scale(0.85) rotate(5deg); }
      80%  { transform: translateX(-50%) scale(1.15); }
      100% { transform: translateX(-50%) scale(1.1); }
    }
    .heart-hit {
      animation: heart-hit 0.5s ease forwards !important;
    }

    .arrow-flying {
      transition: none !important;
    }

    /* ── TITLE ── */
    #act3-title {
      position: absolute;
      bottom: 0;
      left: 0; right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 24px 24px 52px;
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 1.1s ease, transform 1.1s ease;
      z-index: 3;
    }
    #act3-title.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .act3-sub {
      font-family: 'Dancing Script', cursive;
      font-size: clamp(18px, 4.5vw, 28px);
      color: #c4637e;
      letter-spacing: 0.1em;
    }
    .act3-main {
      font-family: 'Fredoka One', cursive;
      font-size: clamp(60px, 16vw, 110px);
      color: #e8547a;
      line-height: 1;
      text-shadow: 0 4px 20px rgba(232,84,122,0.2);
    }
    .act3-line {
      width: 90px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #e8547a, transparent);
      margin: 6px 0;
    }
    .act3-tagline {
      font-family: 'Dancing Script', cursive;
      font-size: clamp(15px, 3.8vw, 22px);
      color: #c4637e;
      text-align: center;
      opacity: 0.85;
    }
  `;
  document.head.appendChild(style);

  // ── bg hearts ──
  const bgEl = document.getElementById('act3-hearts-bg');
  ['♥','♡','♥','✦','♥','♥','♡'].forEach((sym, i) => {
    const s = document.createElement('span');
    s.className   = 'act3-bg-heart';
    s.textContent = sym;
    s.style.left  = (8 + i * 14) + 'vw';
    s.style.bottom = '-20px';
    s.style.fontSize = (10 + Math.random() * 12) + 'px';
    s.style.animationDuration = (8 + Math.random() * 7) + 's';
    s.style.animationDelay    = (Math.random() * 7) + 's';
    bgEl.appendChild(s);
  });

  // ── canvas particles ──
  const canvas = document.getElementById('act3-canvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx  = canvas.getContext('2d');
  let burst   = [];
  let confetti = [];
  let running  = false;

  const COLORS = ['#e8547a','#ff6b9d','#ffb3c8','#ff9eb5','#c94070','#ffd6e0','#ffffff'];

  // one-time explosion
  function spawnBurst(x, y) {
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 8;
      burst.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size:  3 + Math.random() * 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life:  1,
        decay: 0.014 + Math.random() * 0.01,
        isHeart: Math.random() > 0.4
      });
    }
  }

  // continuous confetti from heart position
  function spawnConfetti(x, y) {
    for (let i = 0; i < 4; i++) {
      confetti.push({
        x: x + (Math.random() - 0.5) * 60,
        y: y,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -(1 + Math.random() * 2),
        rot: Math.random() * 360,
        rotV: (Math.random() - 0.5) * 6,
        size:  4 + Math.random() * 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life:  1,
        decay: 0.006 + Math.random() * 0.005,
        shape: Math.random() > 0.4 ? 'heart' : 'rect'
      });
    }
  }

  let heartX, heartY;

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // burst
    burst = burst.filter(p => p.life > 0);
    burst.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.15;
      p.life -= p.decay;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle   = p.color;
      if (p.isHeart) {
        ctx.font = (p.size * 3) + 'px serif';
        ctx.fillText('♥', p.x, p.y);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // continuous confetti
    if (running && heartX && heartY) spawnConfetti(heartX, heartY);
    confetti = confetti.filter(p => p.life > 0);
    confetti.forEach(p => {
      p.x   += p.vx;
      p.y   += p.vy;
      p.vy  += 0.08;
      p.rot += p.rotV;
      p.life -= p.decay;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle   = p.color;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      if (p.shape === 'heart') {
        ctx.font = p.size * 2.5 + 'px serif';
        ctx.textAlign = 'center';
        ctx.fillText('♥', 0, 0);
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }
      ctx.restore();
    });

    ctx.globalAlpha = 1;
    if (burst.length > 0 || running) requestAnimationFrame(drawParticles);
  }

  // ── INTERACTIVE AIMING ──
  const scene = document.getElementById('act3-scene');
  const bow   = document.getElementById('act3-bow-wrap');
  const arrow = document.getElementById('act3-arrow');
  const heart = document.getElementById('act3-heart-target');
  const instruction = document.getElementById('act3-instruction');
  const title = document.getElementById('act3-title');
  const string = document.getElementById('act3-string');
  let aiming = false;
  let fired = false;
  let aimAngle = 0;
  let pullDistance = 0;
  let holdStart = 0;
  let pullFrame = null;
  let baseNockX = 0;
  let baseNockY = 0;

  function updateString() {
    const bend = Math.min(18, pullDistance * 0.25);
    string.setAttribute('d', `M35 12 L${35 - bend} 100 L35 188`);
  }

  function getStringMidpoint() {
    const midpoint = string.getPointAtLength(string.getTotalLength() / 2);
    const screenPoint = new DOMPoint(midpoint.x, midpoint.y).matrixTransform(string.getScreenCTM());
    const sceneRect = scene.getBoundingClientRect();
    return {
      x: screenPoint.x - sceneRect.left,
      y: screenPoint.y - sceneRect.top
    };
  }

  function placeArrowAtString() {
    const midpoint = getStringMidpoint();
    baseNockX = midpoint.x;
    baseNockY = midpoint.y;
    pullDistance = 0;
    aimAngle = 0;
    arrow.style.left = `${midpoint.x - 13}px`;
    arrow.style.top = `${midpoint.y - 9}px`;
    arrow.style.transform = 'rotate(0deg)';
  }

  function updateArrowPosition() {
    const radians = aimAngle * Math.PI / 180;
    const safeInset = 92;
    const desiredNockX = baseNockX - Math.cos(radians) * pullDistance;
    const desiredNockY = baseNockY - Math.sin(radians) * pullDistance;
    const desiredX = desiredNockX - 13;
    const desiredY = desiredNockY - 9;
    const safeX = Math.max(safeInset, Math.min(scene.clientWidth - safeInset, desiredX));
    const safeY = Math.max(24, Math.min(scene.clientHeight - 24, desiredY));
    arrow.style.left = `${safeX}px`;
    arrow.style.top = `${safeY}px`;
    arrow.style.transform = `rotate(${aimAngle}deg)`;
  }

  function animatePull(now) {
    if (!aiming || fired) return;
    pullDistance = Math.min(70, (now - holdStart) * 0.07);
    updateArrowPosition();
    updateString();
    pullFrame = requestAnimationFrame(animatePull);
  }

  function setAim(clientX, clientY) {
    const bowRect = bow.getBoundingClientRect();
    const bowX = bowRect.left + bowRect.width / 2;
    const bowY = bowRect.top + bowRect.height / 2;
    aimAngle = Math.atan2(clientY - bowY, clientX - bowX) * 180 / Math.PI;

    bow.style.transform = `translateX(-50%) rotate(${aimAngle}deg)`;
    updateArrowPosition();
  }

  function finishShot() {
    if (fired) return;
    fired = true;
    aiming = false;
    instruction.classList.add('hidden');
    cancelAnimationFrame(pullFrame);
    scene.releasePointerCapture?.(activePointerId);
    arrow.classList.remove('dragging');

    const arrowRect = arrow.getBoundingClientRect();
    const heartRect = heart.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();
    const startX = arrowRect.left + arrowRect.width / 2;
    const startY = arrowRect.top + arrowRect.height / 2;
    const targetX = heartRect.left + heartRect.width / 2;
    const targetY = heartRect.top + heartRect.height / 2;
    const shotAngle = Math.atan2(targetY - startY, targetX - startX) * 180 / Math.PI;
    const flightDuration = 560;
    const flightStart = performance.now();

    arrow.style.left = `${startX - sceneRect.left}px`;
    arrow.style.top = `${startY - sceneRect.top}px`;
    arrow.style.transform = `rotate(${shotAngle}deg)`;
    arrow.classList.add('arrow-flying');

    function animateArrow(now) {
      const progress = Math.min(1, (now - flightStart) / flightDuration);
      const currentX = startX + (targetX - startX) * progress;
      const currentY = startY + (targetY - startY) * progress;
      arrow.style.left = `${currentX - sceneRect.left}px`;
      arrow.style.top = `${currentY - sceneRect.top}px`;
      arrow.style.opacity = String(1 - progress);
      if (progress < 1) requestAnimationFrame(animateArrow);
    }
    requestAnimationFrame(animateArrow);

    setTimeout(() => {
      heart.classList.remove('heart-pulse');
      heart.classList.add('heart-hit');
      bow.style.opacity = '0';

      const rect = heart.getBoundingClientRect();
      heartX = rect.left + rect.width / 2;
      heartY = rect.top + rect.height / 2;
      spawnBurst(heartX, heartY);
      running = true;
      drawParticles();

      setTimeout(() => title.classList.add('visible'), 750);
      setTimeout(() => {
        running = false;
        if (typeof onDone === 'function') onDone();
      }, 5000);
    }, 560);
  }

  let activePointerId = null;
  scene.addEventListener('pointerdown', event => {
    if (fired || !bow.classList.contains('visible')) return;
    aiming = true;
    activePointerId = event.pointerId;
    scene.setPointerCapture(event.pointerId);
    arrow.classList.add('dragging');
    const sceneRect = scene.getBoundingClientRect();
    setAim(event.clientX, event.clientY);
    const stringMidpoint = getStringMidpoint();
    baseNockX = stringMidpoint.x;
    baseNockY = stringMidpoint.y;
    pullDistance = 0;
    holdStart = performance.now();
    updateArrowPosition();
    pullFrame = requestAnimationFrame(animatePull);
  });

  scene.addEventListener('pointermove', event => {
    if (aiming && event.pointerId === activePointerId) {
      setAim(event.clientX, event.clientY);
    }
  });

  scene.addEventListener('pointerup', event => {
    if (aiming && event.pointerId === activePointerId) finishShot();
  });

  scene.addEventListener('pointercancel', event => {
    if (aiming && event.pointerId === activePointerId) finishShot();
  });

  // Reveal the target and bow; the user controls the shot.
  setTimeout(() => {
    bow.classList.add('visible');
    heart.classList.add('visible');
    arrow.classList.add('visible');
    instruction.classList.add('visible');
    requestAnimationFrame(placeArrowAtString);
  }, 400);
}