import './sass/main.scss';
// import 'material-design-icons/iconfont/material-icons.css';
import { openBar } from './js/openBar';

const burgerRef = document.querySelector('.header__burger');



burgerRef.addEventListener('click', openBar);