<script setup lang="ts">
import { useContestsStore } from '@/stores/contests'
import { usePredictionStore } from '@/stores/prediction'
import type { Contestant } from '@/ts/types/contestant'
import { onMounted, ref } from 'vue'
import draggable from 'vuedraggable'
import ContestantCard from '@/components/ContestantCard.vue'

const contestsStore = useContestsStore()
const predictionStore = usePredictionStore()
const dragList = ref<Contestant[] | undefined>([])

onMounted(() => {
  const contestants = contestsStore.availableShows.find(
    (show) => show.showType === contestsStore.selectedShow
  )?.contestants as Contestant[] | undefined

  dragList.value = JSON.parse(JSON.stringify(contestants))
  dragList.value?.sort((a, b) => {
    if (a.predictedPlacement == undefined) {
      return 1
    }

    if (b.predictedPlacement == undefined) {
      return -1
    }

    return a.predictedPlacement - b.predictedPlacement
  })
})

function onSorted() {
  if (dragList.value == undefined) {
    return
  }

  for (let index = 0; index < dragList.value.length; index++) {
    const element = dragList.value[index]

    predictionStore.setPlacementPrediction(element.country, index)
  }
}
</script>

<template>
  <div class="row">
    <draggable
      tag="ol"
      :list="dragList"
      class="list-group"
      handle=".handle"
      item-key="country"
      @sort="onSorted"
    >
      <template #item="{ element }">
        <li>
          <ContestantCard
            :contestant="element"
            :can-rate="false"
            :drag-item="true"
          />
        </li>
      </template>
    </draggable>
  </div>
</template>
