import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import settingsTmpl from '../templates/settings.hbs';
import { searchCountries, searchLang } from './searchFilm';
import { changeAxiosLanguage, changeAxiosRegion } from './searchFilm';
import { changeTheme, themeStyles } from './changeStyle';
import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css';

export const openSettings = () => {
  try {
    const instance = basicLightbox.create(
      `<div><img src="./images/loader.gif" alt="loader"></div>`,
    );
    instance.show();
    searchCountries().then(data => {
      searchLang().then(langData => {
        data.langData = langData.data;
        data.themes = {};
        data.themes.value = Object.keys(themeStyles);
        document.querySelector('.basicLightbox__placeholder').innerHTML = settingsTmpl(data);
       
        document.querySelector('#language').value = localStorage.getItem('language');
        document.querySelector('#theme').value = localStorage.getItem('theme');
        document
          .querySelector('#language')
          .addEventListener('change', event => changeAxiosLanguage(event.target.value));
        document.querySelector('#region').value = localStorage.getItem('region');
        document
          .querySelector('#region')
          .addEventListener('change', event => changeAxiosRegion(event.target.value));
        document
          .querySelector('#theme')
          .addEventListener('change', event => changeTheme(event.target.value));
        new SlimSelect({
          select: '#theme'
        });
        new SlimSelect({
          select: '#language',
        });
        new SlimSelect({
          select: '#region',
        });
      });
    });
  } catch {
    () => alert('Opps something went wrong');
  }
};
