import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { Quasar, Dark } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import { createI18n } from 'vue-i18n'
import en from './i18n/en.json'
import fi from './i18n/fi.json'
type MessageSchema = typeof en

const app = createApp(App)

const i18n = createI18n<[MessageSchema], 'en' | 'fi'>({
  locale: 'fi',
  fallbackLocale: 'en',
  messages: {
    en: en,
    fi: fi
  }
})

app.use(i18n)
app.use(createPinia())
app.use(router)

app.use(Quasar, {
  plugins: {}
})

Dark.set(true)

app.mount('#app')
