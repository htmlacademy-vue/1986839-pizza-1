import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import flushPromises from "flush-promises";
import Index from "@/views/Index";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Index", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(Index, options);
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
      }
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("call actions when created index component", async () => {
    createComponent({ localVue, store });
    await flushPromises();
    expect(actions.Builder.getDough).toHaveBeenCalled();
    expect(actions.Builder.getSauces).toHaveBeenCalled();
    expect(actions.Builder.getSizes).toHaveBeenCalled();
    expect(actions.Builder.getIngredients).toHaveBeenCalled();
    expect(actions.Cart.getMisc).toHaveBeenCalled();
  });
});
