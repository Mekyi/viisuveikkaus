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
const isDragging = ref(false)

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

function dragOptions() {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost'
  }
}
</script>

<template>
  <draggable
    :list="dragList"
    class="list-group"
    handle=".handle"
    item-key="country"
    v-bind="dragOptions"
    @start="isDragging = true"
    @end="isDragging = false"
    @sort="onSorted"
  >
    <template #item="{ element, index }">
      <div class="row items-center">
        <div class="col-1 text-h6 q-mx-sm">{{ index + 1 }}.</div>
        <div class="col">
          <ContestantCard
            :contestant="element"
            :can-rate="true"
            :drag-item="true"
            :drag-index="index"
          />
        </div>
      </div>
    </template>
  </draggable>
</template>
