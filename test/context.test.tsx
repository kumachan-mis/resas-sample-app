import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import fetchMock from "fetch-mock";
import * as fs from "fs";

import {
  PrefectureListWithStatContextProvider,
  usePrefectureListWithStatContext,
  defaultPrefectureListWithStat,
} from "../src/contexts";
import { PrefectureListWithStat } from "../src/contexts/types";

import { Constants } from "./constants";

let appRoot: HTMLDivElement | null = null;
let context: PrefectureListWithStat = defaultPrefectureListWithStat;

beforeAll(() => {
  const pefecturesFile = fs.readFileSync(Constants.prefectures.rawPath, "utf-8");
  const popurationTransitionFile = fs.readFileSync(Constants.popurationTransition.rawPath, "utf-8");
  const prefectures = JSON.parse(pefecturesFile);
  const popurationTransition = JSON.parse(popurationTransitionFile);

  fetchMock.get(Constants.prefectures.url, prefectures);
  for (const pefecture of prefectures.result) {
    fetchMock.get(Constants.popurationTransition.url(pefecture.prefCode), popurationTransition);
  }
});

afterAll(() => {
  fetchMock.restore();
});

beforeEach(() => {
  appRoot = document.createElement("div");
  document.body.appendChild(appRoot);
});

afterEach(() => {
  if (!appRoot) return;
  unmountComponentAtNode(appRoot);
  appRoot.remove();
  appRoot = null;
});

test("basic scenario", async () => {
  await renderComponent();
  expect(context.prefectures.length).toEqual(47);

  assertCheckList(context, []);
  await toggleCheck(context, 13);
  assertCheckList(context, [13]);
  await toggleCheck(context, 1);
  assertCheckList(context, [1, 13]);
  await toggleCheck(context, 1);
  assertCheckList(context, [13]);
  await toggleCheck(context, 47);
  assertCheckList(context, [13, 47]);
});

test("clear button scenario", async () => {
  const expectedCheckList = [1, 7, 14, 17, 29, 34, 39, 43, 47];

  await renderComponent();
  expect(context.prefectures.length).toEqual(47);

  assertCheckList(context, []);
  for (const prefCode of expectedCheckList) {
    await toggleCheck(context, prefCode);
  }
  assertCheckList(context, expectedCheckList);
  act(context.resetAllPrefecturesCheck);
  assertCheckList(context, []);
});

test("check all scenario", async () => {
  await renderComponent();
  expect(context.prefectures.length).toEqual(47);

  assertCheckList(context, []);
  for (let prefCode = 1; prefCode <= 47; prefCode++) {
    await toggleCheck(context, prefCode);
  }
  expect(context.prefectures.every((pref) => pref.check)).toEqual(true);
  act(context.resetAllPrefecturesCheck);
  assertCheckList(context, []);
});

const MockComponent = () => {
  context = usePrefectureListWithStatContext();
  return null;
};

async function renderComponent(): Promise<void> {
  await act(async () =>
    render(
      <PrefectureListWithStatContextProvider>
        <MockComponent />
      </PrefectureListWithStatContextProvider>,
      appRoot
    )
  );
}

async function toggleCheck(context: PrefectureListWithStat, prefCode: number): Promise<void> {
  await act(async () => await context.togglePrefectureCheck(prefCode));
}

function assertCheckList(context: PrefectureListWithStat, expectedCheckList: number[]): void {
  const actualCheckList = context.prefectures
    .filter((pref) => pref.check)
    .map((pref) => pref.prefCode);

  const value = (() => {
    if (actualCheckList.length != expectedCheckList.length) return false;
    for (let i = 0; i < expectedCheckList.length; i++) {
      if (actualCheckList[i] != expectedCheckList[i]) return false;
    }
    return true;
  })();

  expect(value).toEqual(true);
}
