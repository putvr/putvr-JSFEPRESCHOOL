const audioPlayer : HTMLAudioElement = document.querySelector('.player');
const main = document.querySelector('.main') as HTMLElement;
const menu = document.querySelector('.menu-list'); 

let active = document.querySelector('.active') as HTMLElement;
let currentTrack = 0;
let isPlaying = false;

const tracksList = [
  'forest',
  'drozd',
  'javoronok',
  'slavka',
  'solovey',
  'zarynka',
];

const audio = new Audio();

function playAudio(trackID : number) {  
  audio.src = `./assets/audio/${tracksList[trackID]}.mp3`;
  currentTrack = trackID;
  audio.currentTime = 0;
  audio.play();
  isPlaying = true;
  audioPlayer.classList.add('player--play');
}

function pauseAudio() {
  audio.pause();  
  isPlaying = false;
  audioPlayer.classList.remove('player--play');
}

audioPlayer.addEventListener('click', () => {
  if(!isPlaying) {
    playAudio(currentTrack);    
  } else {
    pauseAudio();
  }
 
  console.log(`Player state: ${isPlaying}. Track #${currentTrack}`);
});


menu.addEventListener('click', ( event ) => {
  const target = event.target as HTMLElement;
  const num = Number(target.dataset.track);

  if(currentTrack == num) {
    return;
  }  
  
  pauseAudio();

  active.classList.remove('active');
  active = target;
  active.classList.add('active');

  const bgName = `url("/assets/img/${tracksList[num]}.jpg")`;  
  main.style.backgroundImage = bgName;

  playAudio(num);  
});

// preload Images
function preloadImages() {
  tracksList.forEach((i) => {    
    const img = new Image();
    img.src = `/assets/img/${i}.jpg`;
    }
  );
}
preloadImages();

