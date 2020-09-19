import * as React from "react";

import { PrefectureWithStat, PrefectureListWithStat } from "./types";

import { ResasApi } from "../api";

export const defaultPrefectureListWithStat: PrefectureListWithStat = {
  prefectures: [],
  prefecturesLoading: false,
  populationTransitionLoading: false,
  togglePrefectureCheck: async () => {
    // do nothing
  },
  resetAllPrefecturesCheck: () => {
    // do nothing
  },
};

const PrefectureListWithStatContext = React.createContext(defaultPrefectureListWithStat);

export function usePrefectureListWithStatContext(): PrefectureListWithStat {
  return React.useContext(PrefectureListWithStatContext);
}

export const PrefectureListWithStatContextProvider: React.FC = (props) => {
  const [prefectures, setPrefectures] = React.useState<PrefectureWithStat[]>([]);
  const [prefecturesLoading, setPrefecturesLoading] = React.useState(true);
  const [populationTransitionLoading, setPopulationTransitionLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const fetchedPrefectures = await ResasApi.fetchPrefectureList();
      setPrefectures(fetchedPrefectures.map((pref) => ({ ...pref, check: false })));
      setPrefecturesLoading(false);
    })();
  }, []);

  const togglePrefectureCheck = async (prefCode: number) => {
    const newPrefectures = prefectures.slice();
    const targetPref = newPrefectures.find((pref) => pref.prefCode == prefCode);
    if (!targetPref) return;

    targetPref.check = !targetPref.check;
    if (targetPref.check && !targetPref.transition) {
      setPopulationTransitionLoading(true);
      targetPref.transition = await ResasApi.fetchPopulationTransition(targetPref.prefCode);
      setPrefectures(newPrefectures);
      setPopulationTransitionLoading(false);
    } else {
      setPrefectures(newPrefectures);
    }
  };

  const resetAllPrefecturesCheck = () => {
    const newPrefectures = prefectures.map((pref) => ({ ...pref, check: false }));
    setPrefectures(newPrefectures);
  };

  return (
    <PrefectureListWithStatContext.Provider
      value={{
        prefectures,
        prefecturesLoading,
        populationTransitionLoading,
        togglePrefectureCheck,
        resetAllPrefecturesCheck,
      }}
    >
      {props.children}
    </PrefectureListWithStatContext.Provider>
  );
};
