import { createLocalVue, mount } from "@vue/test-utils";
import {
  generateMockStore,
  authenticateUser,
  setAddresses
} from "@/store/mocks";
import Vuex from "vuex";
import Profile from "@/views/Profile";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Profile", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    }
  };
  const stubs = ["router-link"];

  let actions;
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(Profile, options);
  };

  beforeEach(() => {
    actions = {
      Addresses: {
        getAddresses: jest.fn(),
      }
    };

    store = generateMockStore(actions);
    authenticateUser(store);
    setAddresses(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("call action getAddresses when created orders component", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(actions.Addresses.getAddresses).toHaveBeenCalled();
  });

  it("displays address form for addresses", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find('[data-test="address-form"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="address-edit-form"]').exists()).toBeFalsy();
  });

  it("displays address edit form by click address edit button", async () => {
    createComponent({ localVue, store, mocks, stubs });
    const editButton = wrapper.find('[data-test="address-edit-button"]');
    await editButton.trigger("click");
    expect(wrapper.find('[data-test="address-edit-form"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="address-form"]').exists()).toBeFalsy();
  });

  it("displays address add form by click address add button", async () => {
    createComponent({ localVue, store, mocks, stubs });
    const addButton = wrapper.find('[data-test="address-add-button"]');
    await addButton.trigger("click");
    const newAddressForm = wrapper.find('[data-test="address-add-form"]');
    expect(newAddressForm.exists()).toBeTruthy();
  });
});
