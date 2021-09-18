const burgerRef = document.querySelector('.header__burger');
const barRef = document.querySelector('.bar');

export const openBar = () => {
  burgerRef.classList.add('header__burger--open');
  barRef.classList.add('bar--open')
  burgerRef.removeEventListener('click', openBar);
  burgerRef.addEventListener('click', closeBar);

};
const closeBar = () => {
  burgerRef.classList.remove('header__burger--open');
  barRef.classList.remove('bar--open')
  burgerRef.addEventListener('click', openBar);
  burgerRef.removeEventListener('click', closeBar);

};