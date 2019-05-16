<template>
  <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
    <h1>Übersicht der Qualitätsregelkarten</h1>
    <v-layout row wrap>
      <v-flex xs12 sm6 style="padding: 2%;">
        <v-card>
          <v-img
            src="https://via.placeholder.com/728x90.png?text=Visit+WhoIsHostingThis.com+Buyers+Guide"
             aspect-ratio="2.75"
          ></v-img>
          <v-card-title>
            <h2>QRK Titel</h2>
          </v-card-title>
          <v-card-actions>
            <v-btn class="primary">Ansehen</v-btn>
            <v-btn class="primary">
              <v-icon>add</v-icon>Messwert
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: "Dashboard", disabled: false, href: "/" },
      { text: "QM", disabled: true, href: "/qm/qrkoverview" }
    ]
  })
};
</script>

<style>
</style>
