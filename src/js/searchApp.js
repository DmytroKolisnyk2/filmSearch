import cardTmpl from '../templates/searchCard.hbs';
import asideListTmpl from '../templates/asideList.hbs';
import { error, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { queryRequest, popularRequest, playingNowRequest } from './searchFilm';

const inputRef = document.querySelector('.header__search');
const galleryRef = document.querySelector('.search-result__card-container');
const observeRef = document.querySelector('#observe');
const asideListRef = document.querySelector('.best-movies__list');

export const searchApp = {
  page: 1,

  searchPhoto() {
    if (inputRef.value.length === 0) return;
    this.page = 1;
    this.blocked = true;
    observeRef.classList.add('observe--hidden');
    queryRequest(inputRef.value, this.page)
      .then(({ data }) => {
        console.log(data);
        galleryRef.innerHTML = cardTmpl(data);
        if (data.results.length === 0) {
          error({ text: 'Query not found', delay: 700 });
          return;
        };
        this.restartObserver();
      })
      .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));
  },

  updatePhotos() {
    if (this.page === 1 || this.blocked) return;
    observeRef.classList.add('observe--hidden');
    this.blocked = true;
    this.last = galleryRef.lastElementChild;
    queryRequest(inputRef.value, this.page)
      .then(({ data }) => {
        if (data.results.length === 0) {
          info({ text: "That's the end", delay: 900 });
          return;
        }
        galleryRef.insertAdjacentHTML('beforeend', cardTmpl(data));
        this.last.nextElementSibling.lastElementChild.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
        this.restartObserver();
      })
      .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));
  },

  restartObserver() {
    observeRef.classList.remove('observe--hidden');
    setTimeout(() => this.blocked = false, 500);
    this.page++
  }
}
export const renderPlayingNow = () => {
  playingNowRequest().then(({ data }) => {
    galleryRef.innerHTML = cardTmpl(data);
    if (data.results.length === 0) {
      error({ text: 'Popular films not found', delay: 700 });
      return;
    };
  })
    .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));

};
export const renderPopular = () => {
  popularRequest().then(({ data }) => {
    asideListRef.innerHTML = asideListTmpl(data);
    if (data.results.length === 0) {
      error({ text: 'Films in your region not found', delay: 700 });
      return;
    };
  })
};