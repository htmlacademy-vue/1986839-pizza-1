import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/common/components/RadioButton";

describe("RadioButton", () => {
  const propsData = {
    value: 0,
    checked: false,
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(RadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets the initial model value", () => {
    createComponent({ propsData });
    const input = wrapper.find('input');
    expect(parseInt(input.element.value)).toBe(propsData.value);
    expect(input.element.checked).toBe(propsData.checked);
  });
});
