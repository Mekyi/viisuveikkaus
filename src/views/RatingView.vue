<script setup lang="ts">
import { useContestsStore } from '@/stores/contests'
import ShowFormat from '@/ts/enums/showFormat'

const contestsStore = useContestsStore()
contestsStore.selectedShow = ShowFormat.SecondSemiFinal
</script>

<template>
  <div
    v-for="contestant in contestsStore.getContestants"
    :key="contestant.country"
  >
    {{ contestant.artist }}
  </div>
</template>
