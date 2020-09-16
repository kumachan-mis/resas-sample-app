import * as React from "react";
import { makeStyles } from "@material-ui/core";

import { PrefectureList } from "./PrefectureList";

const useStyles = makeStyles(() => ({
  prefectureList: {
    width: "100vw",
    height: "48vh",
  },
}));

export const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.prefectureList}>
      <PrefectureList />
    </div>
  );
};
