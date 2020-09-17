import { Prefecture, PopulationTransition } from "../api/types";

export interface PrefectureWithStat extends Prefecture {
  transition?: PopulationTransition;
  check: boolean;
}

export interface PrefectureListWithStat {
  prefectures: PrefectureWithStat[];
  prefecturesLoading: boolean;
  populationTransitionLoading: boolean;
  setPrefectureCheck: (prefCode: number, check: boolean) => void;
}
