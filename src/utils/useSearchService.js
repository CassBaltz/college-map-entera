import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import {
  COLLEGE_SEARCH_BASE_URL,
  COLLEGE_SEARCH_PATH,
  COLLEGE_SEARCH_API_KEY,
  GOOGLE_MAPS_API_KEY,
} from "./constants";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: COLLEGE_SEARCH_BASE_URL,
});

let googleMapInstance = null;

const buildSchool = ({ latest, location }, map) => ({
  name: latest.school.name,
  location,
  marker: new global.google.maps.Marker({
    title: latest.school.name,
    position: {
      lat: location.lat,
      lng: location.lon,
    },
    map,
  }),
});

const useSearchService = () => {
  const [errors, setErrors] = useState([]);
  const [schools, setSchools] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
    })
      .load()
      .then(() => {
        const map = new global.google.maps.Map(document.getElementById("map"), {
          // Best guess for middle of the United States
          center: { lat: 37, lng: -98 },
          zoom: 4.5,
        });

        googleMapInstance = map;
      });
  }, []);

  const startSearch = () => {
    setSearching(true);
    setErrors([]);
    schools.forEach((school) => {
      school.marker.setMap(null);
    });
    setSchools([]);
  };

  const searchSchool = (schoolName) => {
    startSearch();
    axiosInstance
      .get(COLLEGE_SEARCH_PATH, {
        params: {
          api_key: COLLEGE_SEARCH_API_KEY,
          school_search: schoolName,
        },
      })
      .then(({ data }) => {
        setSearching(false);
        const { results } = data;

        if (results.length === 0) {
          setErrors([
            { message: `Could not find any matches for ${schoolName}` },
          ]);
        }

        const updatedSchools = results.map((school) =>
          buildSchool(school, googleMapInstance),
        );

        setSchools(updatedSchools);
      })
      .catch((error) => {
        setSearching(false);
        setErrors([
          {
            message: "Unknown error occurred searching, please try again later",
          },
        ]);
      });
  };

  return {
    errors,
    searching,
    searchSchool,
  };
};

export { useSearchService, buildSchool };
