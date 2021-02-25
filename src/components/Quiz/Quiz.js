import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addResponse } from "../../store/actions/quizAction";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Radio,
  CardActions,
  Hidden,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    width:'100%'
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    textDecoration: "none",
  },
});

export default function Quiz() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.quizs);
  const responseData = useSelector((state) => state.quizResponse);

  const handleChange = (value, id) => (e) => {
    let tempArr = [...responseData];
    let index = tempArr.findIndex((val) => val.id === id);
    if (index == -1) {
      tempArr.push({ value: value, id: id });
    } else {
      tempArr[index] = { value: value, id: id };
    }
    dispatch(addResponse(tempArr));
  };

  const checkdHandle = (ques_id, value) => {
    let ans = responseData.filter(
      (ele) => ele.id === ques_id && ele.value === value
    );
    return ans.length ? true : false;
  };

  const clearResponse = (que_id) => {
    let tempArr = [...responseData];
    let index = tempArr.findIndex((val) => val.id === que_id);
    tempArr[index] = { value: "", id: "" };
    dispatch(addResponse(tempArr));
  };

  return (
    <div
      style={{
        overflowX: "hidden",
      }}
    >
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {data.map((ele, index) => (
          <div key={index} style={{
            width:"100%"
          }}>
            <Hidden xsDown >
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1 + "." + " " + ele.name}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {ele &&
                      ele.options &&
                      ele.options.map((element, index) => (
                        <Typography
                          key={index}
                          component="span"
                          style={{
                            width: "20%",
                          }}
                        >
                          <Radio
                            onChange={handleChange(element.id, ele.id)}
                            // value={selectedValue}
                            checked={checkdHandle(ele.id, element.id)}
                          />
                          {element.name}
                        </Typography>
                      ))}
                      <Button
                    color="secondary"
                    variant="text"
                    size="small"
                    style={{
                      width: "20%",
                    }}
                    onClick={() => clearResponse(ele.id)}
                  >
                    Clear Response
                  </Button>
                  </div>
                </CardContent>
              </Card>
            </Hidden>
            <Hidden smUp >
              <Card className={classes.root} >
                <CardContent>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1 + "." + " " + ele.name}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {ele &&
                      ele.options &&
                      ele.options.map((element, index) => (
                        <Typography
                          key={index}
                          component="span"
                          style={{
                            width: "50%",
                          }}
                        >
                          <Radio
                            onChange={handleChange(element.id, ele.id)}
                            // value={selectedValue}
                            checked={checkdHandle(ele.id, element.id)}
                          />
                          {element.name}
                        </Typography>
                      ))}
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    color="secondary"
                    variant="text"
                    size="small"
                    onClick={() => clearResponse(ele.id)}
                  >
                    Clear Response
                  </Button>
                </CardActions>
              </Card>
            </Hidden>
          </div>
        ))}
        <Grid item>
          <Link to="/score" className={classes.link}>
            <Button
              variant="outlined"
              color="primary"
              style={{
                marginTop: 10,
              }}
            >
              Submit Quiz
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
