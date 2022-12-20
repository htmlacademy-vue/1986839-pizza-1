import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import CartPopup from "@/views/CartPopup";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartPopup", () => {
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(CartPopup, options);
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

  it("close popup click", async () => {
    createComponent({ localVue, store });
    const closeButton = wrapper.find('[data-test="close-button"]');
    await closeButton.trigger("click");
    expect(wrapper.emitted().closePopup).toBeTruthy();
  });
});
