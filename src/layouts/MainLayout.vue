<script setup lang="ts">
import { useContestsStore } from '@/stores/contests'
import { ref, watch } from 'vue'
import logoUrl from '@/assets/logo.svg'
import { useI18n } from 'vue-i18n'
import type ShowFormat from '@/ts/enums/showFormat'

const toggleSideMenu = ref(false)
const contestsStore = useContestsStore()

const { locale } = useI18n({ useScope: 'global' })
const lang = ref(locale.value)
const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'fi', label: 'suomi' }
]

watch(lang, async (newLang: any) => {
  locale.value = newLang.value
})

function clearContestStorage() {
  contestsStore.contests = null
  location.reload()
}

function selectShow(showFormat: ShowFormat) {
  contestsStore.selectedShow = showFormat
  toggleSideMenu.value = false
}
</script>

<template>
  <QLayout view="hHh Lpr lFf">
    <QHeader elevated>
      <QToolbar>
        <QBtn
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
          @click="toggleSideMenu = !toggleSideMenu"
        />
        <QToolbarTitle style="font-size: 18px">
          {{ $t('title') }}
          {{ contestsStore.selectedYear }} -
          {{ $t(`showType[${contestsStore.selectedShow}]`) }}
        </QToolbarTitle>
        <QBtn
          flat
          round
          dense
          icon="more_vert"
        >
          <QMenu>
            <QItem>
              <QSelect
                v-model="lang"
                :options="localeOptions"
                map-options
                style="min-width: 150px"
                borderless
              >
                <template #prepend>
                  <QIcon name="language" />
                </template>
              </QSelect>
            </QItem>
            <QSeparator />
            <QItem
              v-close-popup
              clickable
              @click="clearContestStorage"
            >
              <QItemSection
                avatar
                dense
                round
              >
                <QIcon name="delete" />
              </QItemSection>
              <QItemSection>{{ $t('common.clear') }}</QItemSection>
            </QItem>
          </QMenu>
        </QBtn>
      </QToolbar>
    </QHeader>

    <QDrawer
      v-model="toggleSideMenu"
      :breakpoint="800"
      bordered
      overlay
    >
      <QScrollArea class="fit">
        <QToolbar class="bg-primary">
          <QAvatar square>
            <img :src="logoUrl" />
          </QAvatar>
          <QToolbarTitle class="text-h5">
            {{ $t('title') }}
          </QToolbarTitle>
          <QBtn
            dense
            flat
            unelevated
            icon="chevron_left"
            @click="toggleSideMenu = false"
          />
        </QToolbar>
        <QSeparator />
        <QItemSection> </QItemSection>
        <QList>
          <QItemLabel header>{{ contestsStore.selectedYear }}</QItemLabel>
          <QItem
            v-for="show in contestsStore.availableShows"
            :key="show.showType"
            v-ripple
            clickable
            :active="show.showType == contestsStore.selectedShow"
            @click="selectShow(show.showType)"
          >
            <QItemSection avatar>
              <QIcon name="navigate_next" />
            </QItemSection>
            <QItemSection>
              <QItemLabel class="text-6">{{ $t(`showType[${show.showType}]`) }}</QItemLabel>
              <QItemLabel caption>{{ show.date }} </QItemLabel>
            </QItemSection>
          </QItem>
        </QList>
      </QScrollArea>
    </QDrawer>

    <QPageContainer>
      <QPage padding>
        <RouterView />
      </QPage>
    </QPageContainer>

    <QFooter elevated>
      <QTabs>
        <QRouteTab
          to="/rating"
          :label="$t('rating.title')"
        />
        <QRouteTab
          to="/prediction"
          :label="$t('prediction.title')"
        />
      </QTabs>
    </QFooter>
  </QLayout>
</template>
