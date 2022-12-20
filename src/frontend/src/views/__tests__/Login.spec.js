import { mount, createLocalVue } from "@vue/test-utils";
import $validator from "@/common/mixins/validator";
import Login from "@/views/Login";
import AppInput from "@/common/components/AppInput";

const localVue = createLocalVue();
localVue.component("AppInput", AppInput);

describe("Login", () => {
  let routerPush;
  let dispatch;
  let login;

  const methods = {
    login
  };

  const mocks = {
    $router: {
      push: routerPush
    },
    $store: {
      dispatch
    },
    $validator
  };

  const stubs = [
    "router-link"
  ];

  let wrapper;
  const createComponent = options => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    routerPush = jest.fn();
    dispatch = jest.fn();
    login = jest.fn();
    methods.login = login;
    mocks.$router.push = routerPush;
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ("redirects to index on close button click", async () => {
    createComponent({ localVue, mocks, stubs });
    const closeButton = wrapper.find('[data-test="close"]');
    await closeButton.trigger("click");
    expect(routerPush).toHaveBeenCalledWith({ name: "index" });
  });

  it("validation mixin has been called on form submit", async () => {
    createComponent({ localVue, mocks, stubs });
    const spyValidateFields = jest.spyOn(wrapper.vm, '$validateFields');
    await wrapper.find("form").trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it(
    "calls login and redirects to index if credentials are valid",
    async () => {
      createComponent({ localVue, mocks, stubs });
      const emailInput = wrapper
        .find('[data-test="email-component"]')
        .find('input');
      const passInput = wrapper
        .find('[data-test="password-component"]')
        .find('input');

      emailInput.element.value = "test@gmail.com";
      await emailInput.trigger("input");
      passInput.element.value = "123456";
      await passInput.trigger("input");

      await wrapper.find("form").trigger("submit");
      expect(dispatch).toHaveBeenCalled();
      expect(routerPush).toHaveBeenCalledWith({ name: "index" });
    });
});
