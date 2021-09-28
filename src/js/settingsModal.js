import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import settingsTmpl from '../templates/settings.hbs';
import { searchCountries, searchLang } from './searchFilm';

export const openSettings = () => {
  try {
    searchCountries().then((data) => {
      searchLang().then((langData) => {
        data.langData = langData.data;
        const instance = basicLightbox.create(`${settingsTmpl(data)}`);
        instance.show()
      })
    })
  }
  catch { () => alert("Opps something went wrong") }
}