import * as React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { HighchartsData } from "./types";

import { usePrefectureListWithStatContext } from "../contexts";
import { PrefectureWithStat } from "../contexts/types";

export const PopulationTransitionGraph: React.FC = () => {
  const classes = useStyles();
  const { prefectures, populationTransitionLoading } = usePrefectureListWithStatContext();
  if (populationTransitionLoading) {
    return (
      <div className={classes.root}>
        <Typography>{Constants.loading.message}</Typography>
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
    },
  },
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },
}));
