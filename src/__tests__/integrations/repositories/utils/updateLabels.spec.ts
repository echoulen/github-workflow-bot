import {Label} from "@constants/Label";
import {updateLabels} from "@repositories/utils/updateLabels";

describe("updateLabels spec", () => {
  it("should updateLabels proper", () => {
    const result = updateLabels([Label.AWAIT_REVIEWER, Label.REVISION_NEEDED], [Label.UPDATED], [Label.REVISION_NEEDED]);
    expect(result).toMatchSnapshot();
  });
});
