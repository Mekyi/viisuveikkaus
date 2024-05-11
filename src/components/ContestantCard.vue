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
const stars = ref(0)

function openDialog(): void {
  if (contestant.value.rating != undefined) {
    stars.value = contestant.value.rating
  }
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
          v-if="contestant.rating != undefined"
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
    <QCard
      style="width: 700px; max-width: 80vw"
      class="bg-purple-10"
    >
      <QBar>
        {{ $t('rating.rateHint') }} #{{ zeroPad(contestant.order, 2) }}
        <QSpace />
        <QBtn
          v-close-popup
          icon="close"
          flat
          dense
        />
      </QBar>
      <QCardSection>
        <QList>
          <QItem>
            <QItemSection avatar>
              <QAvatar>
                <QIcon name="flag" />
              </QAvatar>
            </QItemSection>
            <QItemSection>
              <QItemLabel caption>{{ $t('common.country') }}</QItemLabel>
              <QItemLabel>
                <CountryFlag
                  :country="contestant.country.toUpperCase()"
                  size="small"
                  style="font-size: 16px"
                />
                {{ $t(`countries.${contestant.country}`) }}
              </QItemLabel>
            </QItemSection>
          </QItem>
          <QItem>
            <QItemSection avatar>
              <QAvatar>
                <QIcon name="groups" />
              </QAvatar>
            </QItemSection>
            <QItemSection>
              <QItemLabel caption>{{ $t('common.artist') }}</QItemLabel>
              <QItemLabel>
                {{ contestant.artist }}
              </QItemLabel>
            </QItemSection>
          </QItem>
          <QItem>
            <QItemSection avatar>
              <QAvatar>
                <QIcon name="music_note" />
              </QAvatar>
            </QItemSection>
            <QItemSection>
              <QItemLabel caption>{{ $t('common.song') }}</QItemLabel>
              <QItemLabel>
                {{ contestant.song }}
              </QItemLabel>
            </QItemSection>
          </QItem>
        </QList>
      </QCardSection>

      <QSeparator v-if="canRate" />

      <QCardSection
        v-if="canRate"
        class="justify-center"
      >
        <div class="text-center q-mx-auto">{{ $t('rating.title') }}</div>
        <div class="row">
          <QRating
            v-model="stars"
            max="5"
            size="xl"
            color="yellow"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            readonly
            class="q-mx-auto"
          />
        </div>
        <div class="row q-px-md">
          <QSlider
            v-model="stars"
            class="q-mb-md"
            color="yellow"
            :thumb-color="stars === 0 ? 'grey' : 'yellow'"
            snap
            :min="0"
            :max="5"
            :step="0.5"
            thumb-size="27px"
          >
          </QSlider>
        </div>
      </QCardSection>

      <QSeparator v-if="canRate" />

      <QCardActions
        v-if="canRate"
        align="right"
      >
        <QBtn
          v-close-popup
          flat
          :label="$t(`common.confirm`)"
          @click="confirmRating"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
