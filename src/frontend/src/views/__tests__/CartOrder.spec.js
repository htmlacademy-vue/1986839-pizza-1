import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import {
  generateMockStore,
  authenticateUser,
  setAddresses
} from "@/store/mocks";
import CartOrder from "@/views/CartOrder";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartOrder", () => {
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(CartOrder, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("user addresses not exists if user not authenticated", async () => {
    createComponent({ localVue, store });
    const userAddresses = wrapper.find('[data-test="user-addresses"]');
    expect(userAddresses.exists()).toBeFalsy();
  });

  it("user addresses exists if user is authenticated and addresses set", async () => {
    authenticateUser(store);
    setAddresses(store);
    createComponent({ localVue, store });
    const userAddresses = wrapper.find('[data-test="user-addresses"]');
    expect(userAddresses.exists()).toBeTruthy();
    expect(userAddresses.html()).toContain("Тестовый");
  });

  it("cart form address not displayed if delivery option default", async () => {
    authenticateUser(store);
    setAddresses(store);
    createComponent({ localVue, store });
    const cartFormAddress = wrapper.find('[data-test="cart-form-address"]');
    expect(cartFormAddress.exists()).toBeFalsy();
  });

  it("cart form address displayed if delivery option new address", async () => {
    authenticateUser(store);
    setAddresses(store);
    createComponent({ localVue, store });
    const cartFormSelect = wrapper.find('[data-test="cart-form-select"]');
    cartFormSelect.element.value = "newAddress";
    await cartFormSelect.trigger("change");
    const cartFormAddress = wrapper.find('[data-test="cart-form-address"]');
    expect(cartFormAddress.exists()).toBeTruthy();
  });
});
