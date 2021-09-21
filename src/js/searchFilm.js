import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org';
const key = '973f836f86ee5af25313d0a8c5bc0a33';

export const queryRequest = (query, page) => {
  return axios.get(`3/search/movie?api_key=${key}&query=${query}&page=${page}`);
};

// https://api.themoviedb.org/3/trending/movie/week?api_key=973f836f86ee5af25313d0a8c5bc0a33
export const popularRequest = () => {
  return axios.get(`3/trending/movie/week?api_key=${key}`);
};