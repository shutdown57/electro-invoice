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
  },

  // Invoice
  insertInvoice({ commit }, invoice) {
    commit("INSERT_INVOICE", invoice);
  },
  insertInvoiceProduct({ commit }, { productList, latestInvoiceId, user_id }) {
    commit("INSERT_INVOICE_PRODUCT", { productList, latestInvoiceId, user_id });
  },
  lastInvoiceId({ commit }) {
    commit("GET_INVOICE");
  },
  getInvoices({ commit }) {
    commit('GET_INVOICES')
  },
  addCurrentInvoice({ commit }, invoice) {
    commit('ADD_CURRENT_INVOICE', invoice)
  },
  getInvoiceProducts({ commit }, invoice_id) {
    commit('GET_INVOICE_PRODUCTS', invoice_id)
  },
  getInvoiceId({ commit }, invoice_id) {
    commit('GET_INVOICE_ID', invoice_id)
  },
  updateInvoice({ commit }, {invoice, productList}) {
    commit('UPDATE_INVOICE', {invoice, productList})
  },

  // PDF
  printAllCustomers({ commit }, data) {
    commit('PRINT_ALL_CUSTOMERS', data)
  },
  printOneCustomer({ commit }) {
    commit('PRINT_ONE_CUSTOMER')
  },
  printAllProducts({ commit }, data) {
    commit('PRINT_ALL_PRODUCTS', data)
  },
  printOneProduct({ commit }) {
    commit('PRINT_ONE_PRODUCT')
  }
};
