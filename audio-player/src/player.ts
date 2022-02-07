interface AudioData {
  artists: Array<string>;
  tracks: Array<string>;
  covers: Array<string>;
}

class Player {
  data: AudioData;
  list: Array<string>;
  covers: Array<string>;

  currentTrackNumber: number;

  audio: HTMLAudioElement;
  controls: Element;

  trackName: string;

  coverImage: HTMLElement;
  progressBar: HTMLElement;
  controlTrackName: Element;
  mainBg: HTMLElement;

  updateProgressTimer: number;


  constructor(initData: string, audio: HTMLAudioElement) {
    this.data = JSON.parse(initData);
    this.list = this.data.tracks;
    this.covers = this.data.covers;

    this.audio = new Audio();
    this.controls = audio.children[1];

    this.coverImage = document.querySelector('.player__info');

    this.progressBar = document.querySelector('.player__progress-bar');
    this.controlTrackName = document.querySelector('.player__track');
    this.mainBg = document.querySelector('.main-bg');

    this.progressBar.addEventListener('click', (e) => this.handleProgressBarClick(e));

    this.selectTrack(0);
  }

  selectTrack(trackNum: number) {
    this.currentTrackNumber = trackNum;
    this.trackName = this.list[trackNum];

    this.audio.src = `./assets/audio/${this.trackName}.mp3`;
    this.controlTrackName.innerHTML = `${this.trackName}`;
    this.controls.children[1].innerHTML = `${this.data.artists[trackNum]}`;

    const bgImage = `url("./assets/img/${this.covers[trackNum]}")`;
    this.coverImage.style.backgroundImage = bgImage;
    this.mainBg.style.backgroundImage = bgImage;

    this.audio.addEventListener('loadeddata', () => {
      this.progressBar.children[0].innerHTML = this.getTime(this.audio.duration);
    })
  }

  play() {
    this.controls.classList.add('playing');
    this.audio.play();

    this.updateProgressTimer = setInterval(() => {
      if (this.audio.paused) {
        return;
      }

      const progress = this.progressBar.children[1] as HTMLInputElement;
      progress.value = String(this.audio.currentTime / this.audio.duration * 100);

      const currentTime = this.progressBar.children[2] as HTMLElement;
      currentTime.innerHTML = this.getTime(this.audio.currentTime);
    }, 500);
  }

  pause() {
    this.audio.pause();
    this.controls.classList.remove('playing');

    if (this.updateProgressTimer) {
      clearInterval(this.updateProgressTimer);
    }
  }

  getTime(duration: number) {
    const toStr = (n) => (n > 9) ? `${n}` : `0${n}`;

    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - (60 * min));

    return `${min}:${toStr(sec)}`;
  }

  handlePlayClick() {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  handleNextClick() {
    this.pause();
    const next = this.currentTrackNumber > this.list.length - 2 ? 0 : this.currentTrackNumber + 1;

    this.selectTrack(next);
    this.play();
  }

  handlePrevClick() {
    this.pause();
    const prev = this.currentTrackNumber === 0 ? this.list.length - 1 : this.currentTrackNumber - 1;

    this.selectTrack(prev);
    this.play();
  }

  handleProgressBarClick(event) {
    const played = !this.audio.paused;
    if (played) {
      this.pause();
    }
    const time = this.audio.duration * event.target.value / 100;
    this.audio.currentTime = time;

    if (played) {
      this.play();
    }
  }
}

const dataProd = {
  artists: [
    'Beyonce',
    'Dua Lipa',
  ],
  tracks: [
    `Don't Hurt Yourself`,
    `Don't Start Now`,
  ],
  covers: [
    'dontstartnow.png',
    'lemonade.png',
  ]
};


const player = document.querySelector('.player') as HTMLAudioElement;
const p = new Player(JSON.stringify(dataProd), player);

player.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const action = target.dataset.player;

  if (!action) {
    return;
  }

  const actionName = `handle${action}Click`;
  p[actionName]();
});

// review
console.log(`
Оценка за задание 60 баллов

1) Вёрстка +10
  вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
  в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5

2) Кнопка Play/Pause +10
  есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
  внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5

3) При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10

4) При смене аудиотрека меняется изображение - обложка аудиотрека +10

5) Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10

6) Отображается продолжительность аудиотрека и его текущее время проигрывания +10

7) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10

  Самый непонятный пункт. Честно пытался попасть в макет из jpg 🤷🏼‍♂️, но без фанатизма.   
`);