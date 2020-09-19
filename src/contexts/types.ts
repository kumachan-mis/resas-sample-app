import { Prefecture, PopulationTransition } from "../api/types";

export interface PrefectureWithStat extends Prefecture {
  transition?: PopulationTransition;
  check: boolean;
}

export interface PrefectureListWithStat {
  prefectures: PrefectureWithStat[];
  prefecturesLoading: boolean;
  populationTransitionLoading: boolean;
  togglePrefectureCheck: (prefCode: number) => Promise<void>;
  resetAllPrefecturesCheck: () => void;
}
