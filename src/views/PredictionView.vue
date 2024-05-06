<script setup lang="ts">
import ContestantCard from '@/components/ContestantCard.vue'
import { useContestsStore } from '@/stores/contests'
import { type Contestant } from '@/ts/types/contestant'
import { onMounted, ref } from 'vue'
import draggable from 'vuedraggable'

const dragList = ref<Contestant[] | undefined>()
const contestsStore = useContestsStore()
const drag = ref(false)

onMounted(() => {
  dragList.value = contestsStore.availableShows.find(
    (show) => show.showType === contestsStore.selectedShow
  )?.contestants
})
</script>

<template>
  <draggable
    :list="dragList"
    item-key="country"
    @start="drag = true"
    @end="drag = false"
  >
    <template #item="{ element }">
      <ContestantCard :contestant="element" />
    </template>
  </draggable>
</template>
