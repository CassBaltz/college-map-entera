const SearchForm = ({ handleSubmit, searching }) => (
  <form
    className="schoolSearchForm"
    name="school-search"
    onSubmit={handleSubmit}
  >
    <input
      placeholder="Enter college name here"
      name="school-name"
      type="text"
    ></input>
    <button disabled={searching} type="submit">
      Search
    </button>
  </form>
);

export default SearchForm;
