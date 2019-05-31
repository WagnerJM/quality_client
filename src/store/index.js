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
    qrks: null
    ,
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
        state.qrks = payload;
    },
    setServerMessage: (state, payload) => {
      state.serverMessage = payload;
    }
  },
  actions: {
      SAVE_NEW_QRK({ commit, dispatch }, formData) {
          commit('loading');
          http.post("/qrk", {titel: formData.titel, x_achse_titel:formData.x_achse_titel, y_achse_titel: formData.y_achse_titel})
          .then( res => {
              dispatch('GET_ALL_QRK');
              commit('loading');
              console.log(res);
          })
          .catch(error => {
              console.log(error)});
      },
      UPDATE_QRK({commit, dispatch}, id, formData) {
          console.log(formData);
          http.put(`/qrk/${id}`, 
              { 
                  titel: formData.titel, 
                  x_achse_titel: formData.x_achse_titel, 
                  y_achse_titel: formData.y_achse_titel 
              })
              .then( rep => {
                  console.log("yeah");
                  dispatch('GET_ALL_QRK');
              })
          .catch( error => {
            console.log(error);
          })
      },

    GET_ALL_QRK({ commit }) {
      commit("loading");
      http
        .get("/qrk")
        .then(res => {
		console.log(res.data);
          commit("setAllQrk", res.data);
          commit("loading");
        })
        .catch(error => {
          console.log(error);
          commit("loading");
        });
    },
    SAVE_NEW_MESSWERT({ commit, dispatch }, qrk_id, messwert_id, payload) {
      commit("loading");
        http
          .post(`/qrk/${qrk_id}/messwert`, payload)
          .then(res => {
            commit("setServerMessage", res.data);
            dispatch("GET_ALL_QRK");
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
