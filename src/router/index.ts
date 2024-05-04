import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import RatingView from '@/views/RatingView.vue'
import PredictionView from '@/views/PredictionView.vue'
import CountriesView from '@/views/CountriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: 'rating', component: RatingView, alias: '/' },
        { path: 'prediction', component: PredictionView },
        { path: 'countries', component: CountriesView }
      ]
    }
  ]
})

export default router
