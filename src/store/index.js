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
            valid: false
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
            valid: false
          },
          {
            id: "t9n2cb-lolo",
            datum: "16.05.2019",
            wert: 10.02,
            valid: false
          }
        ],
        bild_pfad: "https://cdn.vuetifyjs.com/images/cards/desert.jpg"
      }
    ],
    serverMessage: ""
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
    },
    setAllQrk: (state, payload) => {
      state.qrks = payload.qrks;
    },
    setServerMessage: (state, payload) => {
      state.serverMessage = payload.message;
    }
  },
  actions: {
    CREATE_QRK({ commit, dispatch }, formData) {
      commit("loading");
      http({
        method: "post",
        url: "/qrk",
        data: {
          titel: formData.titel,
          x_achse_titel: formData.x_achse_titel,
          y_achse_titel: formData.y_achse_titel
        }
      })
        .then(res => {
          dispatch("GET_ALL_QRK");
          commit("loading");
        })
        .catch(error => {
          commit("loading");
          console.log(error);
        });
    },
    GET_ALL_QRK({ commit }) {
      commit("loading");
      http
        .get("/qrk")
        .then(res => {
          commit("setAllQrk", res.data);
          commit("loading");
        })
        .catch(error => {
          console.log(error);
          commit("loading");
        });
    },
    EDIT_QRK({ commit, dispatch }, qrk_id, payload) {
      commit("loading");
      http
        .put(`/qrk/${qrk_id}`, payload)
        .then(res => {
          commit("setServerMessage", res.data);
          dispatch("GET_ALL_QRK");
        })
        .catch(error => {
          commit("loading");
          console.log(error);
        });
    },
    SAVE_MESSWERT({ commit, dispatch }, qrk_id, messwert_id, payload) {
      commit("loading");
      if (messwert_id === "") {
        http
          .post(`/qrk/${qrk_id}/messwert`, payload)
          .then(res => {
            commit("setServerMessage", res.data);
            dispatch("GET_ALL_QRK");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        http
          .put(`/qrk/${qrk_id}/messwert/${messwert_id}`, payload)
          .then(res => {
            commit("setServerMessage", res.data);
            dispatch("GET_ALL_QRK");
          })
          .catch(error => {
            console.log(error);
            commit("loading");
          });
      }
    }
  },
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
