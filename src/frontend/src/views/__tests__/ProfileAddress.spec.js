import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import flushPromises from "flush-promises";
import Vuex from "vuex";
import ProfileAddress from "@/views/ProfileAddress";

const localVue = createLocalVue();
localVue.use(Vuex);

const address = {
  "name": "Тестовый",
  "street": "Тестовая",
  "building": "1",
  "flat": "1",
  "comment": "Тест",
  "userId": "ce4ac95b-69a1-4934-a7d4-8461cfbcf052"
};

const savedAddress = { ...address, id: 1 };

const user = {
  "id": "ce4ac95b-69a1-4934-a7d4-8461cfbcf052",
  "name": "Вася Пупкин",
  "email": "user@example.com",
  "avatar": "/public/img/users/user.jpg",
  "phone": "+777 777 777"
};

describe("ProfileAddress", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(ProfileAddress, options);
  };

  beforeEach(() => {
    actions = {
      Addresses: {
        addAddress: jest.fn(),
        editAddress: jest.fn(),
        deleteAddress: jest.fn(),
      }
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, propsData: { address: savedAddress, user: user } });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("set new address to inputs", async () => {
    createComponent({ localVue, store, propsData: { address: address, user: user } });
    expect(wrapper.find('[data-test="address-name"]').element.value).toBe("");
    expect(wrapper.find('[data-test="address-street"]').element.value).toBe("");
    expect(wrapper.find('[data-test="address-building"]').element.value).toBe("");
    expect(wrapper.find('[data-test="address-flat"]').element.value).toBe("");
    expect(wrapper.find('[data-test="address-comment"]').element.value).toBe("");
  });

  it("set saved address to inputs", async () => {
    createComponent({ localVue, store, propsData: { address: savedAddress, user: user } });
    await flushPromises();
    expect(wrapper.find('[data-test="address-name"]').element.value).toBe(savedAddress.name);
    expect(wrapper.find('[data-test="address-street"]').element.value).toBe(savedAddress.street);
    expect(wrapper.find('[data-test="address-building"]').element.value).toBe(savedAddress.building);
    expect(wrapper.find('[data-test="address-flat"]').element.value).toBe(savedAddress.flat);
    expect(wrapper.find('[data-test="address-comment"]').element.value).toBe(savedAddress.comment);
  });

  it("displayed address delete button if saved address", () => {
    createComponent({ localVue, store, propsData: { address: savedAddress, user: user } });
    const deleteButton = wrapper.find('[data-test="address-delete-button"]');
    expect(deleteButton.exists()).toBeTruthy();
  });

  it("not displayed address delete button if new address", () => {
    createComponent({ localVue, store, propsData: { address: address, user: user } });
    const deleteButton = wrapper.find('[data-test="address-delete-button"]');
    expect(deleteButton.exists()).toBeFalsy();
  });

  it("delete address on address delete button click", async () => {
    createComponent({ localVue, store, propsData: { address: savedAddress, user: user } });
    const deleteButton = wrapper.find('[data-test="address-delete-button"]');
    await deleteButton.trigger("click");
    expect(actions.Addresses.deleteAddress).toHaveBeenCalledWith(
      expect.any(Object),
      savedAddress.id
    );
  });

  it("add address action on submit form if new address", async () => {
    createComponent({ localVue, store, propsData: { address: address, user: user } });

    const addressName = wrapper.find('[data-test="address-name"]');
    addressName.element.value = address.name;
    await addressName.trigger("input");

    const addressStreet = wrapper.find('[data-test="address-street"]');
    addressStreet.element.value = address.street;
    await addressStreet.trigger("input");

    const addressBuilding = wrapper.find('[data-test="address-building"]');
    addressBuilding.element.value = address.building;
    await addressBuilding.trigger("input");

    const addressFlat = wrapper.find('[data-test="address-flat"]');
    addressFlat.element.value = address.flat;
    await addressFlat.trigger("input");

    const addressComment = wrapper.find('[data-test="address-comment"]');
    addressComment.element.value = address.comment;
    await addressComment.trigger("input");

    const saveButton = wrapper.find('[data-test="save-button"]');
    await saveButton.trigger("submit");
    expect(actions.Addresses.addAddress).toHaveBeenCalledWith(
      expect.any(Object),
      address
    )
  });

  it("edit address action on submit form if saved address", async () => {
    createComponent({ localVue, store,propsData: { address: savedAddress, user: user } });
    const saveButton = wrapper.find('[data-test="save-button"]');
    await saveButton.trigger("submit");
    expect(actions.Addresses.editAddress).toHaveBeenCalledWith(
      expect.any(Object),
      savedAddress
    );
  });
});
