import React, { useState } from "react";
import {
  Grid,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  AccordionActions,
  Button,
  MenuItem,
  Select,
  ListItem,
  ListItemText,
  List,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { createQuiz, deleteQuiz, setResponse, updateQuiz } from "../../store/actions/quizAction";
import shortid from "shortid";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  grid: {
    height: "100%",
    padding: 20,
  },
  leftGrid: {
    // borderRight: "2px solid #ccc",
    // marginRight: 10,
  },
});

export default function QuizForm() {
  const classes = useStyles();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState(0);
  const [updateId,setUpdateId] = useState(null);
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.quizs);
  const optionValue = [
    { name: "Option A" },
    { name: "Option B" },
    { name: "Option C" },
    { name: "Option D" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!updateId){
      const newQuiz = {
        id: shortid.generate(),
        name: question,
        options: options,
        asnwer: options[answer - 1].id,
        slectedOption:answer
      };
      dispatch(createQuiz(newQuiz));
    }else{
      const newQuiz = {
        id: updateId,
        name: question,
        options: options,
        asnwer: options[answer - 1].id,
        slectedOption:answer
      };
      dispatch(updateQuiz(newQuiz));
    }
    clearForm();
  };

  const clearForm = () => {
    setQuestion("");
    setOptions([]);
    setAnswer(0);
  };

  const DeleteQuiz = (id) => {
    dispatch(deleteQuiz(id));
  };

  const EditQuiz = (quiz) => {
    //  dispatch(setResponse(quiz))
      console.log(quiz);
      setQuestion(quiz.name);
      setAnswer(quiz.slectedOption);
      setOptions(quiz.options);
      setUpdateId(quiz.id);
  }

  const SetOptions = (index) => (e) => {
    let tempArr = [...options];
    tempArr[index] = { name: e.target.value, id: shortid.generate() };
    setOptions(tempArr);
  };

  // const returnValue = (index) => {
  //   let tempArr = [...options];
  //   return tempArr.length ? tempArr[index].name : "";
  // };

  return (
    <div>
      <Grid container className={classes.grid}>
        <Grid item lg={6} className={classes.leftGrid}>
          <Grid style={{ padding: 10 }}>
            {/* <Typography>Create Quiz</Typography> */}
            <TextField
              fullWidth
              style={{ padding: "1%" }}
              label="question"
              placeholder="Enter Question"
              variant="outlined"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Grid
              container
              justify="space-evenly"
              style={{
                flexWrap: "wrap",
                display: "flex",
              }}
            >
              {optionValue.length &&
                optionValue.map((option, index) => (
                  <TextField
                    key={index}
                    style={{ marginTop: 10, width: "48%", padding: "1%" }}
                    label={option.name}
                    placeholder={option.name}
                    variant="outlined"
                    // value={returnValue(index)}
                    onChange={SetOptions(index)}
                  />
                ))}
            </Grid>
            <Grid
              container
              alignItems="center"
              justify="space-evenly"
              style={{ marginTop: 10, flexWrap: "wrap", display: "flex" }}
            >
              <Typography
                variant="subtitle1"
                style={{
                  fontWeight: "bold",
                  width: "50%",
                }}
              >
                Choose correct answer
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ width: "48%" }}
                variant="outlined"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              >
                <MenuItem value={0} disabled>
                  Select Option
                </MenuItem>
                <MenuItem value={1}>A</MenuItem>
                <MenuItem value={2}>B</MenuItem>
                <MenuItem value={3}>C</MenuItem>
                <MenuItem value={4}>D</MenuItem>
              </Select>
            </Grid>
            <Grid style={{ paddingTop: 10 }} item>
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                { updateId ? 'Update Quiz' : 'Create Quiz'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          lg={6}
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          {quizData.length ? (
            quizData.map((quiz, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>
                    {quiz.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Hidden xsDown>
                    {/* <List component="ul"> */}
                    {quiz.options.length
                      ? quiz.options.map((option, index) => (
                          <ListItem key={index}>
                            <div
                              style={{
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {String.fromCharCode(index + 65) + ". "}
                            </div>
                            <ListItemText primary={option.name} />
                          </ListItem>
                        ))
                      : null}
                    {/* </List> */}
                  </Hidden>
                  <Hidden smUp>
                    <List component="ul">
                      {quiz.options.length
                        ? quiz.options.map((option, index) => (
                            <ListItem key={index}>
                              <div
                                style={{
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {String.fromCharCode(index + 65) + ". "}
                              </div>
                              <ListItemText primary={option.name} />
                            </ListItem>
                          ))
                        : null}
                    </List>
                  </Hidden>
                </AccordionDetails>
                <AccordionActions>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => DeleteQuiz(quiz.id)}
                  >
                    Delete
                  </Button>
                  <Button size="small" color="primary"
                   onClick={() => EditQuiz(quiz)}>
                    Edit
                  </Button>
                </AccordionActions>
              </Accordion>
            ))
          ) : (
            <Typography
              variant="subtitle1"
              style={{
                textAlign: "center",
              }}
            >
              No Quiz Found
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
