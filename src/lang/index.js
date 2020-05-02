import VueI18n from 'vue-i18n'
import Vue from 'vue'
import English from './en/English'
import French from './fr/French'

const messages = {
  en: English,
  fr: French
}

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'fr ',
  messages : messages,
});

export default i18n;
