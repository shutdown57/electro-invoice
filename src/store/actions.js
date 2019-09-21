export const actions = {
  initializeDb({ commit }, client) {
    commit("INSERT_CLIENT", client);
  },

  // Clients
  addCurrentClient({ commit }, client) {
    commit("ADD_CURRENT_CLIENT", client);
  },
  getClients({ commit }) {
    commit("GET_CLIENTS");
  },
  insertClient({ commit }, data) {
    commit("INSERT_CLIENT", data);
  },
  updateClient({ commit }, data) {
    commit("UPDATE_CLIENT", data);
  },

  // Products
  insertProduct({ commit }, product) {
    commit("INSERT_PRODUCT", product);
  },
  getProducts({ commit }) {
    commit("GET_PRODUCTS");
  },
  addCurrentProduct({ commit }, product) {
    commit("ADD_CURRENT_PRODUCT", product);
  },
  updateProduct({ commit }, product) {
    commit("UPDATE_PRODUCT", product);
  }
};
