import React, { useState,useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch,useSelector } from "react-redux"
import { auth } from "../../store/actions/authAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#2E3B55",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Auth(props) {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authData = useSelector(state=>state.auth)

  const changeAuth = () =>{
       setIsLogin(!isLogin)
  }

  const handleAuth = (e) =>{
        e.preventDefault()
        dispatch(auth(email,password,!isLogin))
  }

  useEffect(() => {
    authData.token && props.history.push('/home')
  }, [authData])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
     {authData.loading &&  <CircularProgress size={100} style={{
        textAlign:"center"
      }} />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "Sign In" : "Sign Up"}
        </Typography>
        {authData.error && <p style={{color:'red'}}>{authData.error.message}</p>}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange = {(e)=>setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange = {(e)=>setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor: "#2E3B55",
              color: "white",
            }}
            className={classes.submit}
            onClick={handleAuth}
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={changeAuth} variant="text">
                  { isLogin ? "Don't have an account? Sign Up" : "Already have account ? Sign In"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
