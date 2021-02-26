import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import RightIcon from "@material-ui/icons/CheckCircle";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    marginTop: 100,
  },
});

export default function Result() {
  const classes = useStyles();
  const data = useSelector((state) => state.quiz.quizs);
  const responseData = useSelector((state) => state.quiz.quizResponse);
  const user = useSelector((state) => state.quiz.user);
  const [result, setResult] = useState(0);

  useEffect(() => {
    data.map((ele) => {
      responseData.map((resp) => {
        if (ele.id === resp.id && ele.asnwer === resp.value) {
          setResult((prevState) => prevState + 1);
        }
      });
    });
  }, []);

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignContent="center"
      direction="column"
    >
      <Grid
        item
        style={{
          textAlign: "center",
        }}
      >
        <RightIcon
          style={{
            fill: "#2E3B55",
            fontSize: 100,
          }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h5">
          Hi!, { user ? user.name : 'rajveer'} your score is {result}/{data.length}
        </Typography>
        <Typography variant="h5" style={{textAlign:"center"}}>
              { result/data.length != 1 ? `😕`:`😇`}
        </Typography>
      </Grid>
    </Grid>
  );
}
