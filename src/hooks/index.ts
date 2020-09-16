import * as React from "react";

import { PrefectureWithCheck, PrefectureList } from "./types";

import { ResasApi } from "../api";

export function usePrefectureList(): PrefectureList {
  const [prefecturesWithCheck, setPrefecturesWithCheck] = React.useState<PrefectureWithCheck[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const prefectures = await ResasApi.fetchPrefectureList();
      setPrefecturesWithCheck(prefectures.map((pref) => ({ ...pref, check: false })));
      setLoading(false);
    })();
  }, []);

  const setPrefectureCheck = (prefCode: number, check: boolean) => {
    const newPrefecturesWithCheck = prefecturesWithCheck.slice();
    const targetPref = newPrefecturesWithCheck.find((pref) => pref.prefCode == prefCode);
    if (targetPref) targetPref.check = check;
    setPrefecturesWithCheck(newPrefecturesWithCheck);
  };

  return { prefectures: prefecturesWithCheck, loading, setPrefectureCheck };
}
