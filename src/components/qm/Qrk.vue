<template>
  <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
    <h1>{{qrk.titel}}</h1>
    <v-layout>
      <v-flex>
        <v-img :src="{{ qrk.bild_pfad }}"></v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "qrk",
  props: {
    qrk_id: {
      type: String,
      required: true
    }
  },
  created() {
    this.qrk_id = this.$route.params.qrk_id;
  },
  data: () => ({
    items: [
      { text: "Dashboard", disabled: false, href: "/" },
      { text: "QM", disabled: false, href: "/qm/qrkoverview" },
      { text: "QRK", disabled: true, href: "" }
    ]
  }),
  computed: {
    qrks() {
      return this.$store.getters["qrks"];
    },
    qrk() {
      return this.qrks.find(qrk => qrk.id === this.qrk_id);
    }
  }
};
</script>

<style>
</style>
