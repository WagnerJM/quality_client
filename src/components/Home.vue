<template>
  <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 style="top: 50%;">
        <v-card class="clickable" @click.native="card_click($event, '/qm/qrkoverview')">
          <v-img

            src="../assets/test.png"

            aspect-ratio="2.75"
          ></v-img>
          <v-card-title>
            <h2>QM/QC</h2>
          </v-card-title>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    card_click: function(event, path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
