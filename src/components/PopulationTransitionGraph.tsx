import * as React from "react";
import { Box, makeStyles } from "@material-ui/core";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { usePrefectureListWithStatContext } from "../contexts";
import { PrefectureWithStat } from "../contexts/types";

interface HighchartsData {
  name: string;
  data: [number, number][];
}

export const PopulationTransitionGraph: React.FC = () => {
  const classes = useStyles();
  const { prefectures, populationTransitionLoading } = usePrefectureListWithStatContext();
  if (populationTransitionLoading) {
    return (
      <div className={classes.root}>
        <Box>{Constants.loading.message}</Box>
      </div>
    );
  }

  const series = getHighchartsDataSeries(prefectures);
  return (
    <div className={classes.root}>
      <HighchartsReact highcharts={Highcharts} options={{ ...Constants.graph.options, series }} />
    </div>
  );
};

function getHighchartsDataSeries(prefectures: PrefectureWithStat[]): HighchartsData[] {
  return prefectures
    .filter((pref) => pref.check && !!pref.transition)
    .map((pref) => ({
      name: pref.prefName,
      data: pref.transition?.populations.map((datum) => [datum.year, datum.value]) ?? [],
    }));
}

const Constants = {
  loading: {
    message: "読み込み中...",
  },
  graph: {
    options: {
      title: {
        text: "都道府県別の人口推移",
      },
      subtitle: {
        text: "出典：https://opendata.resas-portal.go.jp/",
      },
      yAxis: {
        title: {
          text: "総人口",
        },
      },
      xAxis: {
        title: {
          text: "年",
        },
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      chart: {
        style: {
          width: "100%",
          height: "100%",
        },
      },
    },
  },
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },
}));
