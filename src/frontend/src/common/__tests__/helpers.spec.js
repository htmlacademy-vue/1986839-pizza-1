import {
  isEmpty
} from "@/common/helpers";

describe("test helpers functions", () => {

  it("test isEmpty", () => {
    const empty = isEmpty({});
    expect(empty).toBeTruthy();
  });
});
