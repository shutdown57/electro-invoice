import Database from "../mixin/Database";

export const mutations = {
  async INSERT_CLIENT(state, client) {
    await Database.insertClient(client);
  },
  async GET_CLIENTS(state) {
    state.allClients = await Database.getClients();
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
  }
};
