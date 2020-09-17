import * as React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import { PrefectureList } from "./PrefectureList";
import { PopulationTransitionGraph } from "./PopulationTransitionGraph";
import { PrefectureListWithStatContextProvider } from "../contexts";

export const App: React.FC = () => {
  const classes = useStyles();
  return (
    <PrefectureListWithStatContextProvider>
      <div className={classes.title}>
        <Typography variant="h4">{Constants.title}</Typography>
      </div>
      <div className={classes.prefectureList}>
        <PrefectureList />
      </div>
      <div className={classes.populationGraph}>
        <PopulationTransitionGraph />
      </div>
    </PrefectureListWithStatContextProvider>
  );
};

const useStyles = makeStyles(() => ({
  title: {
    width: "100vw",
    height: "6vh",
  },
  prefectureList: {
    width: "100vw",
    height: "40vh",
  },
  populationGraph: {
    width: "100vw",
    height: "50vh",
  },
}));

const Constants = {
  title: "Resas Sample App",
};
