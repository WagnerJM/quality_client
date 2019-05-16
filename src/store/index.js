import Vue from "vue";
import Vuex from "vuex";
import http from "../axios-instance";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {},
  state: {
    isAuthenticated: true,
    loading: false,
    token: "",
    qrks: [
      {
        id: "aa3aa4-rrt3",
        titel: "Titel",
        x_achse_titel: "Datum",
        y_achse_titel: "Messwert [mL]",
        obere_warngrenze: 0.0,
        untere_warngrenze: 0.0,
        obere_eingriffsgrenze: 0.0,
        untere_eingriffsgrenze: 0.0,
        stdabw: 0.0,
        mittelwert: 0.0,
        messwerte: [
          {
            id: "t9t9ne-adef",
            datum: "16.04.2019",
            wert: 10.04,
            valid: true
          },
          {
            id: "t9n2cb-lolo",
            datum: "16.05.2019",
            wert: 10.02,
            valid: true
          }
        ],
        bild_pfad: "https://cdn.vuetifyjs.com/images/cards/desert.jpg"
      },
      {
        id: "ttet-tasdf",
        titel: "Titel 2",
        x_achse_titel: "Datum",
        y_achse_titel: "Messwert [mL]",
        obere_warngrenze: 0.0,
        untere_warngrenze: 0.0,
        obere_eingriffsgrenze: 0.0,
        untere_eingriffsgrenze: 0.0,
        stdabw: 0.0,
        mittelwert: 0.0,
        messwerte: [
          {
            id: "t9t9ne-adef",
            datum: "16.04.2019",
            wert: 10.04,
            valid: true
          },
          {
            id: "t9n2cb-lolo",
            datum: "16.05.2019",
            wert: 10.02,
            valid: true
          }
        ],
        bild_pfad: "https://cdn.vuetifyjs.com/images/cards/desert.jpg"
      }
    ]
  },
  mutations: {
    loading: state => {
      state.loading = !state.loading;
    },
    login_success: state => {
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: state => {
      state.isAuthenticated = false;
    }
  },
  actions: {},
  getters: {
    token({ token }) {
      return token;
    },
    qrks(state) {
      return state.qrks;
    }
  }
});
export default store;
