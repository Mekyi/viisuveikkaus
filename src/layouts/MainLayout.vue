<script setup lang="ts">
const props = defineProps<{
  title?: String
}>()
</script>

<template>
  <QLayout view="hHh lpR lFf">
    <QHeader elevated>
      <QToolbar>
        <QToolbarTitle v-if="props.title">{{ $t('title') }} - {{ props.title }}</QToolbarTitle>
        <QToolbarTitle v-else>{{ $t('title') }}</QToolbarTitle>
        <QBtn
          flat
          round
          dense
          icon="more_vert"
        >
          <QMenu ref="menu">
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
          </QMenu>
        </QBtn>
      </QToolbar>
    </QHeader>

    <QPageContainer class="fit">
      <RouterView />
    </QPageContainer>

    <QFooter>
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
