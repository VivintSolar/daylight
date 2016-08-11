var menu = document.querySelector('.menu');
var trigger = document.querySelector('.sunrise__menu--trigger');
var overlay = document.querySelector('.menu__overlay');
var close = document.querySelector('.menu__close');

trigger.addEventListener('click', function(e) {
  e.preventDefault();
  toggleMenu();
});

overlay.addEventListener('click', function(e) {
  e.preventDefault();
  toggleMenu();
});

close.addEventListener('click', function(e) {
  e.preventDefault();
  toggleMenu();
});

function toggleMenu() {
  overlay.classList.toggle('open');
  menu.classList.toggle('open');
}