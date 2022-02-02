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

    this.audio.src = `./assets/audio/${this.trackName}`;
    this.controlTrackName.innerHTML = `${this.trackName}`;
    this.controls.children[1].innerHTML = `${this.data.artists[0]}`;

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
    const time = this.audio.duration * event.target.value / 100;
    this.audio.currentTime = time;
    this.play();
  }
}

const dataDev = {
  artists: [
    'Amon Amarth',
  ],
  tracks: [
    '04. One Against All.mp3',
    '08. One Thousand Burning Arrows.mp3',
    '09. Vengeance Is My Name.mp3',
    '05. Raise Your Horns.mp3',
    '11. Back On Northern Shores.mp3',
    '03. On A Sea Of Blood.mp3',
    '12. Death In Fire 2016.mp3',
    '10. A Dream That Cannot Be.mp3',
    '01. First Kill.mp3',
    '13. Death In Fire [Live].mp3',
    '06. The Way Of Vikings.mp3',
    '02. Wanderer.mp3',
    '07. At Dawn’s First Light.mp3',
  ],
  covers: [
    'Back.jpg',
    'Front.jpg',
    'Back.jpg',
    'Front.jpg',
    'Back.jpg',
    'Front.jpg',
    'Back.jpg',
    'Front.jpg',
    'Back.jpg',
    'Front.jpg',
    'Back.jpg',
    'Front.jpg',
    'Back.jpg',
  ]
};

const player = document.querySelector('.player') as HTMLAudioElement;
const p = new Player(JSON.stringify(dataDev), player);

player.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const action = target.dataset.player;

  if (!action) {
    return;
  }

  const actionName = `handle${action}Click`;
  p[actionName]();
});

