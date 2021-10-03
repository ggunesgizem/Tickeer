import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import En from '~/Locale/En';
import Tr from '~/Locale/Tr';
import {getLanguage, setLanguage} from '~/Helpers/AsyncStorageHelper';

export enum Language {
  tr = 'tr',
  en = 'en',
}

const language = Language.en;

const languageUpdated = (_language: Language) => {
  setLanguage(_language);
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
      resources: {
        en: {
          translation: En,
        },
        tr: {
          translation: Tr,
        },
      },
      lng: language,
      fallbackLng: Language.en,
      interpolation: {
        escapeValue: false,
      },
    },
    () => {},
  );

export const currentLanguage = (): Language => {
  return i18n.language as Language;
};

export const interpolate = (str: string, data: object) => {
  return i18n.services.interpolator.interpolate(
    str,
    data,
    currentLanguage(),
    {},
  );
};

export const changeLanguage = (initialLanguage?: Language) => {
  return new Promise<void>((res) => {
    initialLanguage
      ? i18n.changeLanguage(initialLanguage).then(() => {
          languageUpdated(initialLanguage);
          res();
        })
      : getLanguage().then((lng) => {
          const _language = lng === Language.en ? Language.tr : Language.en;
          i18n.changeLanguage(_language).then(() => {
            languageUpdated(_language);
            res();
          });
        });
  });
};
