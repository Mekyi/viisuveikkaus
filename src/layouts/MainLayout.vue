<template>
  <QLayout view="hHh lpR lFf">
    <QHeader elevated>
      <QToolbar>
        <QToolbarTitle>Title</QToolbarTitle>
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
