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
  switchAct('act-5', 'act-6');
  setTimeout(() => {
    initAct6('act-6');
  }, 600);
}