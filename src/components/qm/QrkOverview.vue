<template>
  <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <v-breadcrumbs :items="items">
      <template v-slot:item="props">
        <v-breadcrumbs-item
          :href="props.item.href"
          :class="[props.item.disabled && 'disabled']"
          :disabled="props.item.disabled"
        >{{ props.item.text.toUpperCase() }}</v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <h1>Übersicht der Qualitätsregelkarten</h1>

    <v-layout row wrap>
      <v-flex xs12 sm6 style="padding: 2%;" v-for="(qrk, i) in qrks" :key="i">
        <v-card>
          <v-img :src="qrk.bild_pfad" aspect-ratio="2.75"></v-img>
          <v-card-title>
            <h2>{{qrk.titel}}</h2>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary" :to="{name: 'qrk', params: {qrk_id: qrk.id} }">Ansehen</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    qrks: state => state.qrks
  }),
  getQRK() {
    this.$store.dispatch("GET_ALL_QRK");
  },
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
