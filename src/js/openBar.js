const burgerRef = document.querySelector('.header__burger');
const barRef = document.querySelector('.bar');
const overlayRef = document.querySelector('.aside__overlay');

export const openBar = () => {
  burgerRef.classList.add('header__burger--open');
  barRef.classList.add('bar--open')
  burgerRef.removeEventListener('click', openBar);
  burgerRef.addEventListener('click', closeBar);
};
export const closeBar = () => {
  burgerRef.classList.remove('header__burger--open');
  barRef.classList.remove('bar--open')
  burgerRef.addEventListener('click', openBar);
  burgerRef.removeEventListener('click', closeBar);
};
export const closeOverlayBar = () => {
  if (event.target !== overlayRef) return;
  burgerRef.classList.remove('header__burger--open');
  barRef.classList.remove('bar--open')
  burgerRef.addEventListener('click', openBar);
  burgerRef.removeEventListener('click', closeBar);
};