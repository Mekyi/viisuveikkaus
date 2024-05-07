<script setup lang="ts">
// import ContestantCard from '@/components/ContestantCard.vue'
import PlacementSelection from '@/components/PlacementSelection.vue'
// import { useContestsStore } from '@/stores/contests'
import { usePredictionStore } from '@/stores/prediction'
// import { type Contestant } from '@/ts/types/contestant'
import { onMounted, ref } from 'vue'
import draggable from 'vuedraggable'

// const dragList = ref<Contestant[] | undefined>()

// const contestsStore = useContestsStore()
const predictionStore = usePredictionStore()
const drag = ref(false)
const test = ref<Object[]>([])

onMounted(() => {
  for (let index = 0; index < predictionStore.topListLength; index++) {
    test.value.push({ id: index })
  }
})

// onMounted(() => {
//   dragList.value = contestsStore.availableShows.find(
//     (show) => show.showType === contestsStore.selectedShow
//   )?.contestants
// })
</script>

<template>
  <div>
    <h1>{{ `TOP-${predictionStore.topListLength}` }}</h1>
    <draggable
      :list="test"
      item-key="country"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <PlacementSelection :predicted-placement="element.id" />
      </template>
    </draggable>
  </div>
</template>
