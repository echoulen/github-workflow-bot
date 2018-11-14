import {ConfigManager} from "@config/ConfigManager";

describe("ConfigManager spec", () => {
  it("should get config proper", () => {
    expect(ConfigManager.getConfig()).toMatchSnapshot();
  });
});
