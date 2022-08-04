import React from "react";
import { useSearchService, buildSchool } from "../useSearchService";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: (fn) => fn(),
  useState: (initial) => [initial, jest.fn()],
}));

describe("buildSchool", () => {
  it("should correctly parse the data from the search result and use that to add a marker to the map", () => {
    const map = "mock google map";
    const mockConstructor = jest.fn();
    const latest = {
      school: {
        name: "Davidson",
      },
    };
    const location = {
      lat: 100,
      lon: 100,
    };

    const Marker = jest.fn(() => {});

    global.google = {
      maps: {
        Marker,
      },
    };

    const result = buildSchool({ location, latest }, map);
    expect(result.name).toBe("Davidson");
    expect(result.location).toBe(location);

    expect(Marker).toHaveBeenCalledWith({
      title: "Davidson",
      position: {
        lat: 100,
        lng: 100,
      },
      map,
    });

    expect(result.marker).toBeInstanceOf(Marker);
  });
});

describe("useSearchService", () => {
  it("returns initial state", () => {
    const initialState = useSearchService();
    expect(initialState.searching).toBe(false);
    expect(initialState.errors).toEqual([]);
    expect(typeof initialState.searchSchool).toBe("function");
  });
});
