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
  document.body.classList.add('audio-playing');
}

function pauseAudio() {
  audio.pause();  
  isPlaying = false;
  document.body.classList.remove('audio-playing');
}

audioPlayer.addEventListener('click', () => {
  if(!isPlaying) {
    playAudio(currentTrack);    
  } else {
    pauseAudio();
  }
 
  //console.log(`Player state: ${isPlaying}. Track #${currentTrack}`);
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

  const bgName = `url("./assets/img/${tracksList[num]}.jpg")`;  
  main.style.backgroundImage = bgName;

  playAudio(num);  
});

// preload Images
function preloadImages() {
  tracksList.forEach((i) => {    
    const img = new Image();
    img.src = `./assets/img/${i}.jpg`;
    }
  );
}
preloadImages();

// review
console.log(`
Оценка 60

1) Вёрстка +10
  есть не меньше пяти интерактивных элементов, с которыми пользователи могут взаимодействовать. Изменение внешнего вида самого элемента и состояния курсора при наведении, плавные анимации +5
  в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5

2) При кликах по интерактивным элементам меняется изображение +10

3) При кликах по интерактивным элементам меняется звук +10

4) Активный в данный момент интерактивный элемент выделяется стилем +10

5) Кнопка Play/Pause +20
  есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание звука +10
  внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент звук +10

6) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
  высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо

`);