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
      description: product.description,
      created: product.created,
      updated: product.updated
    };
  },
  async UPDATE_PRODUCT(state, product) {
    await Database.updateProduct(product);
  },

  // Invoice
  async INSERT_INVOICE(state, invoice) {
    await Database.insertInvoice(invoice);
  },
  async INSERT_INVOICE_PRODUCT(
    state,
    { productList, latestInvoiceId, user_id }
  ) {
    await Database.insertInvoiceProduct({
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
      ceremony_address: invoice.ceremony_address,
      liquidation: invoice.liquidation,
      created: invoice.created,
      updated: invoice.updated,
      user_id: invoice.user_id
    };
  },
  async GET_INVOICE_PRODUCTS(state, invoice_id) {
    state.invoiceProducts = await Database.getInvoiceProducts(invoice_id);
  },
  async GET_INVOICE_ID(state, invoice_id) {
    state.oneInvoice = await Database.getInvoiceId(invoice_id);
  },
  async UPDATE_INVOICE(state, {invoice, productList}) {
    await Database.updateInvoice({invoice, productList});
  },

  // PDF
  async GENERATE_PDF(state, data) {
    Print.printCustomers(data);
  }
};
