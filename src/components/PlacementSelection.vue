<script setup lang="ts">
import { useContestsStore } from '@/stores/contests'
import { ref } from 'vue'
import CountryFlag from 'vue-country-flag-next'

defineProps<{
  predictedPlacement: number
}>()

const contestsStorage = useContestsStore()
const selection = ref()
const availableContestants = ref(contestsStorage.getContestants.map((a) => a.country))
</script>

<template>
  <div class="row">
    <div class="col">{{ predictedPlacement }}.</div>
    <div class="col">
      <QSelect
        v-model="selection"
        :options="availableContestants"
      >
        <template
          v-if="selection"
          #append
        >
          <CountryFlag
            :country="selection.toUpperCase()"
            size="normal"
          />
        </template>
      </QSelect>
    </div>
  </div>
</template>
