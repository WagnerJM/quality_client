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
        <v-flex xs12 sm6 style="padding: 2%;" v-for="(qrk, i) in this.$store.state.qrks" :key="i">
          <v-card>
            <v-img :src="qrk.datei_pfad" aspect-ratio="2.75"></v-img>
            <v-card-title>
              <h2>{{qrk.titel}}</h2>

              <v-icon right @click="editItem(qrk)">edit</v-icon>
            </v-card-title>
            <v-card-actions v-if="qrks !== []">
              <v-btn class="primary" :to="{ name: 'qrk', params: {qrk_id: qrk.id} }" fab small>
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
              <v-btn color="blue darken-1" flat @click="close()">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import http from '../../axios-instance';

export default {
  computed: {
    qrks() {
      return this.$store.getters["qrks"];
    },
    formTitle() {
      return this.editedIndex === "" ? "Neue Regelkarte" : "Bearbeiten";
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
      y_achse_titel: ""
    },
    defaultItem: {
      titel: "",
      x_achse_titel: "",
      y_achse_titel: ""
    }
  }),
  methods: {
    save() {
      const formData = {
        titel: this.editedItem.titel,
        x_achse_titel: this.editedItem.x_achse_titel,
        y_achse_titel: this.editedItem.y_achse_titel
      };

      if (this.editedIndex === "") {
        this.$store.dispatch("SAVE_NEW_QRK", formData);
        this.dialog = false;
      } else {
        http.put(`/qrk/${this.editedIndex}`, {titel: formData.titel, x_achse_titel: formData.x_achse_titel, y_achse_titel: formData.y_achse_titel})
        .then((res) => {
          this.$store.dispatch("GET_DATA");
        }).catch((error) => {
          console.log(error)
        })
        this.dialog = false;
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = "";
      }, 300);
    },
    editItem(qrk) {
      this.editedIndex = qrk.id;
      // eslint-disable-next-line
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, qrk);
      this.dialog = true;
    }
  }
};
</script>

<style>
</style>
