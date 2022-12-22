import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";
import { MAX_COUNT_INGREDIENTS } from '@/common/constants';

describe("ItemCounter", () => {
  const defaultPropsData = {
    item: {
      id: 0,
      count: 0,
    },
    itemCount: 0,
    isCart: false,
  };

  const getPropsData = params => {
    return {
      propsData: {
        ...defaultPropsData,
        ...params,
      },
    };
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(ItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets the initial value", () => {
    createComponent(getPropsData());
    const input = wrapper.find("input");
    expect(parseInt(input.element.value)).toBe(0);
  });

  it("emits counter button minus clicked", async () => {
    createComponent(getPropsData({ itemCount: 1 }));
    const buttonMinus = wrapper.find(".counter__button--minus");
    await buttonMinus.trigger("click");
    expect(wrapper.emitted().changeItemsCount[0][0]["count"]).toBe(0);
  });

  it("emits counter button plus clicked", async () => {
    createComponent(getPropsData());
    const buttonPlus = wrapper.find(".counter__button--plus");
    await buttonPlus.trigger("click");
    expect(wrapper.emitted().changeItemsCount[0][0]["count"]).toBe(1);
  });

  it("counter button minus disabled if min value", () => {
    createComponent(getPropsData({ itemCount: 0 }));
    const buttonMinus = wrapper.find(".counter__button--minus");
    expect(buttonMinus.attributes("disabled")).toBe("disabled");
  });

  it("counter button plus disabled if max value", () => {
    createComponent(getPropsData({ itemCount: MAX_COUNT_INGREDIENTS }));
    const buttonPlus = wrapper.find(".counter__button--plus");
    expect(buttonPlus.attributes("disabled")).toBe("disabled");
  });

  it("counter button plus is orange if isCart true", () => {
    createComponent(getPropsData({ isCart: true }));
    const buttonPlus = wrapper.find(".counter__button--plus");
    expect(buttonPlus.classes()).toContain("counter__button--orange");
  });

  it("counter button plus is default if isCart false", () => {
    createComponent(getPropsData({ isCart: false }));
    const buttonPlus = wrapper.find(".counter__button--plus");
    expect(buttonPlus.classes("counter__button--orange")).toBeFalsy();
  });
});
