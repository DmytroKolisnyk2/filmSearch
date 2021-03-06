import cardTmpl from '../templates/searchCard.hbs';
import asideListTmpl from '../templates/asideList.hbs';
import pageTmpl from '../templates/page.hbs';
import favTmpl from '../templates/favorite.hbs';
import { error, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import {
  queryRequest,
  popularRequest,
  playingNowRequest,
  pageRequest,
  similarRequest,
  upcomingRequest,
  videoRequest,
} from './searchFilm';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/animations/shift-away.css';
import { changeLikes, changeWatchLaterList } from './addToList';
import { tns } from 'tiny-slider/src/tiny-slider';
import 'tiny-slider/src/tiny-slider.scss';
import {
  addActiveBtn,
  addActiveBtnPage,
  addActiveBtnFavorite,
  addActiveBtnWatchLater,
} from './addActiveBtn.js';

const inputRef = document.querySelector('.header__search');
const galleryRef = document.querySelector('.search-result__card-container');
const observeRef = document.querySelector('#observe');
const asideListRef = document.querySelector('.best-movies__list');
const cardRef = document.querySelector('.card__menu');

export const searchApp = {
  page: 1,

  searchPhoto() {
    if (document.querySelector('.title')) {
      document.querySelector('.title').remove();
    }
    if (inputRef.value.length === 0) return;
    document.querySelector('.page-result').innerHTML = '';
    galleryRef.innerHtml = '';
    this.page = 1;
    this.blocked = true;
    observeRef.classList.remove('observe--hidden');
    queryRequest(inputRef.value, this.page)
      .then(({ data }) => {
        galleryRef.innerHTML = cardTmpl(addActiveBtn(data));
        addTippy();
        if (data.total_pages === 1) {
          this.hideObserver();
          return;
        }
        if (data.results.length === 0) {
          this.hideObserver();
          error({ text: 'Query not found', delay: 700 });
          return;
        }

        observer.observe(observeRef);
        setTimeout(() => this.restartObserver(), 500);
      })
      .catch(() => {
        this.hideObserver();
        error({
          text: 'Oops something went wrong',
          delay: 1000,
        });
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
        addTippy();
        this.last.nextElementSibling.lastElementChild.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
        this.restartObserver();
      })
      .catch(() => {
        this.hideObserver();
        error({
          text: 'Oops something went wrong',
          delay: 100,
        });
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
  },
};

export const renderPage = id => {
  try {
    document.querySelector('.page-result').innerHTML = '';
    if (document.querySelector('.title')) {
      document.querySelector('.title').remove();
    }
    showLoader();
    (async () => {
      const page = await pageRequest(id).then(data => data);
      const similar = await similarRequest(id).then(similar => similar);
      const video = await videoRequest(id).then(video => video);

      Promise.all([page, similar, video]).then(res => {
        const data = page;
        data.similar = similar.data;
        if (video.data.results[0]) data.video = video.data.results[0].key;
        galleryRef.innerHTML = '';
        document.querySelector('.page-result').innerHTML = pageTmpl(addActiveBtnPage(data));
        document.querySelector('.page__menu').addEventListener('click', changeLikes);
        document.querySelector('.page__menu').addEventListener('click', changeWatchLaterList);
        observeRef.classList.add('observe--hidden');
        document.querySelector('.info__slider').addEventListener('click', event => {
          let target = event.target;
          if (!target.dataset.id) return;
          renderPage(target.dataset.id);
        });
        const slider = tns({
          container: '.info__slider',
          arrowKeys: true,
          mouseDrag: true,
          nav: false,
          controlsContainer: '.info__custom-control',
          responsive: {
            768: {
              items: 3,
            },
            1200: {
              items: 5,
            },
            1400: {
              items: 7,
            },
          },
        });
        addTippy();
      });
    })();
  } catch (err) {
    error({ text: 'Oops something went wrong', delay: 1000 });
  }
};

export const renderPopular = () => {
  popularRequest()
    .then(({ data }) => {
      asideListRef.innerHTML = asideListTmpl(data);
      if (data.results.length === 0) {
        error({ text: 'Films in your region not found', delay: 700 });
        return;
      }
    })
    .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));
};

export const renderPlayingNow = () => {
  showLoader();
  document.querySelector('.page-result').innerHTML = '';
  if (document.querySelector('.title')) {
    document.querySelector('.title').remove();
  }
  document
    .querySelector('.search-result')
    .insertAdjacentHTML('afterbegin', `<h2 class="title">Playing now</h2>`);
  playingNowRequest()
    .then(({ data }) => {
      galleryRef.innerHTML = cardTmpl(addActiveBtn(data));
      addTippy();
      observeRef.classList.add('observe--hidden');
      if (data.results.length === 0) {
        error({ text: 'Popular films not found', delay: 700 });
        return;
      }
    })
    .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));
};

export const renderUpcoming = () => {
  showLoader();
  document.querySelector('.page-result').innerHTML = "";
  if (document.querySelector('.title')) {
    document.querySelector('.title').remove();
  }
  upcomingRequest()
    .then(({ data }) => {
      document.querySelector('.search-result').insertAdjacentHTML("afterbegin", `<h2 class="title">Coming soon</h2>`);
      galleryRef.innerHTML = cardTmpl(addActiveBtn(data));
      observeRef.classList.add('observe--hidden');
      addTippy();
      if (data.results.length === 0) {
        error({ text: 'Popular films not found', delay: 700 });
        return;
      }
    })
    .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));
};

const addTippy = () => {
  tippy('[data-tippy-content]', {
    placement: 'bottom',
    theme: 'light-border',
    animation: 'shift-away',
  });
};

const showLoader = () => {
  galleryRef.innerHTML = '';
  observeRef.classList.remove('observe--hidden');
  observer.unobserve(observeRef);
  document.querySelector('.page-result').innerHTML = '';
};

export async function renderFavorite(data) {
  if (data.length === 0) {
    error({ text: 'Liked films not found', delay: 700 });
    return;
  };
  let results = [];
  let result = {};
  document.querySelector('.page-result').innerHTML = '';
  if (document.querySelector('.title')) {
    document.querySelector('.title').remove();
  }
  document
    .querySelector('.search-result')
    .insertAdjacentHTML('afterbegin', `<h2 class="title">Favorite movies</h2>`);
  showLoader();
  for (let i of data) {
    await pageRequest(i)
      .then(data => {
        results.push(data);
      })
      .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));
  }
  result.results = results;
  observeRef.classList.add('observe--hidden');
  galleryRef.innerHTML = favTmpl(addActiveBtnFavorite(result));
  addTippy();
  
}

export async function renderPlaylist(data) {
  if (data.length === 0) {
    error({ text: 'Films in your playlist not found', delay: 700 });
    return;
  };
  document.querySelector('.page-result').innerHTML = '';
  if (document.querySelector('.title')) {
    document.querySelector('.title').remove();
  }
  let results = [];
  let result = {};
  document
    .querySelector('.search-result')
    .insertAdjacentHTML('afterbegin', `<h2 class="title">Your playlist</h2>`);
  showLoader();
  for (let i of data) {
    await pageRequest(i)
      .then(data => {
        results.push(data);
      })
      .catch(() => error({ text: 'Oops something went wrong', delay: 1000 }));
  }
  result.results = results;
  
  observeRef.classList.add('observe--hidden');
  galleryRef.innerHTML = favTmpl(addActiveBtnWatchLater(result));

  addTippy();
  
}

const observer = new IntersectionObserver(searchApp.updatePhotos.bind(searchApp, observeRef));
