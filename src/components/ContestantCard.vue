<script setup lang="ts">
import { type Contestant } from '@/ts/types/contestant'
import { ref, toRefs } from 'vue'
import CountryFlag from 'vue-country-flag-next'

const props = defineProps<{
  contestant: Contestant
  canRate?: boolean | undefined
  dragItem?: boolean | undefined
  dragIndex?: number | undefined
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
    :class="dragItem ? `q-my-sm` : `q-my-md`"
    @click="openDialog"
  >
    <QCardSection
      :class="dragItem ? 'q-pa-none' : 'q-pa-sm'"
      style="background: linear-gradient(to right, #3f1c71, #9c27b0)"
    >
      <QItem class="items-center justify-start">
        <QItemSection
          v-if="dragItem"
          avatar
          class="handle col-1"
        >
          <QIcon
            name="drag_handle"
            size="1.8em"
            color="grey"
          />
        </QItemSection>
        <QItemSection
          v-else
          avatar
          class="text-h6 col-1"
        >
          {{ zeroPad(contestant.order, 2) }}
        </QItemSection>
        <QItemSection class="col-2">
          <CountryFlag
            :country="contestant.country.toUpperCase()"
            size="normal"
            style="font-size: 0px"
          />
        </QItemSection>
        <QItemSection>
          <QItemLabel
            lines="1"
            class="text-h6"
          >
            {{ $t(`countries.${contestant.country}`) }}
          </QItemLabel>
        </QItemSection>
        <QChip
          v-if="contestant.rating"
          dense
          color="orange"
          icon="star"
        >
          {{ contestant.rating.toFixed(1) }}
        </QChip>
      </QItem>
    </QCardSection>
  </QCard>

  <QDialog v-model="dialogToggle">
    <QCard>
      <QCardSection class="row items-center q-pb-none">
        <div
          v-if="canRate"
          class="text-h6"
        >
          {{ $t('rating.rateHint') }}
        </div>
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
            size="xl"
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
