import { shallow } from "enzyme";
import Errors from "..";

describe("Errors", () => {
  it("should render correctly - no errors", () => {
    const noErrors = [];
    const errors = shallow(<Errors errors={noErrors} />);
    expect(errors.getElement()).toBeNull();
  });

  it("should render correctly - errors exit", () => {
    const someErrors = [{ message: "Cannot perform that action" }];
    const errors = shallow(<Errors errors={someErrors} />);
    expect(errors.getElement()).toMatchSnapshot();
  });
});
