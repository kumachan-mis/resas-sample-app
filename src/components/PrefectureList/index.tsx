import * as React from "react";
import { Grid, Typography, Checkbox, makeStyles } from "@material-ui/core";

import { PrefectureListConstants } from "./constants";
import { usePrefectureList } from "../../hooks";

const useStyles = makeStyles(() => ({
  list: {
    width: "100%",
    height: "100%",
    overflowY: "scroll",
  },
  item: {
    padding: "2px",
  },
}));

export const PrefectureList: React.FC = () => {
  const classes = useStyles();
  const { prefectures, loading, setPrefectureCheck } = usePrefectureList();

  if (loading) return <Typography>{PrefectureListConstants.loading.message}</Typography>;

  return (
    <>
      <Typography variant="h5">{PrefectureListConstants.list.title}</Typography>
      <Grid className={classes.list} container>
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
    </>
  );
};
