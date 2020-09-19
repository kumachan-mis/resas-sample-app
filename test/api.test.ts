import fetchMock from "fetch-mock";
import * as path from "path";
import * as fs from "fs";

import { ResasApi } from "../src/api";

test("success to fetch prefecture list", async () => {
  const rawFile = fs.readFileSync(
    path.resolve(__dirname, "..", "test-fixtures", "raw-prefectures.json"),
    { encoding: "utf-8" }
  );
  const expectedFile = fs.readFileSync(
    path.resolve(__dirname, "..", "test-fixtures", "expected-prefectures.json"),
    { encoding: "utf-8" }
  );
  const rawJson = JSON.parse(rawFile);
  const expectedJson = JSON.parse(expectedFile);

  fetchMock.get("https://opendata.resas-portal.go.jp/api/v1/prefectures", rawJson);
  const prefectures = await ResasApi.fetchPrefectureList();
  expect(JSON.stringify(prefectures)).toEqual(JSON.stringify(expectedJson));
  fetchMock.restore();
});

test("success to fetch population transition", async () => {
  const rawFile = fs.readFileSync(
    path.resolve(__dirname, "..", "test-fixtures", "raw-population-transition.json"),
    { encoding: "utf-8" }
  );
  const expectedFile = fs.readFileSync(
    path.resolve(__dirname, "..", "test-fixtures", "expected-population-transition.json"),
    { encoding: "utf-8" }
  );
  const rawJson = JSON.parse(rawFile);
  const expectedJson = JSON.parse(expectedFile);

  fetchMock.get(
    "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
    rawJson,
    { query: { prefCode: 1, cityCode: "-" } }
  );
  const populationTransition = await ResasApi.fetchPopulationTransition(1);
  expect(JSON.stringify(populationTransition.populations)).toEqual(
    JSON.stringify(expectedJson.populations)
  );
  expect(populationTransition.boundaryYear).toEqual(expectedJson.boundaryYear);
  fetchMock.restore();
});
