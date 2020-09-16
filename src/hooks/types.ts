import { Prefecture } from "../api/types";

export interface PrefectureWithCheck extends Prefecture {
  check: boolean;
}

export interface PrefectureList {
  prefectures: PrefectureWithCheck[];
  loading: boolean;
  setPrefectureCheck: (prefCode: number, check: boolean) => void;
}
