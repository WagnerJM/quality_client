
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

    <v-layout row>
      <v-flex xs12 sm6 md4>
        <h1>{{qrk.titel}}</h1>
      </v-flex>
      <v-flex offset-xs5 offset-md8 offset-lg8>
        <v-btn fab small icon color="primary" to="/qm/qrkoverview">
          <v-icon>arrow_back_ios</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout column>
      <v-flex>
        <v-img :src="qrk.datei_pfad"></v-img>
      </v-flex>
      <v-flex>
        <v-toolbar flat>
          <v-toolbar-title>
            <h2>Messwerte</h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items></v-toolbar-items>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn icon color="primary" class="mb-2" v-on="on">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{formTitle}}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.datum" label="Datum"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.wert" label="Wert"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-checkbox v-model="editedItem.valid" label="Gültig"></v-checkbox>
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
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="qrk.messwerte"
          :rows-per-page-items="this.paginate_numbers"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.datum }}</td>
            <td class="text-xs-right">{{ props.item.wert }}</td>
            <td class="text-xs-right" v-if="props.item.valid == true">
              <v-icon color="green">check</v-icon>
            </td>
            <td class="text-xs-right" v-else>
              <v-icon color="red">close</v-icon>
            </td>
            <td class="text-xs-right">
              <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            </td>
          </template>
          <template v-slot:footer>
            <td :colspan="headers.length"></td>
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
    editedIndex: "",
    editedItem: {
      datum: "",
      wert: 0.0,
      valid: true
    },
    defaultItem: {
      datum: "",
      wert: 0.0,
      valid: true
    },
    dialog: false,
    paginate_numbers: [20, 25, 40, 50],
    direction: "left",
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-y-reverse-transition",
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
      { text: "Gültig", value: "valid", align: "right" },
      { text: "Actions", value: "valid", align: "right" }
    ]
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === "" ? "Neuer Messwert" : "Bearbeiten";
    },
    qrks() {
      return this.$store.getters["qrks"];
    },
    qrk() {
      return this.qrks.find(qrk => qrk.id === this.qrk_id);
    }
  },
  methods: {
    editItem(messwert) {
      this.editedIndex = messwert.id;
      this.editedItem = Object.assign({}, qrk);
      this.dialog = true;
    },

    close(event) {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = "";
      }, 300);
    },
    save(event) {
        const formData = {
            datum: this.editedItem.datum,
                wert: this.editedItem.wert,
                valid: this.editedItem.valid
        }
            this.$store.dispatch('SAVE_NEW_MESSWERT',
                {
                    datum: formData.datum,
                    wert: formData.wert,
                    valid: formData.valid
                })
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
