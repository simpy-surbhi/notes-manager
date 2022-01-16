import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import ApiService from "@/services/ApiService";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    loggedInUserEmail: "",
    status: "",
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, payload) {
      state.status = "success";
      state.token = payload.token;
      state.loggedInUserEmail = payload.email;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.loggedInUserEmail = "";
    },
  },

  getters: {
    isLoggedIn: (state) => state.token !== "" && state.token !== null,
    authStatus: (state) => state.status,
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        ApiService.login(user.email, user.password)
          .then((token) => {
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", {
              token: token,
              email: user.email,
            });
            resolve(token);
          })
          .catch((error) => {
            commit("auth_error");
            reject(error);
          });
      });
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit("logout");
          delete axios.defaults.headers.common["Authorization"];
          resolve("");
        } catch (err) {
          reject(err);
        }
      });
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
