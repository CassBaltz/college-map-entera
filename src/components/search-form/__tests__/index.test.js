import { shallow } from "enzyme";
import SearchForm from "..";

describe("SearchForm", () => {
  it("should render correctly - not searching", () => {
    const handleSubmit = jest.fn();
    const searching = false;
    const searchForm = shallow(
      <SearchForm searching={searching} handleSubmit={handleSubmit} />,
    );
    const button = searchForm.find("button");
    expect(button.prop("disabled")).toBe(false);
    expect(searchForm.getElement()).toMatchSnapshot();
  });

  it("should render correctly - searching", () => {
    const handleSubmit = jest.fn();
    const searching = true;
    const searchForm = shallow(
      <SearchForm searching={searching} handleSubmit={handleSubmit} />,
    );
    const button = searchForm.find("button");
    expect(button.prop("disabled")).toBe(true);
    expect(searchForm.getElement()).toMatchSnapshot();
  });

  it("should call its handleSubmit callback when the form is submitted", () => {
    const handleSubmit = jest.fn();
    const searching = true;
    const searchForm = shallow(
      <SearchForm searching={searching} handleSubmit={handleSubmit} />,
    );
    const form = searchForm.find("form");
    form.simulate("submit");
    expect(handleSubmit).toHaveBeenCalled();
  });
});
