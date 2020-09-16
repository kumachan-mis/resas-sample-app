import { Prefecture } from "./types";
import { ApiConstants } from "./constants";

export const ResasApi = {
  async fetchPrefectureList(): Promise<Prefecture[]> {
    if (process.env.RESAS_API_KEY === undefined) return [];

    console.log("fetchPrefectureList()");
    const url = `${ApiConstants.url}/api/v1/prefectures`;
    const response = await fetch(url, {
      headers: { "X-API-KEY": process.env.RESAS_API_KEY },
      method: "GET",
    });
    const json = await response.json();
    return json.result;
  },
};
