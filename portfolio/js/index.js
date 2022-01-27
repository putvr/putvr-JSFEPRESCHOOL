/* Exercitium II */

const menu = document.querySelector('.menu');
const list = document.querySelector('.nav');

menu.addEventListener('click', ()=> {
  menu.classList.toggle('menu--active');
  list.classList.toggle('nav--menu');
});

list.addEventListener('click', ({target}) => {
  if(target.nodeName != 'A') return;

  menu.classList.remove('menu--active');
  list.classList.remove('nav--menu');
});

/* Exercitium III */
const config = {
  theme: 'dark', 
  lang: 'en',
};

const state =  {};

const portfolioImages = document.querySelectorAll('.portfolio-img');
const portfolioBtns = document.querySelector('.portfolio-btns-list');

let activePortfolioBtn = document.querySelector('.portfolio-btns--active');

portfolioBtns.addEventListener('click', ({ target }) => {
  const season = target.dataset.season;
  portfolioImages.forEach((images, idx) => (images.src = `assets/img/${season}/${idx + 1}.jpg`));

  activePortfolioBtn.classList.toggle('portfolio-btns--active');
  activePortfolioBtn = target;
  target.classList.toggle('portfolio-btns--active');
});


// preload
const seasons = ['winter', 'spring', 'summer', 'autumn'];
function preloadImages() {
  seasons.forEach(s => {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${s}/${i}.jpg`;
    }
  })
}
preloadImages();

// i18n
import i18Obj from './translate.js';

const langSwither = document.querySelector('.lang');
langSwither.addEventListener('click', handleLangSwitch);

function handleLangSwitch ({ target }) {
  if(!target.dataset.lang) {
    return;
  }
  if(target.dataset.lang === state.lang) {
    return;
  }

  state.langSwitherActive.classList.toggle('lang-active'); 
  state.langSwitherActive = target;


  setTranslate(target.dataset.lang); 
  target.classList.toggle('lang-active'); 
};


function setTranslate(switchToLang) {
  const elems = document.querySelectorAll('[data-i18]');

  config.lang = switchToLang;
  elems.forEach(e => {
    e.textContent = i18Obj[config.lang][e.dataset.i18];
    if (e.placeholder) {
      e.textContent = '';
      e.placeholder = i18Obj[config.lang][e.dataset.i18];
    }
  });

  localStorage.setItem('lang', config.lang);
}



// theme
const themeSwither = document.querySelector('.theme');
themeSwither.addEventListener('click', ({ target }) => {
  const swichToTheme = (config.theme === 'light') ? 'dark' : 'light';
  setTheme(swichToTheme);  
});

function setTheme(newTheme) {  
  document.body.classList.toggle(`${config.theme}-theme`);

  config.theme = newTheme;
  document.body.classList.toggle(`${config.theme}-theme`);

  localStorage.setItem('theme', newTheme);
}

// local storage
function getConfig() {  
  let theme = localStorage.getItem('theme') ?? config.theme;
  setTheme(theme);

  let lang = localStorage.getItem('lang');  
  state.langSwitherActive = document.querySelector(`.lang-active`);

  if(lang || lang !== config.lang) {
    const z = document.querySelector(`.lang__${lang}`);
    z.click();
  }
  console.log(config, state);
}

window.addEventListener('load', getConfig);

/* gradus  */ 
// console.log(`

// 1) Вёрстка соответствует макету. Ширина экрана 768px +48
//   блок <header> +6
//   секция hero +6
//   секция skills +6
//   секция portfolio +6
//   секция video +6
//   секция price +6
//   секция contacts +6
//   блок <footer> +6

// 2) Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
//   нет полосы прокрутки при ширине страницы от 1440рх до 768рх +5
//   нет полосы прокрутки при ширине страницы от 768рх до 480рх +5
//   нет полосы прокрутки при ширине страницы от 480рх до 320рх +5

// 3) На ширине экрана 768рх и меньше реализовано адаптивное меню +22
//   при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2
//   при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4
//   высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4
//   при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4
//   бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2
//   ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2
//   при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4
// `);