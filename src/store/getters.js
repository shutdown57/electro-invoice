export const getters = {
  // Clients
  getClient(state) {
    return state.oneClient;
  },
  getClients(state) {
    return state.allClients;
  },

  // Products
  getProducts(state) {
    return state.allProducts;
  },
  getProduct(state) {
    return state.oneProduct;
  },

  // Invoice
  getInvoice(state) {
    return state.oneInvoice;
  },
  getInvoices(state) {
    return state.allInvoices;
  },
  getInvoiceProduct(state) {
    return state.invoiceProducts;
  },
  getLiquidationInvoices(state) {
    return state.liquidationInvoices;
  },
  getClientInvoices(state) {
    return state.clientInvoices;
  }
};
