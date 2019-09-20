export const actions = {
  initializeDb({ commit }, client) {
    commit("INSERT_CLIENT", client);
  },
  addCurrentClient({ commit }, client) {
    commit("ADD_CURRENT_CLIENT", client);
  },
  getClients({ commit }) {
    commit("GET_CLIENTS");
  },
  insertClient({ commit }, data) {
    commit("INSERT_CLIENT", data);
  }
};
