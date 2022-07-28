import "./App.css";
import SearchForm from "./components/search-form";
import Errors from "./components/errors";
import { useSearchService } from "./utils/useSearchService";

const generateHandleSubmit = (searchSchool, searching) => (e) => {
  e.preventDefault();
  if (searching) return;

  const formData = new FormData(e.target);
  const schoolName = formData.get("school-name");

  searchSchool(schoolName);
};

const App = () => {
  const { searchSchool, errors, searching } = useSearchService();

  return (
    <div className="main">
      <h1>College Search</h1>
      <SearchForm
        searching={searching}
        handleSubmit={generateHandleSubmit(searchSchool, searching)}
      />
      <Errors errors={errors} />
      <div id="map" />
    </div>
  );
};

export default App;
