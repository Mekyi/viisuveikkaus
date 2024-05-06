<script setup lang="ts">
import { type Contestant } from '@/ts/types/contestant'
import { ref, toRefs } from 'vue'
import CountryFlag from 'vue-country-flag-next'

const props = defineProps<{
  contestant: Contestant
  canRate?: boolean | undefined
}>()

const { contestant, canRate } = toRefs(props)

const dialogToggle = ref(false)
const stars = ref()

function openDialog(): void {
  stars.value = contestant.value.rating
  dialogToggle.value = true
}

function confirmRating(): void {
  contestant.value.rating = stars.value
}
</script>

<template>
  <QCard
    class="q-my-md"
    @click="openDialog"
  >
    <QCardSection
      class="text-white"
      style="background: linear-gradient(to right, #3f1c71, #9c27b0)"
    >
      <QItem class="text-h5 vertical-middle">
        <QItemSection>{{ contestant.order }}</QItemSection>
        <QItemSection>
          <div>
            <CountryFlag
              :country="contestant.country.toUpperCase()"
              size="normal"
            />
          </div>
        </QItemSection>
        <QItemSection>
          {{ contestant.country.toUpperCase() }}
        </QItemSection>
        <QItemSection>
          {{ contestant.rating }}
        </QItemSection>
      </QItem>
    </QCardSection>
  </QCard>

  <QDialog v-model="dialogToggle">
    <QCard>
      <QCardSection class="row items-center q-pb-none">
        <div class="text-h6">{{ $t('rating.rateHint') }}</div>
        <QSpace />
        <QBtn
          v-close-popup
          icon="close"
          flat
          round
          dense
        />
      </QCardSection>
      <QCardSection>
        <div class="row row-wrap text-h3 items center">
          <p>
            <CountryFlag
              :country="contestant.country.toUpperCase()"
              size="big"
            />
            {{ contestant.country }}
          </p>
        </div>
      </QCardSection>
      <QCardSection>
        <div class="row text-h6">
          <p>{{ contestant.artist }} - {{ contestant.song }}</p>
        </div>
        <div class="row">
          <QRating
            v-if="canRate"
            v-model="stars"
            :max="5"
            size="32px"
          />
        </div>
      </QCardSection>

      <QSeparator />

      <QCardActions align="right">
        <QBtn
          v-close-popup
          color="primary"
          :label="$t(`common.confirm`)"
          @click="confirmRating"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
