<script setup lang="ts">
const props = defineProps<{
  title?: String
}>()
</script>

<template>
  <QLayout view="hHh lpR lFf">
    <QHeader elevated>
      <QToolbar>
        <QToolbarTitle v-if="props.title">Viisuveikkaus - {{ props.title }}</QToolbarTitle>
        <QToolbarTitle v-else>Viisuveikkaus</QToolbarTitle>
      </QToolbar>

      <QTabs>
        <QRouteTab to="/rating" label="Rating" />
        <QRouteTab to="/prediction" label="Prediction" />
      </QTabs>
    </QHeader>

    <QPageContainer>
      <RouterView />
    </QPageContainer>
  </QLayout>
</template>
