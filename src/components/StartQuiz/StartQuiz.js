import React,{useState,useEffect} from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { setUsername } from "../../store/actions/quizAction";
import shortid from "shortid";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  container: {
    marginTop: -30,
  },
  right: {
    color: "#2E3B55",
    fontWeight: "bold",
  },
  button: {
    color: "#2E3B55",
    marginRight: 5,
  },
  butttonGroup: {
    // padding: 40,
    textAlign: "center",
    marginTop: 10,
  },
  link: {
    textDecoration: "none",
  },
}));

export default function StartQuiz() {
  const classes = useStyles();
  const [username,setUserName] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);


  useEffect(() => {
      if(user){
        console.log(user,"hello")
        setUserName(user.name)
      }
  }, [])

  const handleUser = () =>{
       const newUser = {
            id:shortid.generate(),
            name:username
       }
       dispatch(setUsername(newUser))
  }
  return (
    <div>
      <Grid container justify="center" alignContent="center" direction="column">
        <Grid
          item
          style={{
            textAlign: "center",
          }}
        >
          <AccountCircleIcon
            style={{
              fill: "#2E3B55",
              fontSize: 100,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            // style={{ padding: "1%" }}
            label="name"
            placeholder="Enter your name"
            variant="outlined"
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
          />
        </Grid>
        <Grid
          item
          style={{
            textAlign: "center",
            marginTop: 10,
          }}
        >
          <Link to="/quiz" className={classes.link}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#2E3B55",
                color: "white",
              }}
              onClick={handleUser}
            >
              Start Quiz
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
