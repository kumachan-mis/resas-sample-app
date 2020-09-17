import * as React from "react";
import { makeStyles } from "@material-ui/core";

import { PrefectureList } from "./PrefectureList";
import { PopulationTransitionGraph } from "./PopulationTransitionGraph";
import { PrefectureListWithStatContextProvider } from "../contexts";

export const App: React.FC = () => {
  const classes = useStyles();
  return (
    <PrefectureListWithStatContextProvider>
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
  prefectureList: {
    width: "100vw",
    height: "40vh",
  },
  populationGraph: {
    width: "100vw",
    height: "56vh",
  },
}));
