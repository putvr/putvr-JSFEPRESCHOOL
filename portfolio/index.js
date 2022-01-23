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
