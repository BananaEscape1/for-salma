function initMatrix(canvasId, onDone) {
  const canvas = document.getElementById(canvasId);
  const ctx    = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const CX = canvas.width  / 2;
  const CY = canvas.height / 2;

  const CHARS     = 'SALMA♥ILOVEYOU♡salma爱love'.split('');
  const FONT_SIZE = 14;
  const cols      = Math.floor(canvas.width / FONT_SIZE);
  const drops     = Array(cols).fill(0).map(() => Math.random() * -40);
  const speeds    = Array(cols).fill(0).map(() => 0.8 + Math.random() * 1.2);

  let phase          = 'rain';
  let frameCount     = 0;
  let particles      = [];
  let animId;
  let overlayOpacity = 0;
  let showOverlay    = false;

  const WORDS       = ['YOU', 'ARE', 'MY', 'LOVE'];
  let   wordIndex   = 0;
  const WORD_FONT   = Math.min(canvas.width * 0.52, 150);
  const HOLD_FRAMES = 55;
  const RAIN_FRAMES = 140;

  // ─────────────────────────────
  //  RAIN
  // ─────────────────────────────
  function drawRain(alpha = 0.12) {
    ctx.fillStyle = `rgba(13, 0, 16, ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = FONT_SIZE + 'px monospace';

    drops.forEach((y, i) => {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];

      // Draw a longer tail so the opening rain feels fuller.
      for (let trail = 3; trail >= 1; trail--) {
        if (y > trail) {
          ctx.fillStyle = trail === 1 ? '#ffb8c8' : '#e8547a';
          ctx.globalAlpha = trail === 1 ? 0.75 : 0.45;
          ctx.fillText(ch, i * FONT_SIZE, (y - trail) * FONT_SIZE);
        }
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#e8547a';
      ctx.fillText(ch, i * FONT_SIZE, y * FONT_SIZE);

      if (Math.random() > 0.85) {
        ctx.fillStyle = '#ff9eb5';
        ctx.fillText(ch, i * FONT_SIZE, y * FONT_SIZE);
      }

      if (y * FONT_SIZE > canvas.height && Math.random() > 0.92)
        drops[i] = 0;
      drops[i] += speeds[i];
    });
  }

  // ─────────────────────────────
  //  BUILD FROM TEXT — pure white
  // ─────────────────────────────
  function buildFromText(text, fontSize) {
    particles = [];
    const off  = document.createElement('canvas');
    off.width  = canvas.width;
    off.height = canvas.height;
    const octx = off.getContext('2d');

    octx.fillStyle    = '#ffffff';
    octx.font         = `${fontSize}px 'Fredoka One', cursive`;
    octx.textAlign    = 'left';
    octx.textBaseline = 'middle';

    const letterSpacing = Math.max(3, fontSize * 0.035);
    const widths = [...text].map(letter => octx.measureText(letter).width);
    const textWidth = widths.reduce((sum, width) => sum + width, 0)
      + letterSpacing * (text.length - 1);
    let textX = (canvas.width - textWidth) / 2;

    [...text].forEach((letter, i) => {
      octx.fillText(letter, textX, canvas.height / 2);
      textX += widths[i] + letterSpacing;
    });

    const data = octx.getImageData(0, 0, canvas.width, canvas.height).data;
    const gap  = 3;

    for (let x = 0; x < canvas.width; x += gap) {
      for (let y = 0; y < canvas.height; y += gap) {
        const idx = (y * canvas.width + x) * 4;
        if (data[idx + 3] > 128) {
          particles.push({
            tx:    x,
            ty:    y,
            x:     Math.random() * canvas.width,
            y:     Math.random() * canvas.height,
            color: '#ffffff',
            size:  1.8 + Math.random() * 2,
            speed: 0.06 + Math.random() * 0.04
          });
        }
      }
    }
  }

  // ─────────────────────────────
  //  BUILD HEART — fill only, no outline loop
  // ─────────────────────────────
function buildHeart() {
  particles = [];

  // 30% smaller than the original
  const scale = Math.min(canvas.width, canvas.height) * 0.0266;

  // More points for a smoother, denser outline
  for (let t = 0; t < Math.PI * 2; t += 0.0045) {
    const hx = CX + scale * 16 * Math.pow(Math.sin(t), 3);
    const hy = CY - scale * (
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t)
    );

    particles.push({
      tx: hx,
      ty: hy,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,

      color: Math.random() > 0.5
        ? '#e8547a'
        : '#ff6b9d',

      // Thicker / more solid neon appearance
      size: 5 + Math.random() * 2,

      speed: 0.06 + Math.random() * 0.04
    });
  }
}

  // ─────────────────────────────
  //  DRAW PARTICLES
  // ─────────────────────────────
  function drawAssemble(rainAlpha = 0.25, showRain = true) {
    ctx.fillStyle = `rgba(13, 0, 16, ${rainAlpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showRain) {
      ctx.font = FONT_SIZE + 'px monospace';
      drops.forEach((y, i) => {
        if (Math.random() > 0.72) {
          ctx.fillStyle = 'rgba(232,84,122,0.2)';
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            i * FONT_SIZE, y * FONT_SIZE
          );
          drops[i] += 0.2;
          if (drops[i] * FONT_SIZE > canvas.height) drops[i] = 0;
        }
      });
    }

    let settled = true;
    particles.forEach(p => {
      p.x += (p.tx - p.x) * p.speed;
      p.y += (p.ty - p.y) * p.speed;
      if (Math.abs(p.x - p.tx) > 0.8 || Math.abs(p.y - p.ty) > 0.8) settled = false;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    return settled;
  }

  // ─────────────────────────────
  //  EXPLODE
  // ─────────────────────────────
  function explodeParticles() {
    particles.forEach(p => {
      p.tx    = p.x + (Math.random() - 0.5) * canvas.width  * 1.4;
      p.ty    = p.y + (Math.random() - 0.5) * canvas.height * 1.4;
      p.speed = 0.1 + Math.random() * 0.08;
      p.color = '#e8547a';
    });
  }

  // ─────────────────────────────
  //  OVERLAY — pink text, centered inside heart
  // ─────────────────────────────
function drawOverlay() {
  if (!showOverlay) return;
  if (overlayOpacity < 1) overlayOpacity += 0.012;

  const alpha = Math.min(overlayOpacity, 1);
  const fsize = Math.min(canvas.width / 7, 44);

  ctx.save();
  ctx.globalAlpha  = alpha;
  ctx.font         = `bold ${fsize}px 'Fredoka One', cursive`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor  = '#ff6b9d';
  ctx.shadowBlur   = 20;
  ctx.fillStyle    = '#ffffff';
  ctx.fillText('I Love ♥ You Salma', CX, CY);
  ctx.restore();
}
  // ─────────────────────────────
  //  MAIN LOOP
  // ─────────────────────────────
  function loop() {
    frameCount++;
    animId = requestAnimationFrame(loop);

    if (phase === 'rain') {
      drawRain();
      if (frameCount >= RAIN_FRAMES) {
        phase = 'word-build';
        buildFromText(WORDS[wordIndex], WORD_FONT);
        frameCount = 0;
      }

    } else if (phase === 'word-build') {
      const done = drawAssemble(0.3, true);
      if (done && frameCount > 20) {
        phase = 'word-hold';
        frameCount = 0;
      }

    } else if (phase === 'word-hold') {
      drawAssemble(0.1, false);
      if (frameCount >= HOLD_FRAMES) {
        explodeParticles();
        phase = 'word-explode';
        frameCount = 0;
      }

    } else if (phase === 'word-explode') {
      drawAssemble(0.4, false);
      if (frameCount >= 28) {
        wordIndex++;
        if (wordIndex < WORDS.length) {
          buildFromText(WORDS[wordIndex], WORD_FONT);
          phase = 'word-build';
        } else {
          buildHeart();
          phase = 'heart-build';
        }
        frameCount = 0;
      }

    } else if (phase === 'heart-build') {
      const done = drawAssemble(0.25, true);
      drawOverlay();
      if (done && frameCount > 30) {
        showOverlay = true;
        phase = 'heart-hold';
        frameCount = 0;
      }

    } else if (phase === 'heart-hold') {
      drawAssemble(0.1, true);
      drawOverlay();
      if (frameCount >= 130) {
        phase = 'done';
        cancelAnimationFrame(animId);
        if (typeof onDone === 'function') onDone();
      }
    }
  }

  loop();
}