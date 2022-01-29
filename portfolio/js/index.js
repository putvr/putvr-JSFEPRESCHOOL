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

  let lang = localStorage.getItem("lang");
  state.langSwitherActive = document.querySelector(`.lang-active`);

  if (lang || lang !== config.lang) {
    const z = document.querySelector(`.lang__${lang}`);
    z.click();
  }
}

window.addEventListener("load", getConfig);

/* gradus  */
console.log(
  "%c Ваша отметка - 85 балла(ов) ",
  "background: #222; color: #bada55"
);

console.log(`
1) Смена изображений в секции portfolio +25
    при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
    кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5

2) Перевод страницы на два языка +25
    при клике по надписи ru англоязычная страница переводится на русский язык +10
    при клике по надписи en русскоязычная страница переводится на английский язык +10
    надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5

3) Переключение светлой и тёмной темы +25
    Вариант первый. Блоки и секции header, hero, contacts, footer остались без изменений, в оставшихся секциях цвет фона и шрифта поменялись местами: фон стал белым, шрифт черным Макет в figma - светлая тема - 1

    На страницу добавлен переключатель при клике по которому:
        тёмная тема приложения сменяется светлой +10
        светлая тема приложения сменяется тёмной +10
        после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5

4) Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5

5)Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5
`);
