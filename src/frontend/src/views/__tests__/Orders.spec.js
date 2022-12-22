import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import flushPromises from "flush-promises";
import Orders from "@/views/Orders";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Orders", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const stubs = ["router-link"];

  let actions;
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        getDough: jest.fn(),
        getSauces: jest.fn(),
        getSizes: jest.fn(),
        getIngredients: jest.fn(),
      },
      Cart: {
        getMisc: jest.fn(),
      },
      Orders: {
        fetchOrders: jest.fn(),
      }
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("call actions when created orders component", async () => {
    createComponent({ localVue, store, mocks, stubs });
    await flushPromises();
    expect(actions.Builder.getDough).toHaveBeenCalled();
    expect(actions.Builder.getSauces).toHaveBeenCalled();
    expect(actions.Builder.getSizes).toHaveBeenCalled();
    expect(actions.Builder.getIngredients).toHaveBeenCalled();
    expect(actions.Cart.getMisc).toHaveBeenCalled();
    expect(actions.Orders.fetchOrders).toHaveBeenCalled();
  });
});
