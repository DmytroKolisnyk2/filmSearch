export const addActiveBtn = data => {
  const likeList = JSON.parse(localStorage.getItem('like-list'));
  const watchLaterList = JSON.parse(localStorage.getItem('watch-later'));
  const { results } = data;
  results.map(element => {
    element.liked = likeList.includes(JSON.stringify(element.id));
    element.watchLater = watchLaterList.includes(JSON.stringify(element.id));
  });
  return data;
};

export const addActiveBtnPage = data => {
  const likeList = JSON.parse(localStorage.getItem('like-list'));
  const watchLaterList = JSON.parse(localStorage.getItem('watch-later'));
  data.liked = likeList.includes(JSON.stringify(data.data.id));
  data.watchLater = watchLaterList.includes(JSON.stringify(data.data.id));
  return data;
};

export const addActiveBtnFavorite = data => {
  const likeList = JSON.parse(localStorage.getItem('like-list'));
  const watchLaterList = JSON.parse(localStorage.getItem('watch-later'));
  const { results } = data;
  results.map(element => {
    element.favoriteList = true;
    element.data.liked = likeList.includes(JSON.stringify(element.data.id));
    element.data.watchLater = watchLaterList.includes(JSON.stringify(element.data.id));
  });
  return data;
};

export const addActiveBtnWatchLater = data => {
  const likeList = JSON.parse(localStorage.getItem('like-list'));
  const watchLaterList = JSON.parse(localStorage.getItem('watch-later'));
  const { results } = data;
  results.map(element => {
    element.watchLaterList = true;
    element.data.liked = likeList.includes(JSON.stringify(element.data.id));
    element.data.watchLater = watchLaterList.includes(JSON.stringify(element.data.id));
  });
  return data;
};
