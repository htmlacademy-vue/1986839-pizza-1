import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import {
  generateMockStore,
  authenticateUser
} from "@/store/mocks";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppLayoutHeader", () => {
  const mocks = {
    $router: {
      push: jest.fn()
    },
    $notifier: {
      success: jest.fn()
    }
  };

  const stubs = ["router-link"];

  let actions;
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn()
      }
    };
    mocks.$notifier.success = jest.fn();
    mocks.$router.push = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders header login", () => {
    createComponent({ localVue, store, mocks, stubs });
    const headerLogin = wrapper.find('[data-test="header-login"]');
    expect(headerLogin.exists()).toBeTruthy();
  });

  it ('doesn\'t render header login', () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const headerLogin = wrapper.find('[data-test="header-login"]');
    expect(headerLogin.exists()).toBeFalsy();
  });

  it("renders header logout", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const headerLogin = wrapper.find('[data-test="header-logout"]');
    expect(headerLogin.exists()).toBeTruthy();
  });

  it ('doesn\'t render header logout', () => {
    createComponent({ localVue, store, mocks, stubs });
    const headerLogin = wrapper.find('[data-test="header-logout"]');
    expect(headerLogin.exists()).toBeFalsy();
  });

  it("renders profile link", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const headerLogin = wrapper.find('[data-test="profile-link"]');
    expect(headerLogin.exists()).toBeTruthy();
  });

  it ('doesn\'t render profile link', () => {
    createComponent({ localVue, store, mocks, stubs });
    const headerLogin = wrapper.find('[data-test="profile-link"]');
    expect(headerLogin.exists()).toBeFalsy();
  });
});
