import { createLocalVue, mount } from "@vue/test-utils";
import OrdersItem from "@/views/OrdersItem";
import {
  generateMockStore,
  setDough,
  setSauces,
  setSizes,
  setIngredients,
  setMisc
} from "@/store/mocks";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("OrdersItem", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const propsData = {
    order: {
      "id": 1,
      "phone": "+777 777 777",
      "userId": "ce4ac95b-69a1-4934-a7d4-8461cfbcf052",
      "addressId": 1,
      "orderPizzas": [
        {
          "id": 1,
          "name": "Новая",
          "quantity": 1,
          "sauceId": 1,
          "doughId": 1,
          "sizeId": 1,
          "orderId": 1,
          "ingredients": [
            {
              "id": 1,
              "quantity": 1,
              "pizzaId": 1,
              "ingredientId": 1
            }
          ]
        }
      ],
      "orderMisc": [
        {
          "id": 1,
          "quantity": 0,
          "orderId": 1,
          "miscId": 1
        },
        {
          "id": 2,
          "quantity": 0,
          "orderId": 1,
          "miscId": 2
        },
        {
          "id": 3,
          "quantity": 0,
          "orderId": 1,
          "miscId": 3
        }
      ],
      "orderAddress": {
        "id": 1,
        "name": "Тестовый",
        "street": "Тестовая",
        "building": "1",
        "flat": "1",
        "comment": "Тест",
        "userId": "ce4ac95b-69a1-4934-a7d4-8461cfbcf052"
      }
    }
  };

  let actions;
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(OrdersItem, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        deleteOrder: jest.fn()
      },
      Cart: {
        savePizzaOrderCart: jest.fn(),
        changeMiscItemCount: jest.fn()
      }
    };

    store = generateMockStore(actions);
    setDough(store);
    setSizes(store);
    setSauces(store);
    setIngredients(store);
    setMisc(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, mocks, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("calls order delete action", async () => {
    createComponent({ localVue, store, mocks, propsData });
    const deleteButton = wrapper.find('[data-test="delete-button"]');
    await deleteButton.trigger("submit");
    expect(actions.Orders.deleteOrder).toHaveBeenCalledWith(
      expect.any(Object),
      propsData.order.id
    );
  });

  it("save pizza order cart on repeat button click", async () => {
    createComponent({ localVue, store, mocks, propsData });
    const repeatButton = wrapper.find('[data-test="repeat-order-button"]');
    await repeatButton.trigger("click");
    expect(actions.Cart.savePizzaOrderCart).toHaveBeenCalled();
    expect(actions.Cart.changeMiscItemCount).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: "cart" });
  });
});
