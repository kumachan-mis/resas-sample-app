import { Prefecture, Population, PopulationTransition } from "./types";
import { ApiConstants } from "./constants";

export const ResasApi = {
  async fetchPrefectureList(): Promise<Prefecture[]> {
    if (!process.env.RESAS_API_KEY) return [];

    const url = `${ApiConstants.url}/api/v1/prefectures`;
    const response = await fetch(url, {
      headers: { "X-API-KEY": process.env.RESAS_API_KEY },
      method: "GET",
    });
    return (await response.json()).result as Prefecture[];
  },
  async fetchPopulationTransition(prefCode: number): Promise<PopulationTransition> {
    if (!process.env.RESAS_API_KEY) return { populations: [], boundaryYear: -1 };

    const url = `${ApiConstants.url}/api/v1/population/composition/perYear`;
    const query = `prefCode=${prefCode}&cityCode=-`;
    const response = await fetch(`${url}?${query}`, {
      headers: { "X-API-KEY": process.env.RESAS_API_KEY },
      method: "GET",
    });
    const result = (await response.json()).result as {
      boundaryYear: number;
      data: { label: string; data: Population[] }[];
    };
    const populations = result.data.find((datum) => datum.label == "総人口")?.data ?? [];
    return { populations, boundaryYear: result.boundaryYear };
  },
};
