<script setup lang="ts">
import { useContestsStore } from '@/stores/contests'
import ShowFormat from '@/ts/enums/showFormat'

const storeContests = useContestsStore()
storeContests.selectedShow = ShowFormat.SecondSemiFinal
</script>

<template>
  <div
    v-for="contestant in storeContests.getContestants"
    :key="contestant.country"
  >
    {{ contestant.artist }}
  </div>
</template>
