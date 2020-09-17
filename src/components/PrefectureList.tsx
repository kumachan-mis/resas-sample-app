import * as React from "react";
import { Grid, Typography, Checkbox, makeStyles } from "@material-ui/core";

import { usePrefectureListWithStatContext } from "../contexts";

export const PrefectureList: React.FC = () => {
  const classes = useStyles();
  const {
    prefectures,
    prefecturesLoading,
    setPrefectureCheck,
  } = usePrefectureListWithStatContext();

  if (prefecturesLoading) {
    return (
      <div className={classes.root}>
        <Typography>{Constants.loading.message}</Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.title} item xs={12}>
        <Typography variant="h5">{Constants.list.title}</Typography>
      </Grid>
      <Grid className={classes.list} item xs={12}>
        <Grid container>
          {prefectures.map((pref) => (
            <Grid key={pref.prefCode} className={classes.item} item xs={3} container>
              <Grid item xs={2}>
                <Checkbox
                  edge="end"
                  onChange={() => setPrefectureCheck(pref.prefCode, !pref.check)}
                  checked={pref.check}
                />
              </Grid>
              <Grid item xs={10} container alignItems="center">
                <Typography>{pref.prefName}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

const Constants = {
  loading: {
    message: "読み込み中...",
  },
  list: {
    title: "都道府県",
  },
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },
  title: {
    height: "30px",
  },
  list: {
    height: "calc(100% - 30px)",
    overflowY: "scroll",
  },
  item: {
    padding: "2px",
  },
}));
