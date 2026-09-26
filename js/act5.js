function initAct5(containerId, onDone) {
  const el = document.getElementById(containerId);

  const GIFTS = [
    { id: 'distance',    label: 'Gift 1', title: 'The Distance'        },
    { id: 'firstmsg',   label: 'Gift 2', title: 'Where It Started'    },
    { id: 'confession', label: 'Gift 3', title: 'The Confession'       },
    { id: 'firstsong',  label: 'Gift 4', title: 'First Song'           },
    { id: 'ngnlz',      label: 'Gift 5', title: 'First Movie Night'    },
    { id: 'bf',         label: 'Gift 6', title: 'First Recommendation' },
    { id: 'howl',       label: 'Gift 7', title: 'Our Comfort Movie'    },
    { id: 'days',       label: 'Gift 8', title: '365 Days'             },
    { id: 'whatyouare', label: 'Gift 9', title: 'What You Are'         },
  ];

  const opened = new Set();
  let currentGift = null;

  el.innerHTML = `<div id="act5-scene">
    <canvas id="act5-canvas"></canvas>
    <div id="act5-bg-deco"></div>

    <div id="act5-selection">
      <p class="a5-top-label">i got you something...</p>
      <h2 class="a5-title">pick a gift ♥</h2>
      <div id="act5-grid"></div>
      <div id="act5-unlock" class="a5-unlock hidden">
        <button id="act5-unlock-btn">one more thing... →</button>
      </div>
    </div>

    <div id="act5-panel" class="hidden">
      <button id="act5-back">← back</button>
      <div id="act5-content"></div>
    </div>

    <div id="act5-lightbox" aria-hidden="true">
      <button id="act5-lightbox-close" aria-label="Close image">×</button>
      <img id="act5-lightbox-image" alt="Enlarged view" />
    </div>
  </div>`;

  const style = document.createElement('style');
  style.textContent = `
  #act5-scene {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, #1a0a20 0%, #2a0a2a 50%, #1a0a20 100%);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; font-family: 'Fredoka One', cursive;
  }
  #act5-canvas {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 10;
  }
  #act5-bg-deco {
    position: absolute; inset: 0; pointer-events: none;
    overflow: hidden; z-index: 0;
  }
  .a5-bg-sym {
    position: absolute; bottom: -20px;
    animation: a5float linear infinite; color: rgba(200,150,255,0.2);
  }
  @keyframes a5float {
    0%   { transform: translateY(0) rotate(0deg); opacity:0; }
    10%  { opacity:1; }
    100% { transform: translateY(-110vh) rotate(20deg); opacity:0; }
  }

  /* ── SELECTION ── */
  #act5-selection {
    position: relative; z-index: 2;
    display: flex; flex-direction: column;
    align-items: center; gap: 18px;
    width: 100%; padding: 28px 16px;
    overflow-y: auto; max-height: 100vh;
  }
  .a5-top-label {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(17px, 4.5vw, 24px);
    color: rgba(200,150,255,0.7); letter-spacing: .06em;
  }
  .a5-title {
    font-size: clamp(28px, 7vw, 44px); color: #e8547a;
    text-shadow: 0 0 20px rgba(232,84,122,0.4); margin-bottom: 4px;
  }

  /* ── GRID — 3 columns, 3 rows ── */
  #act5-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    width: 100%; max-width: 420px;
  }

  .a5-gift {
    display: flex; flex-direction: column;
    align-items: center; gap: 5px;
    cursor: pointer; position: relative;
    animation: gift-idle 2.2s ease-in-out infinite;
  }
  .a5-gift:nth-child(2) { animation-delay: 0.3s; }
  .a5-gift:nth-child(3) { animation-delay: 0.6s; }
  .a5-gift:nth-child(4) { animation-delay: 0.9s; }
  .a5-gift:nth-child(5) { animation-delay: 1.2s; }
  .a5-gift:nth-child(6) { animation-delay: 1.5s; }
  .a5-gift:nth-child(7) { animation-delay: 1.8s; }
  .a5-gift:nth-child(8) { animation-delay: 2.1s; }
  .a5-gift:nth-child(9) { animation-delay: 2.4s; }

  @keyframes gift-idle {
    0%,100% { transform: translateY(0) rotate(-1deg); }
    50%      { transform: translateY(-7px) rotate(1deg); }
  }
  .a5-gift:hover {
    animation: gift-hover 0.4s ease-in-out infinite alternate;
  }
  @keyframes gift-hover {
    from { transform: translateY(0) scale(1.05) rotate(-2deg); }
    to   { transform: translateY(-10px) scale(1.08) rotate(2deg); }
  }
  .a5-gift img {
    width: clamp(72px, 18vw, 100px); height: clamp(72px, 18vw, 100px);
    object-fit: contain;
    filter: drop-shadow(0 4px 10px rgba(200,100,255,0.4));
    transition: filter .2s, transform .2s, opacity .2s;
  }
  .a5-gift:hover img {
    filter: drop-shadow(0 6px 16px rgba(232,84,122,0.7));
  }
  .a5-gift.opened img {
    filter: grayscale(0.3) brightness(0.75)
            drop-shadow(0 2px 6px rgba(200,100,255,0.2));
  }
  .a5-gift-label {
    font-size: 11px; color: rgba(255,255,255,0.4);
    letter-spacing: .04em; transition: color .2s; text-align: center;
  }
  .a5-gift:hover .a5-gift-label { color: #e8547a; }
  .a5-gift.opened .a5-gift-label { color: rgba(255,255,255,0.18); }
  .a5-gift.opened::after {
    content: '✓';
    position: absolute; top: -5px; right: 4px;
    font-size: 13px; color: #e8547a;
    text-shadow: 0 0 8px rgba(232,84,122,0.8);
  }

  /* ── UNLOCK ── */
  .a5-unlock { margin-top: 6px; transition: opacity .6s ease; }
  .a5-unlock.hidden { opacity: 0; pointer-events: none; }
  #act5-unlock-btn {
    background: linear-gradient(135deg, #e8547a, #c94070);
    color: white; border: none; border-radius: 40px;
    font-family: 'Fredoka One', cursive; font-size: 18px;
    padding: 14px 40px; cursor: pointer; letter-spacing: .06em;
    box-shadow: 0 4px 20px rgba(232,84,122,0.5);
    animation: pulse-btn 1.5s ease-in-out infinite;
  }
  @keyframes pulse-btn {
    0%,100% { box-shadow: 0 4px 20px rgba(232,84,122,0.5); }
    50%      { box-shadow: 0 4px 36px rgba(232,84,122,0.9); }
  }

  /* ── PANEL ── */
  #act5-panel {
    position: absolute; inset: 0; z-index: 5;
    display: flex; flex-direction: column; align-items: center;
    padding: 24px 20px 40px;
    background: linear-gradient(160deg, #1a0a20 0%, #2a0a2a 50%, #1a0a20 100%);
    overflow-y: auto;
    transform: translateX(100%);
    transition: transform 0.45s cubic-bezier(.4,0,.2,1);
  }
  #act5-panel.visible  { transform: translateX(0); }
  #act5-panel.hidden   { display: none; }

  #act5-back {
    align-self: flex-start;
    background: transparent; border: 1.5px solid rgba(232,84,122,0.4);
    border-radius: 20px; color: rgba(232,84,122,0.7);
    font-family: 'Fredoka One', cursive; font-size: 15px;
    padding: 7px 20px; cursor: pointer; margin-bottom: 20px;
    transition: all .2s;
  }
  #act5-back:hover { background: rgba(232,84,122,0.1); color: #e8547a; }

  #act5-content {
    width: 100%; max-width: 480px;
    display: flex; flex-direction: column;
    align-items: center; gap: 20px;
  }

  /* ── CARDS ── */
  .a5-card {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(232,84,122,0.18);
    border-radius: 20px; padding: 24px 20px;
    backdrop-filter: blur(8px);
  }
  .a5-card-title {
    font-size: clamp(20px, 5vw, 30px); color: #e8547a;
    text-align: center; margin-bottom: 14px;
    text-shadow: 0 0 12px rgba(232,84,122,0.4);
  }
  .a5-memory-date {
    display: block;
    margin: -8px 0 14px;
    font-family: 'Dancing Script', cursive;
    font-size: 18px;
    color: rgba(232,84,122,0.8);
    text-align: center;
  }
  .a5-card-body {
    font-family: 'Nunito', sans-serif;
    font-size: 15px; line-height: 1.75;
    color: rgba(255,255,255,0.8); text-align: center;
  }

  /* ── DISTANCE ── */
  .a5-map {
    width: 100%; padding: 16px 0;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
  }
  .a5-map-row {
    display: flex; align-items: center; gap: 12px; width: 100%; padding: 0 10px;
  }
  .a5-pin {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
  }
  .a5-pin-dot {
    width: 14px; height: 14px; border-radius: 50%;
    background: #e8547a; box-shadow: 0 0 10px rgba(232,84,122,0.8);
  }
  .a5-pin-label {
    font-family: 'Nunito', sans-serif;
    font-size: 13px; color: rgba(255,255,255,0.7); text-align: center;
  }
  .a5-dash-line {
    flex: 1; border-top: 2px dashed rgba(232,84,122,0.4); position: relative;
  }
  .a5-dash-line::after {
    content: '♥'; position: absolute; top: -11px; left: 50%;
    transform: translateX(-50%); font-size: 14px; color: #e8547a;
    text-shadow: 0 0 8px rgba(232,84,122,0.8);
    animation: hbeat 1.5s ease-in-out infinite;
  }
  @keyframes hbeat {
    0%,100% { transform: translateX(-50%) scale(1); }
    50%      { transform: translateX(-50%) scale(1.3); }
  }
  .a5-distance-km {
    font-size: 13px; color: rgba(255,255,255,0.4);
    font-family: 'Nunito', sans-serif; margin-top: 8px;
  }

  /* ── SCREENSHOT ── */
  .a5-screenshot {
    width: 100%; border-radius: 12px; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  }
  .a5-screenshot img { width: 100%; display: block; cursor: zoom-in; }

  /* ── MOVIE POSTER ── */
  .a5-poster-wrap {
    width: 100%; display: flex; justify-content: center; margin-bottom: 16px;
  }
  .a5-poster {
    width: 160px; border-radius: 12px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.6), 0 0 0 2px rgba(232,84,122,0.2);
    cursor: zoom-in; transition: transform .2s;
    display: block;
  }
  .a5-poster:hover { transform: scale(1.03); }

  /* film grain overlay on movie cards */
  .a5-movie-card {
    position: relative; overflow: hidden;
  }
  .a5-movie-card::before {
    content: '';
    position: absolute; inset: 0; border-radius: 20px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; opacity: 0.35; z-index: 1;
  }
  .a5-movie-card > * { position: relative; z-index: 2; }

  .a5-movie-tag {
    display: inline-block;
    font-family: 'Nunito', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase;
    color: #e8547a; border: 1px solid rgba(232,84,122,0.4);
    border-radius: 20px; padding: 3px 10px;
    margin-bottom: 12px;
  }
  .a5-movie-note {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(16px, 4.5vw, 22px);
    color: rgba(255,255,255,0.75); line-height: 1.65;
    text-align: center;
  }
  .a5-movie-note em { color: #e8547a; font-style: normal; }

  /* ── MUSIC PLAYER ── */
  .a5-player {
    width: 100%; background: #121212; border-radius: 16px; padding: 22px;
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }
  .a5-player-top {
    display: flex; align-items: center; gap: 14px; margin-bottom: 18px;
  }
  .a5-album-art {
    width: 64px; height: 64px; border-radius: 10px;
    flex-shrink: 0; object-fit: cover;
    box-shadow: 0 4px 12px rgba(232,84,122,0.4);
    display: block;
  }
  .a5-player-info { flex: 1; min-width: 0; }
  .a5-song-name {
    font-family: 'Fredoka One', cursive; font-size: 17px; color: white;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .a5-song-artist {
    font-family: 'Nunito', sans-serif;
    font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 2px;
  }
  .a5-progress-wrap { margin-bottom: 12px; }
  .a5-progress-bar {
    width: 100%; height: 5px; background: rgba(255,255,255,0.1);
    border-radius: 3px; cursor: pointer; position: relative;
  }
  .a5-progress-fill {
    height: 100%; border-radius: 3px;
    background: linear-gradient(90deg, #e8547a, #ff6b9d);
    width: 0%; transition: width .5s linear; position: relative;
  }
  .a5-progress-fill::after {
    content: ''; position: absolute; right: -5px; top: -4px;
    width: 11px; height: 11px; border-radius: 50%;
    background: white; box-shadow: 0 0 6px rgba(232,84,122,0.8);
  }
  .a5-time-row {
    display: flex; justify-content: space-between;
    font-family: 'Nunito', sans-serif;
    font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 5px;
  }
  .a5-controls {
    display: flex; align-items: center; justify-content: center; gap: 28px;
  }
  .a5-ctrl-btn {
    background: none; border: none; color: rgba(255,255,255,0.5);
    font-size: 22px; cursor: pointer; transition: color .2s, transform .15s;
  }
  .a5-ctrl-btn:hover { color: white; transform: scale(1.1); }
  #a5-play-btn {
    width: 54px; height: 54px; border-radius: 50%;
    background: #e8547a; color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; border: none; cursor: pointer;
    box-shadow: 0 4px 14px rgba(232,84,122,0.5);
    transition: transform .15s, box-shadow .15s;
  }
  #a5-play-btn:hover {
    transform: scale(1.08); box-shadow: 0 6px 20px rgba(232,84,122,0.7);
  }
  .a5-player-note {
    font-family: 'Dancing Script', cursive;
    font-size: 14px; color: rgba(255,255,255,0.4);
    text-align: center; margin-top: 10px;
  }
  /* ── FULL-WIDTH ALBUM ART ── */
.a5-album-art-wrap {
  width: 100%;
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(232,84,122,0.4);
}
.a5-album-art-full {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
.a5-player-info-centered {
  text-align: center;
  margin-bottom: 16px;
}
.a5-player-info-centered .a5-song-name {
  font-family: 'Fredoka One', cursive;
  font-size: 19px;
  color: white;
}
.a5-player-info-centered .a5-song-artist {
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  margin-top: 3px;
}

  /* ── CONFESSION ── */
  .a5-confession {
    font-family: 'Nunito', sans-serif;
    font-size: 14px; line-height: 1.85;
    color: rgba(255,255,255,0.8); text-align: left;
    white-space: pre-line;
    border-left: 2px solid rgba(232,84,122,0.4); padding-left: 14px;
  }
  .a5-confession-date {
    font-family: 'Dancing Script', cursive;
    font-size: 14px; color: rgba(232,84,122,0.5);
    text-align: right; margin-top: 12px;
  }

  /* ── 365 ── */
  .a5-days-num {
    font-size: clamp(72px, 20vw, 120px); color: #e8547a; line-height: 1;
    text-shadow: 0 0 40px rgba(232,84,122,0.6), 0 0 80px rgba(232,84,122,0.3);
    text-align: center;
  }
  .a5-days-label {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(18px, 5vw, 26px);
    color: rgba(255,255,255,0.6); text-align: center; margin-top: 4px;
  }
  .a5-days-sub {
    font-family: 'Nunito', sans-serif;
    font-size: 14px; color: rgba(255,255,255,0.4);
    text-align: center; margin-top: 12px; line-height: 1.65;
  }

  /* ── QUOTE ── */
  .a5-quote {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(20px, 5.5vw, 30px);
    color: white; line-height: 1.65; text-align: center;
    text-shadow: 0 0 20px rgba(232,84,122,0.3);
  }
  .a5-quote em { color: #e8547a; font-style: normal; }

  /* ── LIGHTBOX ── */
  #act5-lightbox {
    position: fixed; inset: 0; z-index: 20;
    display: flex; align-items: center; justify-content: center; padding: 24px;
    background: rgba(10,3,14,0.9);
    opacity: 0; pointer-events: none; transition: opacity .25s ease;
  }
  #act5-lightbox.visible { opacity: 1; pointer-events: all; }
  #act5-lightbox-image {
    max-width: min(1032px, 92vw); max-height: 95vh;
    width: auto; height: auto; object-fit: contain;
    border-radius: 8px; box-shadow: 0 12px 40px rgba(0,0,0,.6);
  }
  #act5-lightbox-close {
    position: absolute; top: 16px; right: 20px;
    width: 42px; height: 42px;
    border: 1px solid rgba(255,255,255,.5);
    background: rgba(0,0,0,.3); color: white;
    border-radius: 50%; font-size: 28px; line-height: 1;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
  }
  `;
  document.head.appendChild(style);

  /* ── BG DECO ── */
  const bgEl = document.getElementById('act5-bg-deco');
  for (let i = 0; i < 20; i++) {
    const s = document.createElement('span');
    s.className   = 'a5-bg-sym';
    s.textContent = ['♥','♡','✦','★','✿'][Math.floor(Math.random()*5)];
    s.style.left  = Math.random()*100 + 'vw';
    s.style.bottom = '-20px';
    s.style.fontSize = (10 + Math.random()*14) + 'px';
    s.style.animationDuration = (8 + Math.random()*8) + 's';
    s.style.animationDelay    = (Math.random()*8) + 's';
    bgEl.appendChild(s);
  }

  /* ── CANVAS BURST ── */
  const cvs  = document.getElementById('act5-canvas');
  cvs.width  = window.innerWidth;
  cvs.height = window.innerHeight;
  const ctx  = cvs.getContext('2d');
  let burst  = [];
  const COLS = ['#e8547a','#ff6b9d','#ffb3c8','#c4b5fd','#a78bfa','#ffffff'];

  function spawnBurst(x, y) {
    for (let i = 0; i < 60; i++) {
      const angle = Math.random()*Math.PI*2;
      const speed = 2 + Math.random()*7;
      burst.push({
        x, y,
        vx: Math.cos(angle)*speed,
        vy: Math.sin(angle)*speed - 3,
        size: 2 + Math.random()*4,
        color: COLS[Math.floor(Math.random()*COLS.length)],
        life: 1, decay: 0.015 + Math.random()*0.01,
        isHeart: Math.random() > 0.5
      });
    }
    drawBurst();
  }

  function drawBurst() {
    ctx.clearRect(0,0,cvs.width,cvs.height);
    burst = burst.filter(p => p.life > 0);
    burst.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.12;
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

  /* ── LIGHTBOX ── */
  const lightbox      = document.getElementById('act5-lightbox');
  const lightboxImage = document.getElementById('act5-lightbox-image');
  const lightboxClose = document.getElementById('act5-lightbox-close');
  const content       = document.getElementById('act5-content');

  function closeLightbox() {
    lightbox.classList.remove('visible');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
  }
  content.addEventListener('click', e => {
    const img = e.target.closest('.a5-screenshot img, .a5-poster');
    if (!img) return;
    lightboxImage.src = img.src;
    lightbox.classList.add('visible');
    lightbox.setAttribute('aria-hidden', 'false');
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  /* ── GIFT GRID ── */
  const grid = document.getElementById('act5-grid');
  GIFTS.forEach(gift => {
    const div = document.createElement('div');
    div.className  = 'a5-gift';
    div.dataset.id = gift.id;
    div.innerHTML  = `
      <img src="Img/gift-box.png" alt="${gift.title}" />
      <span class="a5-gift-label">${gift.label}</span>
    `;
    div.addEventListener('click', () => openGift(gift, div));
    grid.appendChild(div);
  });

  /* ── OPEN GIFT ── */
  function openGift(gift, div) {
    currentGift = gift;
    const rect = div.getBoundingClientRect();
    spawnBurst(rect.left + rect.width/2, rect.top + rect.height/2);

    opened.add(gift.id);
    div.classList.add('opened');

    const img = div.querySelector('img');
    if (img) {
      img.style.transition = 'transform 0.3s ease, opacity 0.2s ease';
      img.style.transform  = 'scale(0.85)';
      img.style.opacity    = '0';
      setTimeout(() => {
        img.src             = 'Img/gift-box-open.png';
        img.style.opacity   = '1';
        img.style.transform = 'scale(1)';
      }, 220);
    }

    document.getElementById('act5-content').innerHTML = buildContent(gift.id);

    const panel = document.getElementById('act5-panel');
    panel.classList.remove('hidden');
    requestAnimationFrame(() => panel.classList.add('visible'));

    if (gift.id === 'firstsong') initPlayer();
    if (gift.id === 'days') initDaysCounter();

    if (opened.size === GIFTS.length) {
      setTimeout(() => {
        document.getElementById('act5-unlock').classList.remove('hidden');
      }, 800);
    }
  }

  /* ── BACK ── */
  document.getElementById('act5-back').addEventListener('click', () => {
    const panel = document.getElementById('act5-panel');
    panel.classList.remove('visible');
    const audio = document.getElementById('a5-audio');
    if (audio) audio.pause();
    setTimeout(() => panel.classList.add('hidden'), 450);
  });

  /* ── UNLOCK ── */
  document.getElementById('act5-unlock-btn').addEventListener('click', () => {
    spawnBurst(window.innerWidth/2, window.innerHeight/2);
    setTimeout(() => { if (typeof onDone === 'function') onDone(); }, 600);
  });

  /* ══════════════════════════════
     CONTENT BUILDERS
  ══════════════════════════════ */
  function buildContent(id) {
    switch (id) {

      case 'distance': return `
        <h2 class="a5-card-title">🗺️ The Distance</h2>
        <div class="a5-card">
          <div class="a5-map">
            <div class="a5-map-row">
              <div class="a5-pin">
                <div class="a5-pin-dot"></div>
                <div class="a5-pin-label">Cairo<br>🇪🇬</div>
              </div>
              <div class="a5-dash-line"></div>
              <div class="a5-pin">
                <div class="a5-pin-dot"></div>
                <div class="a5-pin-label">Minya<br>🇪🇬</div>
              </div>
            </div>
            <p class="a5-distance-km">~ 250 km apart</p>
          </div>
          <p class="a5-card-body">
            not oceans, but still far enough<br>
            to make every call feel like coming home.
          </p>
        </div>`;

      case 'firstmsg': return `
        <h2 class="a5-card-title">💬 Where It Started</h2>
        <div class="a5-card">
          <p class="a5-card-body" style="margin-bottom:14px;">
            January 3rd, 2025.<br>a silly little message that started everything.
          </p>
          <div class="a5-screenshot">
            <img src="Img/first-msg.jpg" alt="first message" />
          </div>
          <p class="a5-card-body" style="margin-top:14px;font-style:italic;opacity:0.6;">
            who knew "wanna listen to this?" would lead to all of this?
          </p>
        </div>`;

      case 'confession': return `
        <h2 class="a5-card-title">💌 The Confession</h2>
        <span class="a5-memory-date">25 October 2025 · the day I confessed</span>
        <div class="a5-card">
          <p class="a5-card-body" style="margin-bottom:16px;font-style:italic;opacity:0.6;">
            the message that changed everything.
          </p>
          <p class="a5-confession">Hello Salma,

I've been wanting to tell you this for a while, and I finally worked up the courage. This past year has been both the most frustrating and the most wonderful year of my life, and you're the main reason. I like you a lot — I've liked you since the first time I met you, and I've wanted to say this for a long time.

I want to talk with you all day, every day — and even more than that, I want to listen to you talk about everything, absolutely anything. I want to annoy you even more than I already do.

I'm sorry it took me this long to say it. I held back because I didn't want to distract you during your school year.

I wish I'd had the courage to say this while we were talking earlier, but I didn't want to put you on the spot.

Please take your time to think it over; I'm not expecting an answer right away. If you don't feel the same, I understand and I'll still value our friendship.</p>
          <p class="a5-confession-date">— Ahmed ♥</p>
          <p class="a5-card-body" style="margin-top:14px;font-style:italic;opacity:0.7;">
            and 5 days later, you said yes.
          </p>
        </div>`;

      case 'firstsong': return `
  <h2 class="a5-card-title">🎵 First Song</h2>
  <span class="a5-memory-date">16 October 2024</span>
  <div class="a5-card">
    <p class="a5-card-body" style="margin-bottom:16px;">
      this one's ours now.
    </p>
    <div class="a5-player">
      <audio id="a5-audio" src="Audio/song.mp3" preload="metadata"></audio>
      <div class="a5-album-art-wrap">
        <img class="a5-album-art-full" src="Img/SKZ.png" alt="Album cover" />
      </div>
      <div class="a5-player-info-centered">
        <div class="a5-song-name">Neverending Story</div>
        <div class="a5-song-artist">Stray Kids</div>
      </div>
      <div class="a5-progress-wrap">
        <div class="a5-progress-bar" id="a5-progress-bar">
          <div class="a5-progress-fill" id="a5-progress-fill"></div>
        </div>
        <div class="a5-time-row">
          <span id="a5-current">0:00</span>
          <span id="a5-duration">0:00</span>
        </div>
      </div>
      <div class="a5-controls">
        <button class="a5-ctrl-btn" id="a5-rew">⏮</button>
        <button id="a5-play-btn">▶</button>
        <button class="a5-ctrl-btn" id="a5-ffw">⏭</button>
      </div>
      <p class="a5-player-note">♥ a song that reminds me of us ♥</p>
    </div>
  </div>`;

      case 'ngnlz': return `
        <h2 class="a5-card-title">🎬 First Movie Night</h2>
        <span class="a5-memory-date">3 April 2025 · our first movie night</span>
        <div class="a5-card a5-movie-card">
          <div class="a5-poster-wrap">
            <img class="a5-poster" src="Img/NGNLZ.jpg" alt="No Game No Life Zero" />
          </div>
          <span class="a5-movie-tag">No Game No Life: Zero</span>
          <p class="a5-movie-note">
            I asked you if you wanted to watch something together.<br><br>
            I don't think you knew how much courage that took.<br><br>
            you said yes.<br>
            and just like that,<br>
            we had <em>our thing</em>.
          </p>
        </div>`;

      case 'bf': return `
        <h2 class="a5-card-title">📺 First Recommendation</h2>
        <span class="a5-memory-date">26 January 2025</span>
        <div class="a5-card a5-movie-card">
          <div class="a5-poster-wrap">
            <img class="a5-poster" src="Img/BF.jpg" alt="Banana Fish" />
          </div>
          <span class="a5-movie-tag">Banana Fish</span>
          <p class="a5-movie-note">
            you handed me something<br>
            you clearly loved,<br>
            and trusted me with it.<br><br>
            I watched it.<br>
            I got it.<br>
            maybe not as deeply as you do —<br>
            but I got <em>why you love it</em>.<br><br>
            and that was enough.
          </p>
        </div>`;

      case 'howl': return `
        <h2 class="a5-card-title">🏰 Our Comfort Movie</h2>
        <span class="a5-memory-date">11 April 2025</span>
        <div class="a5-card a5-movie-card">
          <div class="a5-poster-wrap">
            <img class="a5-poster" src="Img/Howl's Moving Castle.jpg"
                 alt="Howl's Moving Castle" />
          </div>
          <span class="a5-movie-tag">Howl's Moving Castle</span>
          <p class="a5-movie-note">
            every Eid, without planning it,<br>
            we end up here.<br><br>
            Howl's castle.<br>
            Sophie's stubbornness.<br>
            and us, comfortable enough<br>
            to just <em>exist</em> together.<br><br>
            this one feels like home now.
          </p>
        </div>`;

      case 'days': return `
        <h2 class="a5-card-title">📅 365 Days</h2>
        <div class="a5-card">
          <div class="a5-days-num" id="a5-days-counter">0</div>
          <p class="a5-days-label">days of choosing each other</p>
          <p class="a5-days-sub">
            365 good mornings.<br>
            365 good nights.<br>
            365 reasons to be grateful<br>
            it was you.
          </p>
        </div>`;

      case 'whatyouare': return `
        <h2 class="a5-card-title">✨ What You Are</h2>
        <div class="a5-card">
          <p class="a5-quote">
            you're my favorite <em>notification</em>,<br>
            my <em>2am</em> safe place,<br>
            my reason to smile<br>
            at my phone like an idiot.<br><br>
            you are, simply put,<br>
            <em>my favorite person.</em>
          </p>
        </div>`;

      default: return '';
    }
  }

  /* ── DAYS COUNTER ── */
  function initDaysCounter() {
    const el = document.getElementById('a5-days-counter');
    if (!el) return;
    const target   = 365;
    const duration = 6000;
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 1.5);
      const current  = Math.floor(ease * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
        el.style.transition = 'transform 0.2s ease';
        el.style.transform  = 'scale(1.15)';
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 200);
        // Explode hearts from the counter element
        const rect = el.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        spawnBurst(cx, cy);
      }
    }
    requestAnimationFrame(tick);
  }

  /* ── MUSIC PLAYER ── */
  function initPlayer() {
    const audio   = document.getElementById('a5-audio');
    const playBtn = document.getElementById('a5-play-btn');
    const fill    = document.getElementById('a5-progress-fill');
    const bar     = document.getElementById('a5-progress-bar');
    const curEl   = document.getElementById('a5-current');
    const durEl   = document.getElementById('a5-duration');
    const rewBtn  = document.getElementById('a5-rew');
    const ffwBtn  = document.getElementById('a5-ffw');
    if (!audio) return;

    function fmt(s) {
      const m = Math.floor(s/60);
      return `${m}:${Math.floor(s%60).toString().padStart(2,'0')}`;
    }
    audio.addEventListener('loadedmetadata', () => { durEl.textContent = fmt(audio.duration); });
    audio.addEventListener('timeupdate', () => {
      if (!audio.duration) return;
      fill.style.width  = (audio.currentTime / audio.duration * 100) + '%';
      curEl.textContent = fmt(audio.currentTime);
    });
    audio.addEventListener('ended', () => { playBtn.textContent = '▶'; });
    playBtn.addEventListener('click', () => {
      if (audio.paused) { audio.play(); playBtn.textContent = '⏸'; }
      else              { audio.pause(); playBtn.textContent = '▶'; }
    });
    bar.addEventListener('click', e => {
      const rect = bar.getBoundingClientRect();
      audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
    });
    rewBtn.addEventListener('click', () => { audio.currentTime = 0; });
    ffwBtn.addEventListener('click', () => {
      audio.currentTime = Math.min(audio.currentTime + 15, audio.duration);
    });
  }
}