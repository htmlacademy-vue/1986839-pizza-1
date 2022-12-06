import {
  SET_ENTITY,
  DELETE_ENTITY,
  UPDATE_ENTITY,
  ADD_ENTITY,
} from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    addresses: [],
  },
  actions: {
    async getAddresses({ commit }) {
      const data = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        { module: "Addresses", entity: "addresses", value: data },
        { root: true }
      );
    },

    async deleteAddress({ commit }, id) {
      const data = await this.$api.addresses.delete(id);
      commit(
        DELETE_ENTITY,
        { module: "Addresses", entity: "addresses", value: data },
        { root: true }
      );
    },

    async editAddress({ commit }, address) {
      await this.$api.addresses.put(address);
      commit(
        UPDATE_ENTITY,
        { module: "Addresses", entity: "addresses", value: address },
        { root: true }
      );
    },

    async addAddress({ commit }, address) {
      const data = await this.$api.addresses.post(address);
      commit(
        ADD_ENTITY,
        { module: "Addresses", entity: "addresses", value: data },
        { root: true }
      );
    },
  }
};
