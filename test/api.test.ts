import fetchMock from "fetch-mock";
import * as fs from "fs";

import { Constants } from "./constants";

import { ResasApi } from "../src/api";

test("success to fetch prefecture list", async () => {
  const constants = Constants.prefectures;
  const rawFile = fs.readFileSync(constants.rawPath, { encoding: "utf-8" });
  const expectedFile = fs.readFileSync(constants.expectedPath, { encoding: "utf-8" });
  const rawJson = JSON.parse(rawFile);
  const expectedJson = JSON.parse(expectedFile);

  fetchMock.get(constants.url, rawJson);
  const prefectures = await ResasApi.fetchPrefectureList();
  expect(JSON.stringify(prefectures)).toEqual(JSON.stringify(expectedJson));
  fetchMock.restore();
});

test("success to fetch population transition", async () => {
  const constants = Constants.popurationTransition;
  const rawFile = fs.readFileSync(constants.rawPath, "utf-8");
  const expectedFile = fs.readFileSync(constants.expectedPath, "utf-8");
  const rawJson = JSON.parse(rawFile);
  const expectedJson = JSON.parse(expectedFile);

  fetchMock.get(constants.url(1), rawJson);
  const populationTransition = await ResasApi.fetchPopulationTransition(1);
  expect(JSON.stringify(populationTransition.populations)).toEqual(
    JSON.stringify(expectedJson.populations)
  );
  expect(populationTransition.boundaryYear).toEqual(expectedJson.boundaryYear);
  fetchMock.restore();
});
