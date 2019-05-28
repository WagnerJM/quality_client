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

    <v-card>
      <v-layout row wrap>
        <v-flex xs12 sm6 style="padding: 2%;" v-for="(qrk, i) in qrks" :key="i">
          <v-card v-show="qrk.aktiv">
            <v-img :src="qrk.bild_pfad" aspect-ratio="2.75"></v-img>
            <v-card-title>
              <h2>{{qrk.titel}}</h2>

              <v-icon right @click="editItem(qrk)">edit</v-icon>
            </v-card-title>
            <v-card-actions>
              <v-btn class="primary" :to="{name: 'qrk', params: {qrk_id: qrk.id} }" fab small>
                <v-icon>search</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

      <v-card-text style="height: 150px; position: relative">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{on}">
            <v-btn absolute dark fab top right color="primary" v-on="on">
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{formTitle}}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap justify-center>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.titel" label="Titel"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.x_achse_titel" label="X-Achse"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.y_achse_titel" label="Y-Achse"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close($event)">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save($event)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    qrks() {
      return this.$store.getters["qrks"];
    },
    formTitle() {
      return this.editedIndex === "" ? "Neue Regelkarte" : "Bearbeiten";
    },
    getQRK() {

      return this.$store.dispatch("GET_ALL_QRK");

    }
  },
  data: () => ({
    items: [
      { text: "Dashboard", disabled: false, href: "/" },
      { text: "QM", disabled: true, href: "/qm/qrkoverview" }
    ],
    dialog: false,
    editedIndex: "",
    editedItem: {
      titel: "",
      x_achse_titel: "",
      y_achse_titel: "",
      aktiv: true
    },
    defaultItem: {
      titel: "",
      x_achse_titel: "",
      y_achse_titel: "",
      aktiv: true
    }
  }),
  methods: {
    save(event) {
	    this.$store.dispatch("SAVE_QRK", this.editedIndex, {titel: this.editedItem.titel, x_achse_titel:this.editedItem.x_achse_titel, y_achse_titel:this.editedItem.y_achse_titel});
      this.dialog = false;
    },
    close(event) {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = "";
      }, 300);
    },
    editItem(qrk) {
      this.editedIndex = this.qrks.indexOf(qrk);
      this.editedItem = Object.assign({}, qrk);
      this.dialog = true;
    }
  }
};
</script>

<style>
</style>
