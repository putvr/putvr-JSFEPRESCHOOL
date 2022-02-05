/* Exercitium II */

const menu = document.querySelector(".menu");
const list = document.querySelector(".nav");

menu.addEventListener("click", () => {
  menu.classList.toggle("menu--active");
  list.classList.toggle("nav--menu");
});

list.addEventListener("click", ({
  target
}) => {
  if (target.nodeName != "A") return;

  menu.classList.remove("menu--active");
  list.classList.remove("nav--menu");
});

/* Exercitium III */
const config = {
  theme: "dark",
  lang: "en",
};

const state = {};

const portfolioImages = document.querySelectorAll(".portfolio-img");
const portfolioBtns = document.querySelector(".portfolio-btns-list");

let activePortfolioBtn = document.querySelector(".portfolio-btns--active");

portfolioBtns.addEventListener("click", ({
  target
}) => {
  const season = target.dataset.season;
  portfolioImages.forEach(
    (images, idx) => (images.src = `assets/img/${season}/${idx + 1}.jpg`)
  );

  activePortfolioBtn.classList.toggle("portfolio-btns--active");
  activePortfolioBtn = target;
  target.classList.toggle("portfolio-btns--active");
});

// preload
const seasons = ["winter", "spring", "summer", "autumn"];

function preloadImages() {
  seasons.forEach((s) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${s}/${i}.jpg`;
    }
  });
}
preloadImages();

// i18n
import i18Obj from "./translate.js";

const langSwither = document.querySelector(".lang");
langSwither.addEventListener("click", handleLangSwitch);

function handleLangSwitch({
  target
}) {
  if (!target.dataset.lang) {
    return;
  }
  if (target.dataset.lang === state.lang) {
    return;
  }

  state.langSwitherActive.classList.toggle("lang-active");
  state.langSwitherActive = target;

  setTranslate(target.dataset.lang);
  target.classList.toggle("lang-active");

  fixBg();
}

function setTranslate(switchToLang) {
  const elems = document.querySelectorAll("[data-i18]");

  config.lang = switchToLang;
  elems.forEach((e) => {
    e.textContent = i18Obj[config.lang][e.dataset.i18];
    if (e.placeholder) {
      e.textContent = "";
      e.placeholder = i18Obj[config.lang][e.dataset.i18];
    }
  });
  document.querySelector('html').setAttribute('lang', switchToLang);

  localStorage.setItem("lang", config.lang);
}

// theme
const themeSwither = document.querySelector(".theme");
themeSwither.addEventListener("click", ({
  target
}) => {
  const swichToTheme = config.theme === "light" ? "dark" : "light";
  setTheme(swichToTheme);
});

function setTheme(newTheme) {
  document.body.classList.toggle(`${config.theme}-theme`);

  config.theme = newTheme;
  document.body.classList.toggle(`${config.theme}-theme`);

  localStorage.setItem("theme", newTheme);
}

// local storage
function getConfig() {
  let theme = localStorage.getItem("theme") ?? config.theme;
  setTheme(theme);

  let lang = localStorage.getItem("lang") ?? config.lang;
  state.langSwitherActive = document.querySelector(`.lang-active`);

  if (lang || lang !== config.lang) {
    const z = document.querySelector(`.lang__${lang}`);
    z.click();
  }
}

window.addEventListener("load", getConfig);

/* other */
function fixBg() {
  const h = document.body.scrollHeight - (150 + 700);
  document.documentElement.style.setProperty('--bg-bottom', `${h}px`);
}

// video
import CustomVideo from "./player.js";
const video = document.querySelector('.player');
const player = new CustomVideo(video);

video.addEventListener('click', (event) => {
  if (!player.enabled) {
    player.enabled = true;
    video.classList.remove("player--disabled");
    return;
  }

  const action = event.target.dataset.playerAction;
  if (!action) {
    return;
  }
  const a = `handle${action}Click`;
  player[a](event);
});


/* gradus  */
console.log(
  "%c Ваша отметка - 60 баллов",
  "background: #222; color: #bada55"
);

console.log(`
1) Вёрстка +10
    вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5
    в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5

2) Кнопка Play/Pause на панели управления +10
    при клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5
    внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5

3) Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10

4) При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10
  При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10

5)  Кнопка Play/Pause в центре видео +10
    есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5
    когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается +5

`);
