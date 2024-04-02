import { mount } from '@vue/test-utils'
import router from '../src/router'

import type { Component } from 'vue'
import { createI18n } from 'vue-i18n'
import en from '../src/i18n/en.json'
import fi from '../src/i18n/fi.json'
type MessageSchema = typeof en

const createWrapper = (component: Component, options = {}) => {
  const i18n = createI18n<[MessageSchema], 'en' | 'fi'>({
    locale: 'fi',
    fallbackLocale: 'en',
    messages: {
      en: en,
      fi: fi
    }
  })

  return mount(component, {
    global: {
      plugins: [router, i18n]
    },
    mocks: {
      $t: (msg: String) => msg
    },
    ...options
  })
}

export default createWrapper
