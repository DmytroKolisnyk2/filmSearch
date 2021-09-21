import './sass/main.scss';
import 'material-design-icons/iconfont/material-icons.css';
import { openBar } from './js/openBar';
import { searchApp, renderPopular,renderPlayingNow } from './js/searchApp';
import debounce from 'lodash.debounce';

const burgerRef = document.querySelector('.header__burger');
burgerRef.addEventListener('click', openBar);

const inputRef = document.querySelector('.header__search');
inputRef.addEventListener('input', debounce(() => searchApp.searchPhoto.apply(searchApp), 500));

const observeRef = document.querySelector('#observe');
const observer = new IntersectionObserver(searchApp.updatePhotos.bind(searchApp, observeRef));
observer.observe(observeRef);

renderPopular();
renderPlayingNow();