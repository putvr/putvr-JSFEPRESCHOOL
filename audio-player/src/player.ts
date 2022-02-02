interface AudioData {
  tracks : Array<string>;
  covers: Array<string>;
}

class Player {
  data : AudioData;
  list : Array<any>;

  currentTrackNumber : number;
  
  audio : HTMLAudioElement;
  controls : Element;

  trackName : string;

  controlTrackName : Element;


  constructor(initData : string, audio: HTMLAudioElement) {
    this.data = JSON.parse(initData);
    this.list = this.data.tracks;

    this.audio = new Audio();
    this.controls = audio.children[1];

    this.controlTrackName = document.querySelector('.player__track');

    this.selectTrack(0);
  }

  selectTrack(trackNum : number) {
    this.currentTrackNumber = trackNum;  
    this.trackName = this.list[trackNum];
    this.audio.src = `./assets/audio/${this.trackName}`;
    this.controlTrackName.innerHTML = `${this.trackName}`;
  }

  play() {
    this.controls.classList.add('playing');
    this.audio.play();
  }

  pause() {
    this.audio.pause();
    this.controls.classList.remove('playing');
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
}

const data = { 
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
  cover: [
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
const p = new Player(JSON.stringify(data), player);

player.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const action = target.dataset.player;

  if(!action) {
    return;
  }

  console.log(action);

  const actionName = `handle${action}Click`;
  p[actionName]();
});

