import './sass/main.scss';
import 'material-design-icons/iconfont/material-icons.css';
import { openBar, closeOverlayBar } from './js/openBar';
import { searchApp, renderPopular, renderPlayingNow, renderPage, renderUpcoming, renderFavorite, renderPlaylist } from './js/searchApp';
import debounce from 'lodash.debounce';
import { changeLikes, changeWatchLaterList } from './js/addToList';
import { openSettings } from './js/settingsModal';
import { closeBar } from './js/openBar';
import { changeAxiosLanguage, changeAxiosRegion } from './js/searchFilm';
import { changeTheme } from './js/changeStyle';


localStorage.setItem('like-list', localStorage.getItem('like-list') || JSON.stringify([]));
localStorage.setItem('watch-later', localStorage.getItem('watch-later') || JSON.stringify([]));
localStorage.setItem('region', localStorage.getItem('region') || 'US');
localStorage.setItem('language', localStorage.getItem('language') || 'en');
localStorage.setItem('theme', localStorage.getItem('theme') || 'Brown theme');

changeAxiosLanguage(localStorage.getItem('language'));
changeAxiosRegion(localStorage.getItem('region'));

const galleryRef = document.querySelector('.search-result__card-container');
galleryRef.addEventListener('click', changeLikes);
galleryRef.addEventListener('click', changeWatchLaterList);

document.querySelector('.controls__counter--watch-later').innerHTML = JSON.parse(localStorage.getItem('watch-later')).length;
document.querySelector('.controls__counter--favorite').innerHTML = JSON.parse(localStorage.getItem('like-list')).length;

const burgerRef = document.querySelector('.header__burger');
burgerRef.addEventListener('click', openBar);

const inputRef = document.querySelector('.header__search');
inputRef.addEventListener('input', debounce(() => searchApp.searchPhoto.apply(searchApp), 500));


document.querySelector('.search-result__card-container').addEventListener('click', (event) => {
  let target = event.target;
  if (!target.dataset.id) return;
  renderPage(target.dataset.id);
});

document.querySelector('.best-movies__list').addEventListener('click', (event) => {
  let target = event.target;
  if (!target.dataset.id) return;
  closeBar();
  renderPage(target.dataset.id);
});

document.querySelector('.aside__overlay').addEventListener('click', closeOverlayBar);
document.querySelector('.controls__item[data-action="upcoming"').addEventListener('click', ('click', () => {
  closeBar();
  renderUpcoming();
}));
document.querySelector('.controls__item[data-action="playingNow"').addEventListener('click', () => {
  closeBar();
  renderPlayingNow();
});
document.querySelector('.controls__item[data-action="favorite"').addEventListener('click', () => {
	closeBar();
	renderFavorite(JSON.parse(localStorage.getItem('like-list')));
});
document.querySelector('.controls__item[data-action="playlist"').addEventListener('click', () => {
	closeBar();
	renderPlaylist(JSON.parse(localStorage.getItem('watch-later')));
});
renderPopular();
renderPlayingNow();

document.querySelector('.header__settings').addEventListener('click', openSettings);

changeTheme(localStorage.getItem('theme'))
