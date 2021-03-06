import Database from "../mixin/Database";
import Print from "../mixin/Print";

export const mutations = {
  // Clients
  async INSERT_CLIENT(state, client) {
    await Database.insertClient(client);
  },
  async GET_CLIENTS(state) {
    state.allClients = await Database.getClients();
  },
  async UPDATE_CLIENT(state, client) {
    await Database.updateClient(client);
  },
  ADD_CURRENT_CLIENT(state, client) {
    state.oneClient = {
      name: client.name,
      id: client.id,
      address: client.address,
      created: client.created,
      updated: client.updated,
      phone: client.phone,
      mobile: client.mobile
    };
  },
  async DELETE_CLIENT(state, client_id) {
    await Database.deleteClient(client_id);
  },

  // Products
  async INSERT_PRODUCT(state, product) {
    await Database.insertProduct(product);
  },
  async GET_PRODUCTS(state) {
    state.allProducts = await Database.getProducts();
  },
  ADD_CURRENT_PRODUCT(state, product) {
    state.oneProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      created: product.created,
      updated: product.updated
    };
  },
  async UPDATE_PRODUCT(state, product) {
    await Database.updateProduct(product);
  },
  async DELETE_PRODUCT(state, product_id) {
    await Database.deleteProduct(product_id);
  },
  async GET_PRODUCT_BY_NAME(state, productName) {
    await Database.getProductByName(productName);
  },

  // Invoice
  INSERT_INVOICE(state, invoice) {
    Database.insertInvoice(invoice);
  },
  INSERT_INVOICE_PRODUCT(state, { productList, latestInvoiceId, user_id }) {
    Database.insertInvoiceProduct({
      productList,
      latestInvoiceId,
      user_id
    });
  },
  async GET_INVOICE(state) {
    state.oneInvoice = await Database.lastInvoiceId();
  },
  async GET_INVOICES(state) {
    state.allInvoices = await Database.getInvoices();
  },
  ADD_CURRENT_INVOICE(state, invoice) {
    state.oneInvoice = {
      id: invoice.id,
      description: invoice.description,
      invoice_amount: invoice.invoice_amount,
      damage_amount: invoice.damage_amount,
      transport_amount: invoice.transport_amount,
      total_amount: invoice.total_amount,
      rent_period: invoice.rent_period,
      rent_start: invoice.rent_start,
      rent_end: invoice.rent_end,
      payable_amount: invoice.payable_amount,
      discount: invoice.discount,
      deposit_amount: invoice.deposit_amount,
      ceremony_address: invoice.ceremony_address,
      liquidation: invoice.liquidation,
      created: invoice.created,
      updated: invoice.updated,
      user_id: invoice.user_id,
      name: invoice.name
    };
  },
  async GET_INVOICE_PRODUCTS(state, invoice_id) {
    state.invoiceProducts = await Database.getInvoiceProducts(invoice_id);
  },
  async GET_INVOICE_ID(state, invoice_id) {
    state.oneInvoice = await Database.getInvoiceId(invoice_id);
  },
  UPDATE_INVOICE(state, { invoice, productList }) {
    Database.updateInvoice({ invoice, productList });
  },
  async DELETE_INVOICE(state, invoice_id) {
    await Database.deleteInvoice(invoice_id);
  },
  async LIQUIDATION_INVOICES(state) {
    state.liquidationInvoices = await Database.liquidationInvoices();
  },
  async GET_CLIENT_INVOICES(state, user_id) {
    state.clientInvoices = await Database.clientInvoices(user_id);
  },

  // PDF
  async PRINT_ALL_CUSTOMERS(state, data) {
    Print.allCustomers(data);
  },
  async PRINT_ONE_CUSTOMER() {
    Print.oneCustomer();
  },
  async PRINT_ALL_PRODUCTS(state, data) {
    Print.allProducts(data);
  },
  async PRINT_ONE_PRODUCT() {
    Print.oneProduct();
  },
  async PRINT_ONE_INVOICE() {
    Print.oneInvoice();
  },
  async PRINT_ALL_INVOICES(state, data) {
    Print.allInvoices(data);
  }
};
