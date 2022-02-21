const game = document.querySelector('.game');
const log = document.querySelector('.log');

const state = [];
const stat = loadStat();
let user = 'X';

let turn = 0;
let winner = false;

renderStat();

game.addEventListener('click', event => {
  if (winner) {
    return;
  }

  const cell = event.target.dataset.cell;

  if (!cell || state[cell]) {
    return;
  }

  state[cell] = user;
  event.target.innerHTML = user;

  endTurn();
})

log.addEventListener('click', () => {
  if (!winner) {
    return;
  }
  window.location.reload();
});

function endTurn() {
  const win = checkWin();

  if (win) {
    winner = user;
    updateStat();
    return;
  }

  if (turn === 8) {
    winner = 'nobody';
    updateStat();
    return;
  }

  turn++;
  user = (user === 'X') ? 'O' : 'X';
  log.innerHTML = `Turn ${turn}. Find the best move for ${user}`;
}


function checkWin() {
  const winPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const win = winPosition.some(position => {
    const check = (position.every(cell => state[cell] === user));

    if (check) {
      decorateWin(position);
      return check;
    }
  });

  return win;
};

const decorateWin = (index) => {
  const cells = document.querySelectorAll(index.map(id => `[data-cell="${id}"]`).join(','));

  for (let cell of cells) {
    cell.classList.add('win');
  }
}

function loadStat() {
  const data = localStorage.getItem('stat');
  return data ? JSON.parse(data) : [];
};

function updateStat() {
  stat.push([winner, turn]);

  const data = JSON.stringify(stat);
  localStorage.setItem('stat', data);

  renderStat();
}

function renderStat() {
  document.querySelector('.stat__data').innerHTML = stat.map(([w, t]) => `<li>${w} in turn ${t}</li>`).join('');

  if (winner) {
    log.innerHTML = `${winner} is win. Click to restart`;
  }
}
