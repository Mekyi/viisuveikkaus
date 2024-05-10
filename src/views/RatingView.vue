<script setup lang="ts">
import ContestantCard from '@/components/ContestantCard.vue'
import { useContestsStore } from '@/stores/contests'

const contestsStore = useContestsStore()
</script>

<template>
  <ContestantCard
    v-for="contestant in contestsStore.getContestants"
    :key="contestant.country"
    :contestant="contestant"
    :can-rate="true"
  />
</template>
