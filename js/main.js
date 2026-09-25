// ── BACKGROUND MUSIC MANAGER ──
const BG = {
  audio: null,
  muted: false,
  started: false,

  init() {
    this.audio = new Audio('Audio/song2.mp3');
    this.audio.loop   = true;
    this.audio.volume = 0.5;
  },

  start() {
    if (this.started || this.muted) return;
    this.started = true;
    this.audio.play().catch(() => {});
    this._showMuteBtn();
  },

  pause() {
    if (!this.audio.paused) this.audio.pause();
  },

  resume() {
    if (this.muted || this.audio.paused === false) return;
    this.audio.play().catch(() => {});
  },

  _showMuteBtn() {
    if (document.getElementById('bg-mute-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'bg-mute-btn';
    btn.textContent = '🔊';
    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      background: rgba(255,255,255,0.15);
      border: 1.5px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      width: 42px;
      height: 42px;
      font-size: 18px;
      cursor: pointer;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      -webkit-tap-highlight-color: transparent;
    `;
    btn.addEventListener('click', () => {
      this.muted = !this.muted;
      if (this.muted) {
        this.audio.pause();
        btn.textContent = '🔇';
        btn.style.background = 'rgba(255,255,255,0.08)';
      } else {
        this.audio.play().catch(() => {});
        btn.textContent = '🔊';
        btn.style.background = 'rgba(255,255,255,0.15)';
      }
    });
    document.body.appendChild(btn);
  }
};

BG.init();

// ── ACT TRANSITIONS ──
function switchAct(fromId, toId) {
  const from = document.getElementById(fromId);
  const to   = document.getElementById(toId);
  from.classList.remove('active');
  setTimeout(() => to.classList.add('active'), 950);
}

function startAct2() {
  const act2 = document.getElementById('act-2');
  act2.style.background = '#0d0010';
  act2.innerHTML = `<canvas id="matrix-canvas" style="
    position:absolute;inset:0;width:100%;height:100%;
  "></canvas>`;
  switchAct('act-1', 'act-2');
  setTimeout(() => {
    document.getElementById('dissolve').classList.remove('visible');
  }, 1000);
  setTimeout(() => {
    initMatrix('matrix-canvas', () => startAct3());
  }, 1200);
}

function startAct3() {
  // Start background music here — user has already interacted via passcode
  BG.start();
  switchAct('act-2', 'act-3');
  setTimeout(() => {
    initAct3('act-3', () => startAct4());
  }, 600);
}

function startAct4() {
  switchAct('act-3', 'act-4');
  setTimeout(() => {
    initAct4('act-4', () => startAct5());
  }, 600);
}

function startAct5() {
  switchAct('act-4', 'act-5');
  setTimeout(() => {
    initAct5('act-5', () => startAct6());
  }, 600);
}

function startAct6() {
  // Stop bg music before the letter — silence makes it hit harder
  BG.pause();
  const muteBtn = document.getElementById('bg-mute-btn');
  if (muteBtn) muteBtn.style.display = 'none';
  switchAct('act-5', 'act-6');
  setTimeout(() => {
    initAct6('act-6');
  }, 600);
}