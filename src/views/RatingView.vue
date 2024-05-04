<script setup lang="ts">
import ContestantCard from '@/components/ContestantCard.vue'
import { useContestsStore } from '@/stores/contests'
import ShowFormat from '@/ts/enums/showFormat'

const contestsStore = useContestsStore()
contestsStore.selectedShow = ShowFormat.SecondSemiFinal
</script>

<template>
  <ContestantCard
    v-for="contestant in contestsStore.getContestants"
    :key="contestant.country"
    :contestant="contestant"
  />
</template>
