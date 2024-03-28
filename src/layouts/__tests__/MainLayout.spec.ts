import { describe, it, expect } from 'vitest'

import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import MainLayout from '../MainLayout.vue'
import { RouterView } from 'vue-router'
import router from '@/router'

installQuasarPlugin()

describe('MainLayout.vue', () => {
  it('contains title prop in header', () => {
    const title = 'This is the title string prop'
    const wrapper = mount(MainLayout, { props: { title } })

    expect(wrapper.find('header').text()).toContain(title)
  })

  it('has nested RouterView', () => {
    const wrapper = mount(MainLayout, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.findComponent(RouterView).exists()).toBe(true)
  })
})
