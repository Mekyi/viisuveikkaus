<script setup lang="ts">
import { type Contestant } from '@/ts/types/contestant'
import CountryFlag from 'vue-country-flag-next'

defineProps<{
  contestant: Contestant
}>()
</script>

<template>
  <QCard class="q-my-md">
    <QCardSection
      class="text-white"
      style="background: linear-gradient(to right, #3f1c71, #9c27b0)"
    >
      <QItem class="text-h5 vertical-middle">
        <QItemSection>{{ contestant.order }}</QItemSection>
        <QItemSection>
          <div>
            <CountryFlag
              :country="contestant.country.toUpperCase()"
              size="normal"
            />
          </div>
        </QItemSection>
        <QItemSection>
          {{ contestant.country.toUpperCase() }}
        </QItemSection>
      </QItem>
    </QCardSection>
  </QCard>
</template>
