var menu = document.querySelector('.sunrise-menu');
var trigger = document.querySelector('.sunrise__menu--trigger');
var overlay = document.querySelector('.sunrise__menu__overlay');
var close = document.querySelector('.sunrise-menu__close');

trigger.addEventListener('click', function(e) {
  e.preventDefault();
  console.log('trigger');
  toggleMenu();
});

overlay.addEventListener('click', function(e) {
  e.preventDefault();
  console.log('overlay');
  toggleMenu();
});

close.addEventListener('click', function(e) {
  e.preventDefault();
  console.log('close');
  toggleMenu();
});

function toggleMenu() {
  overlay.classList.toggle('open');
  menu.classList.toggle('open');
  console.log('toggle');
}
