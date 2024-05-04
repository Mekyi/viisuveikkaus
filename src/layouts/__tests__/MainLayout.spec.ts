import { describe, it, expect } from 'vitest'

import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import MainLayout from '../MainLayout.vue'
import { RouterView } from 'vue-router'
import createWrapper from '../../../tests/create-wrapper'

installQuasarPlugin()

describe('MainLayout.vue', () => {
  it('has nested RouterView', () => {
    const wrapper = createWrapper(MainLayout)

    expect(wrapper.findComponent(RouterView).exists()).toBe(true)
  })
})
