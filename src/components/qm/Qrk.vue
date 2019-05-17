
<template>
  <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
    <h1>{{qrk.titel}}</h1>
    <v-layout column>
      <v-flex>
        <v-img :src="qrk.bild_pfad"></v-img>
      </v-flex>

      <v-flex>
        <v-data-table :headers="headers" :items="qrk.messwerte" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.datum }}</td>
            <td class="text-xs-right">{{ props.item.wert }}</td>
            <td class="text-xs-right" v-if="props.item.value = true">
            
              <v-icon color="green">check</v-icon>
            </td>
            <td class="text-xs-right" v-else><v-icon color="red">close</v-icon></td>
          </template>
        </v-data-table>
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

  data: () => ({
    items: [
      { text: "Dashboard", disabled: false, href: "/" },
      { text: "QM", disabled: false, href: "/qm/qrkoverview" },
      { text: "QRK", disabled: true, href: "" }
    ],
    headers: [
      {
        text: "Datum",
        align: "left",
        sortable: true,
        value: "datum"
      },
      { text: "Wert", value: "wert", align: "right" },
      { text: "Gültig", value: "valid", align: "right" }
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
