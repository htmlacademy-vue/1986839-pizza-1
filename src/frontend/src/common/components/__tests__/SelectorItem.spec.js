import { shallowMount } from "@vue/test-utils";
import SelectorItem from "@/common/components/SelectorItem";

describe("SelectorItem", () => {
  const propsData = {
    ingredient: {
      name: "testName",
    },
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(SelectorItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("selector name is prop name", () => {
    createComponent({ propsData });
    expect(wrapper.props().ingredient.name).toBe("testName");
  });
});
