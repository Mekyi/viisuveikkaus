import { defineStore } from 'pinia'
import contestsData from '@/data/contests.json'
import { type Contest } from '@/ts/types/contest'
import ShowFormat from '@/ts/enums/showFormat'
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const useContestsStore = defineStore('contests', () => {
  const contests = useStorage<Contest[] | null>('contests', contestsData, localStorage)
  const selectedYear = ref<number>(2024)
  const selectedShow = ref<ShowFormat | null>(ShowFormat.FirstSemiFinal)

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

  const getDefaultShow = computed(() => {
    const currentDate = Date.now()

    if (availableShows.value.length < 1) {
      return 1
    }

    // Compare contest shows and get the latest show in the past
    return availableShows.value.reduce((latestShow, currentShow) => {
      return Date.parse(currentShow.date) > Date.parse(latestShow.date) &&
        Date.parse(currentShow.date) <= currentDate
        ? currentShow
        : latestShow
    }).showType
  })

  selectedShow.value = getDefaultShow.value

  return { contests, selectedYear, selectedShow, getContestants: contestants, availableShows }
})
