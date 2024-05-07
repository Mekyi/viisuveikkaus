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

const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')
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
      <QItem class="text-h5">
        <QItemSection avatar>
          {{ zeroPad(contestant.order, 2) }}
        </QItemSection>
        <QItemSection>
          <QItemLabel lines="1">
            <span class="q-pr-md">
              <CountryFlag
                :country="contestant.country.toUpperCase()"
                size="normal"
                style="margin-bottom: -11px"
              />
            </span>
            {{ $t(`countries.${contestant.country}`) }}
          </QItemLabel>
        </QItemSection>
        <QSpace />
        <QItemSection
          avatar
          side
        >
          <QBtn
            v-if="contestant.rating"
            rounded
            color="yellow"
            text-color="black"
            dense
          >
            <QIcon
              left
              name="star"
            />
            {{ contestant.rating }}
          </QBtn>
          <QBtn
            v-else
            rounded
            color="orange"
            text-color="black"
            icon="star"
          >
          </QBtn>
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
            {{ $t(`countries.${contestant.country}`) }}
          </p>
        </div>
      </QCardSection>
      <QCardSection>
        <div class="row text-h6">
          <p>{{ contestant.artist }} - {{ contestant.song }}</p>
        </div>
        <div
          v-if="canRate"
          class="row"
        >
          <QRating
            v-model="stars"
            max="5"
            size="4em"
            color="yellow"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            readonly
          />
          <QSlider
            v-model="stars"
            class="q-mb-xl"
            color="yellow"
            :thumb-color="stars === 0 ? 'grey' : 'yellow'"
            snap
            :min="0"
            :max="5"
            :step="0.5"
            thu
          >
          </QSlider>
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
