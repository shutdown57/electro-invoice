import Database from "../mixin/Database";

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
  }
};
