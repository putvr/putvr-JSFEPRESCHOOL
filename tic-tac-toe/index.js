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
  event.target.classList.add(`game-cell--${user}`);
  event.target.classList.add(`game-cell--clicked`);

  event.target.innerHTML = user;

  endTurn();
})

game.addEventListener('mouseover', event => {
  if (event.target.classList.contains(`game-cell--clicked`)) {
    return;
  }

  const green = "RGBA(0, 128, 0, 0.3)";
  const red = "RGBA(255, 0, 0, 0.3)";
  event.target.style.color = (user === 'X') ? red : green;
})

game.addEventListener('mouseout', event => {
  event.target.style.color = '';
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

  log.innerHTML = `Turn ${turn}. Find the best move for <span>${user}</span>`;

}

function checkWin() {
  const winPosition = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal 
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
  log.classList.add('alert-danger');

  const data = JSON.stringify(stat.slice(-10));
  localStorage.setItem('stat', data);

  renderStat();
}

function renderStat() {
  document.querySelector('.stat__data').innerHTML = stat.map(([w, t]) => `<li>${w} in turn ${t}</li>`).join('');

  if (winner) {
    log.innerHTML = `${winner} win in turn ${turn}. <i>Click to restart</i>`;
  }
}

// review 
console.log(`
Оценка 65.

1. Вёрстка +10
  реализован интерфейс игры +5
  в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5

2. При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10

3. Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10

4. По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10

5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10

6. Анимации +10

7. Собственное оригинальное оформление +5

`);
