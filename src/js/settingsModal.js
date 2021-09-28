import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import settingsTmpl from '../templates/settings.hbs';
import { searchCountries, searchLang } from './searchFilm';

export const openSettings = () => {
  try {
    const instance = basicLightbox.create(`<div><img src="./images/loader.gif" alt="loader"></div>`);
    instance.show()
    searchCountries().then((data) => {
      searchLang().then((langData) => {
        data.langData = langData.data;
        document.querySelector('.basicLightbox__placeholder').innerHTML = settingsTmpl(data);
      })
    })
  }
  catch { () => alert("Opps something went wrong") }
}