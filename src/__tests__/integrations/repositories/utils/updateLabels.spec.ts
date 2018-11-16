import {Label} from "@constants/Label";
import {updateLabels} from "@repositories/utils/updateLabels";
import {List} from "immutable";

describe("updateLabels spec", () => {
  it("should updateLabels proper", () => {
    const result = updateLabels(List([Label.AWAIT_REVIEWER, Label.REVISION_NEEDED]), [Label.UPDATED], [Label.REVISION_NEEDED]);
    expect(result).toMatchSnapshot();
  });
});
