import * as path from "path";

export const Constants = {
  prefectures: {
    url: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    rawPath: path.resolve(__dirname, "..", "test-fixtures", "raw-prefectures.json"),
    expectedPath: path.resolve(__dirname, "..", "test-fixtures", "expected-prefectures.json"),
  },
  popurationTransition: {
    url: "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
    rawPath: path.resolve(__dirname, "..", "test-fixtures", "raw-population-transition.json"),
    expectedPath: path.resolve(
      __dirname,
      "..",
      "test-fixtures",
      "expected-population-transition.json"
    ),
  },
};
