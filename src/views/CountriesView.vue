<script setup lang="ts">
import countriesData from '@/data/countries.json'
import CountryFlag from 'vue-country-flag-next'

// const countries: Country[] = countriesData as Country[]
</script>
<template>
  <div
    v-for="country in countriesData"
    :key="country.code"
  >
    <QCard class="q-my-md">
      <QCardSection
        class="text-white"
        style="background: linear-gradient(to right, #3f1c71, #9c27b0)"
      >
        <div class="text-h5 vertical-middle">
          <CountryFlag
            :country="country.code"
            size="normal"
          />
          <span class="q-ml-md">{{ country.name.toUpperCase() }}</span>
        </div>
      </QCardSection>
    </QCard>
  </div>
</template>
