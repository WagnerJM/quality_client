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
    qrks: []
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
    setQrk: (state, payload) => {
      state.qrks = payload;
    }
  },
  actions: {
    GET_DATA({ commit }) {
      //commit("loading");
      http
        .get("/qrk")
        .then(res => {
          commit("setQrk", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    SAVE_NEW_QRK({ commit, dispatch }, payload) {
      commit("loading");
      http
        .post("/qrk", {
          titel: payload.titel,
          x_achse_titel: payload.x_achse_titel,
          y_achse_titel: payload.y_achse_titel
        })
        .then(res => {
          commit("setServerMessage", res.data);
          dispatch("GET_DATA");

          commit("loading");
        })
        .catch(error => {
          console.log(error);
        });
    },
    UPDATE_QRK({ commit, dispatch }, qrk_id, payload) {
      commit("loading");
      http
        .put(`/qrk/${qrk_id}`, {
          titel: payload.titel,
          x_achse_titel: payload.x_achse_titel,
          y_achse_titel: payload.y_achse_titel
        })
        .then(res => {
          commit("setServerMessage");
          dispatch("GET_DATA");
          commit("loading");
        })
        .catch(error => {
          console.log(error);
        });
    },
    SAVE_NEW_MESSWERT({ commit, dispatch }, qrk_id, payload) {
      commit("loading");
      http
        .post(`/qrk/${qrk_id}/messwert`, {
          date: payload.datum,
          wert: payload.wert,
          valid: payload.valid
        })
        .then(res => {
          commit("setServerMessage", res.data);
          dispatch("GET_DATA");
          commit("loading");
        })
        .catch(error => {
          console.log(error);
        });
    },
    UPDATE_QRK_MESSWERT({ commit, dispatch }, qrk_id, messwert_id, payload) {
      commit("loading");
      http
        .put(`/qrk/${qrk_id}/messwert/${messwert_id}`, {
          date: payload.datum,
          wert: payload.wert,
          valid: payload.valid
        })
        .then(res => {
          commit("setServerMessage", res.data);
          dispatch("GET_DATA");
          commit("loading");
        })
        .catch(error => {
          console.log(error);
        });
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
