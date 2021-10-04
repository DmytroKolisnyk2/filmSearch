import cardTmpl from '../templates/searchCard.hbs';
import asideListTmpl from '../templates/asideList.hbs';
import pageTmpl from '../templates/page.hbs';
import favTmpl from '../templates/favorite.hbs';
import { error, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { queryRequest, popularRequest, playingNowRequest, pageRequest, similarRequest, upcomingRequest } from './searchFilm';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/animations/shift-away.css';
import { changeLikes, changeWatchLaterList } from './addToList';

const inputRef = document.querySelector('.header__search');
const galleryRef = document.querySelector('.search-result__card-container');
const observeRef = document.querySelector('#observe');
const asideListRef = document.querySelector('.best-movies__list');
const cardRef = document.querySelector('.card__menu');

export const searchApp = {
  page: 1,

  searchPhoto() {
    if (inputRef.value.length === 0) return;
    document.querySelector('.page-result').innerHTML = '';
    galleryRef.innerHtml = "";
    this.page = 1;
    this.blocked = true;
    galleryRef.innerHTML = '';
    observeRef.classList.remove('observe--hidden');
    queryRequest(inputRef.value, this.page)
      .then(({ data }) => {
        console.log(data);
        galleryRef.innerHTML = cardTmpl(addActiveBtn(data));
        if (data.total_pages === 1) {
          this.hideObserver();
          return;
        };
        if (data.results.length === 0) {
          this.hideObserver();
          error({ text: 'Query not found', delay: 700 });
          return;
        };
        setTimeout(() => this.restartObserver(), 500);
      })
      .catch(() => {
        this.hideObserver();
        error({
          text: 'Oops something went wrong', delay: 1000
        })
      });
  },

  updatePhotos() {
    if (this.page === 1 || this.blocked) return;
    this.blocked = true;
    this.last = galleryRef.lastElementChild;
    queryRequest(inputRef.value, this.page)
      .then(({ data }) => {
        if (data.results.length === 0) {
          info({ text: "That's the end", delay: 900 });
          this.hideObserver();
          return;
        }
        galleryRef.insertAdjacentHTML('beforeend', cardTmpl(addActiveBtn(data)));
        console.log(addActiveBtn(data));
        this.last.nextElementSibling.lastElementChild.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
        this.restartObserver();
      })
      .catch(() => {
        this.hideObserver();
        error({
          text: 'Oops something went wrong', delay: 100
        })
      });
  },

  restartObserver() {
    setTimeout(() => {
      this.blocked = false;
      observeRef.classList.remove('observe--hidden');
      this.page++;
    }, 500);
  },
  hideObserver() {
    setTimeout(() => {
      observeRef.classList.add('observe--hidden');
    }, 200);

  }
}
export const renderPlayingNow = () => {
  document.querySelector('.page-result').innerHTML = '';
  if (document.querySelector('.title')) {
    document.querySelector('.title').remove();
  }
  document.querySelector('.search-result').insertAdjacentHTML("afterbegin", `<h2 class="title">Playing now</h2>`);
  playingNowRequest().then(({ data }) => {
    galleryRef.innerHTML = cardTmpl(addActiveBtn(data));
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
    .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));
};
const addActiveBtn = (data) => {
  const likeList = JSON.parse(localStorage.getItem('like-list'));
  const watchLaterList = JSON.parse(localStorage.getItem('watch-later'));
  const { results } = data;
  results.map(element => {
    element.liked = likeList.includes(JSON.stringify(element.id));
    element.watchLater = watchLaterList.includes(JSON.stringify(element.id));
  });
  tippy('[data-tippy-content]', {
    placement: 'bottom',
    theme: 'light-border',
    animation: 'shift-away'
  });
  return data
};
const addActiveBtnPage = (data) => {
  const likeList = JSON.parse(localStorage.getItem('like-list'));
  const watchLaterList = JSON.parse(localStorage.getItem('watch-later'));
  data.liked = likeList.includes(JSON.stringify(data.data.id));
  data.watchLater = watchLaterList.includes(JSON.stringify(data.data.id));
  tippy('[data-tippy-content]', {
    placement: 'bottom',
    theme: 'light-border',
    animation: 'shift-away'
  });
  console.log(data.watchLater)
  return data
};

export const renderPage = (id) => {
  document.querySelector('.title').remove();
  observeRef.classList.add('observe--hidden');
  pageRequest(id).then((data) => {
    galleryRef.innerHTML = '';
    document.querySelector('.page-result').innerHTML = pageTmpl(addActiveBtnPage(data));
    document.querySelector('.page__menu').addEventListener('click', changeLikes);
    document.querySelector('.page__menu').addEventListener('click', changeWatchLaterList);
  })
    .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));

};
export const renderUpcoming = () => {
  document.querySelector('.page-result').innerHTML = "";
  upcomingRequest().then(({ data }) => {
    document.querySelector('.title').remove();
    document.querySelector('.search-result').insertAdjacentHTML("afterbegin", `<h2 class="title">Coming soon</h2>`);
    galleryRef.innerHTML = cardTmpl(addActiveBtn(data));
    if (data.results.length === 0) {
      error({ text: 'Popular films not found', delay: 700 });
      return;
    };
  })
    .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));

};

export async function renderFavorite (data) {
  let results = [];
  let result = {};
  document.querySelector('.title').remove();
  document.querySelector('.search-result').insertAdjacentHTML("afterbegin", `<h2 class="title">Favorite movies</h2>`);
  for (let i of data){
    await pageRequest(i).then((data) => {results.push(data)})
      .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));
  }
  result.results = results;
  if (result.results.length === 0) {
    error({ text: 'Films in your favorite not found', delay: 700 });
    return;
  };
  document.querySelector('.page-result').innerHTML = '';
  observeRef.classList.add('observe--hidden');
  galleryRef.innerHTML = favTmpl(addActiveBtn(result));
};
export async function renderPlaylist (data) {
  let results = [];
  let result = {};
  document.querySelector('.title').remove();
  document.querySelector('.search-result').insertAdjacentHTML("afterbegin", `<h2 class="title">Your playlist</h2>`);
  for (let i of data){
    await pageRequest(i).then((data) => {results.push(data)})
      .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));
  }
  result.results = results;
  if (result.results.length === 0) {
    error({ text: 'Films in your playlist not found', delay: 700 });
    return;
  };
  document.querySelector('.page-result').innerHTML = '';
  observeRef.classList.add('observe--hidden');
  galleryRef.innerHTML = favTmpl(addActiveBtn(result));
};

