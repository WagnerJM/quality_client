<template>
  <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
    <h1>QRK Titel</h1>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: "Dashboard", disabled: false, href: "/" },
      { text: "QM", disabled: false, href: "/qm/qrkoverview" },
      { text: "QRK", disabled: true, href: "" }
    ]
  })
};
</script>

<style>
</style>
