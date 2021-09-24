const addToLiked = (likeList, ID) => {
  if (likeList.includes(ID)) return;
  likeList.push(ID);
  localStorage.setItem('like-list', JSON.stringify(likeList));
  document.querySelector('.controls__counter--favorite').innerHTML = JSON.parse(
    localStorage.getItem('like-list'),
  ).length;
};

const addToWatchLater = (likeList, ID) => {
  likeList.push(ID);
  localStorage.setItem('watch-later', JSON.stringify(likeList));
  document.querySelector('.controls__counter--watch-later').innerHTML = JSON.parse(
    localStorage.getItem('watch-later'),
  ).length;
};

const removeFromWatchLater = (likeList, ID) => {
  likeList.splice(likeList.indexOf(ID), 1);
  localStorage.setItem('watch-later', JSON.stringify(likeList));
  document.querySelector('.controls__counter--watch-later').innerHTML = JSON.parse(
    localStorage.getItem('watch-later'),
  ).length;
};

const removeFromLicked = (likeList, ID) => {
  likeList.splice(likeList.indexOf(ID), 1);
  localStorage.setItem('like-list', JSON.stringify(likeList));
  document.querySelector('.controls__counter--favorite').innerHTML = JSON.parse(
    localStorage.getItem('like-list'),
  ).length;
};

export const changeLikes = event => {
  const btn = event.target.closest('.card-menu__btn--like');
  if (!btn) return;
  btn.classList.toggle('card-menu__btn--liked');
  const ID = btn.parentNode.dataset.id;
  const likeList = JSON.parse(localStorage.getItem('like-list'));
  if (btn.classList.contains('card-menu__btn--liked')) {
    addToLiked(likeList, ID);
  } else {
    removeFromLicked(likeList, ID);
  }
};

export const changeWatchLaterList = event => {
  const btn = event.target.closest('.card-menu__btn--watch-later');
  if (!btn) return;
  btn.classList.toggle('card-menu__btn--later');
  const ID = btn.parentNode.dataset.id;
  const likeList = JSON.parse(localStorage.getItem('watch-later'));
  if (btn.classList.contains('card-menu__btn--later')) {
    addToWatchLater(likeList, ID);
  } else {
    removeFromWatchLater(likeList, ID);
  }
};
