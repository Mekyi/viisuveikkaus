<script setup lang="ts">
import { useContestsStore } from '@/stores/contests'
import { ref } from 'vue'

const toggleSideMenu = ref(false)
const contestsStore = useContestsStore()

function clearContestStorage() {
  contestsStore.contests = null
  location.reload()
}
</script>

<template>
  <QLayout view="hHh Lpr fFf">
    <QHeader elevated>
      <QToolbar>
        <QBtn
          flat
          round
          dense
          icon="menu"
          @click="toggleSideMenu = !toggleSideMenu"
        />
        <QToolbarTitle>
          {{ $t('title') }} {{ contestsStore.selectedYear }} -
          {{ contestsStore.selectedShow }}
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
                v-model="$i18n.locale"
                :options="$i18n.availableLocales"
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
              <QItemSection>{{ $t('common.clear') }}</QItemSection>
            </QItem>
          </QMenu>
        </QBtn>
      </QToolbar>
    </QHeader>

    <QDrawer
      v-model="toggleSideMenu"
      show-if-above
      :breakpoint="500"
      bordered
      overlay
    >
      <QScrollArea class="fit">
        <QList bordered>
          <QItem
            v-for="show in contestsStore.availableShows"
            :key="show.showType"
            v-ripple
            clickable
            @click="contestsStore.selectedShow = show.showType"
          >
            <QItemSection>{{ show.showType }} - {{ show.date }}</QItemSection>
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
        <QRouteTab
          to="/countries"
          :label="$t('countries.title')"
        />
      </QTabs>
    </QFooter>
  </QLayout>
</template>
