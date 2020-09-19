import * as React from "react";
import { Grid, Box, Typography, Checkbox, Button, makeStyles } from "@material-ui/core";

import { usePrefectureListWithStatContext } from "../contexts";

export const PrefectureList: React.FC = () => {
  const classes = useStyles();
  const {
    prefectures,
    prefecturesLoading,
    togglePrefectureCheck,
    resetAllPrefecturesCheck,
  } = usePrefectureListWithStatContext();

  return (
    <div className={classes.root}>
      <Grid className={classes.title} item xs={12}>
        <Box fontWeight="fontWeightBold">{Constants.list.title}</Box>
      </Grid>
      <Grid className={classes.list} item xs={12}>
        {prefecturesLoading ? (
          <Box>{Constants.loading.message}</Box>
        ) : (
          <Grid container>
            {prefectures.map((pref) => (
              <Grid key={pref.prefCode} className={classes.item} item xs={3} container>
                <Grid item xs={2}>
                  <Checkbox
                    edge="end"
                    onChange={() => togglePrefectureCheck(pref.prefCode)}
                    checked={pref.check}
                  />
                </Grid>
                <Grid item xs={10} container alignItems="center">
                  <Typography>{pref.prefName}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Grid className={classes.clearButton} item xs={12} container justify="flex-end">
        <Button variant="outlined" onClick={resetAllPrefecturesCheck}>
          {Constants.clearButton.name}
        </Button>
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
  clearButton: {
    name: "全てのチェックを外す",
  },
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },
  title: {
    width: "100%",
    height: "24px",
  },
  list: {
    height: "calc(100% - 60px)",
    overflowY: "scroll",
  },
  item: {
    padding: "2px",
  },
  clearButton: {
    width: "100%",
    height: "36px",
    paddingRight: "20px",
  },
}));
