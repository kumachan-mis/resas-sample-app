import * as React from "react";

import { ResasApi } from "../api";

export const App: React.FC = () => {
  ResasApi.fetchPrefectureList().then((prefectures) => console.log(prefectures));
  return <></>;
};
