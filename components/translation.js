import * as Localisation from 'expo-localization';
import i18n from 'i18n-js';
import { britishEnglish } from "./enGB";
import { americanEnglish } from './enUS';

i18n.translations = {
  en: britishEnglish,
  ['en-GB']: britishEnglish,
  ['en-US']: americanEnglish,
}

i18n.locale = Localisation.locale;
i18n.fallbacks = true;

export default i18n;