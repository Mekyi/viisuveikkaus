import { defineStore } from 'pinia'
import { useContestsStore } from './contests'

export const usePredictionStore = defineStore('prediction', () => {
  const contestsStore = useContestsStore()

  const topListLength = 10
  const lastListLength = 2

  function setPlacementPrediction(code: string, predictedPlacement: number) {
    const foundContest = contestsStore.contests?.find(
      (contest) => contest.year === contestsStore.selectedYear
    )
    if (!foundContest) {
      return
    }

    const foundShow = foundContest.shows.find(
      (show) => show.showType === contestsStore.selectedShow
    )
    if (!foundShow) {
      return
    }

    const foundContestant = foundShow.contestants.find(
      (contestant) => contestant.country.toLowerCase() === code.toLowerCase()
    )
    if (!foundContestant) {
      return
    }

    foundContestant.predictedPlacement = predictedPlacement
  }

  // const contestants = computed(() => {
  //   const foundContest = contests.value?.find((contest) => contest.year === selectedYear.value)
  //   if (!foundContest) {
  //     return []
  //   }

  //   const foundShow = foundContest?.shows.find((show) => show.showType === selectedShow.value)
  //   if (!foundShow) {
  //     return []
  //   }

  //   return foundShow.contestants
  // })

  // const availableShows = computed(() => {
  //   const foundContest = contests.value?.find((contest) => contest.year === selectedYear.value)
  //   if (!foundContest) {
  //     return []
  //   }

  //   return foundContest.shows
  // })

  return { topListLength, lastListLength, setPlacementPrediction }
})
