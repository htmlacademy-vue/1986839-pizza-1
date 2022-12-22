import { createLocalVue, mount } from "@vue/test-utils";
import {
  generateMockStore,
  setPizzaOrderCart
} from "@/store/mocks";
import Vuex from "vuex";
import Cart from "@/views/Cart";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Cart", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    }
  };

  const stubs = ["router-link"];

  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("displays cart empty if cart empty", () => {
    createComponent({ localVue, store, mocks, stubs });
    const cartEmpty = wrapper.find('[data-test="cart-empty"]');
    const cartList = wrapper.find('[data-test="cart-list"]');
    expect(cartEmpty.exists()).toBeTruthy();
    expect(cartList.exists()).toBeFalsy();
  });

  it("displays cart list if cart not empty", () => {
    setPizzaOrderCart(store);
    createComponent({ localVue, store, mocks, stubs });
    const cartEmpty = wrapper.find('[data-test="cart-empty"]');
    const cartList = wrapper.find('[data-test="cart-list"]');
    expect(cartEmpty.exists()).toBeFalsy();
    expect(cartList.exists()).toBeTruthy();
  });

  it("send order form and displays cart popup", async () => {
    setPizzaOrderCart(store);
    createComponent({ localVue, store, mocks, stubs });
    const cartOrder = wrapper.find('[data-test="cart-order"]');
    cartOrder.vm.$emit("setAddress", { phone: "+777 777 777", address: null });
    await wrapper.find("form").trigger("submit");
    expect(wrapper.find('[data-test="cart-popup"]').exists()).toBeTruthy();
  });

  it("edit pizza item on click to edit button", async () => {
    setPizzaOrderCart(store);
    createComponent({ localVue, store, mocks, stubs });
    const editButton = wrapper.find('[data-test="item-edit-button"]');
    const editPizza = jest.spyOn(wrapper.vm, "editPizza");
    await editButton.trigger("click");
    expect(editPizza).toHaveBeenCalled();
  });
});
