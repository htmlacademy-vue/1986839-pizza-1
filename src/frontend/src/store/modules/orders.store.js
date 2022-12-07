import {
  SET_ENTITY,
  DELETE_ENTITY
} from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async fetchOrders({ commit }) {
      const orders = await this.$api.orders.query();

      commit(
        SET_ENTITY,
        { module: "Orders", entity: "orders", value: orders },
        { root: true }
      );
    },

    async createOrder(context, order) {
      await this.$api.orders.post(order);
    },

    async deleteOrder({ commit }, id) {
      const orders = await this.$api.orders.delete(id);

      commit(
        DELETE_ENTITY,
        { module: "Orders", entity: "orders", value: orders },
        { root: true }
      );
    },
  },
  mutations: {},
  getters: {},
};
