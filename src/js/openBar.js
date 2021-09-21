const burgerRef = document.querySelector('.header__burger');
const barRef = document.querySelector('.bar');

export const openBar = () => {
  burgerRef.classList.add('header__burger--open');
  barRef.classList.add('bar--open')
  burgerRef.removeEventListener('click', openBar);
  burgerRef.addEventListener('click', closeBar);
  // window.addEventListener('click', closeBar);
  setTimeout(() => window.addEventListener('click', closeBar), 0)
};
const closeBar = () => {
  if (event.target === barRef) return;
  burgerRef.classList.remove('header__burger--open');
  barRef.classList.remove('bar--open')
  burgerRef.addEventListener('click', openBar);
  burgerRef.removeEventListener('click', closeBar);
  window.removeEventListener('click', closeBar)
};