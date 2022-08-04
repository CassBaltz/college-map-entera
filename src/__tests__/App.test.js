import { shallow } from "enzyme";
import App, { generateHandleSubmit } from "../App";
import SearchForm from "../components/search-form";
import Errors from "../components/errors";
import { useSearchService } from "../utils/useSearchService";

jest.mock("../utils/useSearchService", () => ({
  useSearchService: jest.fn(),
}));

describe("App", () => {
  it("should render correctly - initial state", () => {
    const searchSchool = jest.fn();
    const errors = [];
    const searching = false;

    useSearchService.mockImplementation(() => ({
      searchSchool,
      errors,
      searching,
    }));

    const app = shallow(
      <App searchSchool={searchSchool} errors={errors} searching={searching} />,
    );

    const errorsComp = app.find(Errors);
    const searchFormComp = app.find(SearchForm);
    const map = app.find("#map");

    expect(app.getElement()).toMatchSnapshot();

    expect(map).toHaveLength(1);

    expect(searchFormComp).toHaveLength(1);
    expect(searchFormComp.prop("searching")).toBe(searching);

    expect(errorsComp).toHaveLength(1);
    expect(errorsComp.prop("errors")).toBe(errors);
  });
});

describe("generateHandleSubmit", () => {
  it("should not do anything if search is in progress", () => {
    const searchSchool = jest.fn();
    const searching = true;
    const preventDefault = jest.fn();

    const event = {
      preventDefault,
    };

    generateHandleSubmit(searchSchool, searching)(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(searchSchool).not.toHaveBeenCalled();
  });

  it("should parse the data from the target element and call the searchSchool function with the input value", () => {
    const searchSchool = jest.fn();
    const searching = false;
    const preventDefault = jest.fn();

    const mockForm = document.createElement("form");
    mockForm.setAttribute("name", "school-search");

    const mockInput = document.createElement("input");
    mockInput.setAttribute("name", "school-name");
    mockInput.setAttribute("value", "Davidson");

    mockForm.appendChild(mockInput);

    const event = {
      preventDefault,
      target: mockForm,
    };

    generateHandleSubmit(searchSchool, searching)(event);
    expect(searchSchool).toHaveBeenCalledWith("Davidson");
  });
});
