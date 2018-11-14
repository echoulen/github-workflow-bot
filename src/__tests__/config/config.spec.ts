import {config} from "@config/config";

describe("config spec", () => {
  it("should get config proper", () => {
    expect(config).toMatchSnapshot();
  });
});
