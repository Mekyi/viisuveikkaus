import { mount } from '@vue/test-utils'
import router from '../src/router'

import type { Component } from 'vue'

const createWrapper = (component: Component, options = {}) => {
  return mount(component, {
    global: {
      plugins: [router]
    },
    mocks: {
      $t: (msg: String) => msg
    },
    ...options
  })
}

export default createWrapper
