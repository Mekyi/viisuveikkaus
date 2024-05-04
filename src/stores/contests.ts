import { defineStore } from 'pinia'
import contestsData from '@/data/contests.json'
import { type Contest } from '@/ts/types/contest'
import ShowFormat from '@/ts/enums/showFormat'
import { computed, ref } from 'vue'

export const useContestsStore = defineStore('contests', () => {
  const contests = ref<Contest[]>()
  const selectedYear = ref<number>(2024)
  const selectedShow = ref<ShowFormat>(ShowFormat.FirstSemiFinal)

  contests.value = contestsData

  const contestants = computed(() => {
    const foundContest = contests.value?.find((contest) => contest.year === selectedYear.value)
    if (!foundContest) {
      return []
    }

    const foundShow = foundContest?.shows.find((show) => show.showType === selectedShow.value)
    if (!foundShow) {
      return []
    }

    return foundShow.contestants
  })

  const availableShows = computed(() => {
    const foundContest = contests.value?.find((contest) => contest.year === selectedYear.value)
    if (!foundContest) {
      return []
    }

    return foundContest.shows
  })

  return { selectedYear, selectedShow, getContestants: contestants, availableShows }
})
