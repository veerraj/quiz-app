import React from "react";
import {
  ButtonGroup,
  Button,
  CardMedia,
  Grid,
  Typography,
  Hidden,
} from "@material-ui/core";
import image from "../../assets/image/home.png";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        justify="content"
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid className={classes.root} item>
          <CardMedia component="img" alt="welcome" image={image} />
        </Grid>

        <Hidden mdUp>
          <Grid
            item
            style={{
              textAlign: "center",
            }}
          >
            <Typography variant="h4" className={classes.right}>
              Welcome to quiz system
            </Typography>
            <Grid
              className={classes.butttonGroup}
              item
            
            >
              <Link to="/create-quiz" className={classes.link}>
                <Button variant="outlined" className={classes.button}>
                  Create Quiz
                </Button>
              </Link>
              {/* <Link to="/quiz" className={classes.link}>
                <Button variant="outlined" className={classes.button}>
                  Start Quiz
                </Button>
            </Link> */}
            </Grid>
          </Grid>
        </Hidden>

        <Hidden smDown>
          <Grid item>
            <Typography variant="h4" className={classes.right}>
              Welcome to quiz system
            </Typography>
            <Grid className={classes.butttonGroup} item>
              <Link to="/create-quiz" className={classes.link}>
                <Button variant="outlined" className={classes.button}>
                  Create Quiz
                </Button>
              </Link>
              {/* <Link to="/quiz" className={classes.link}>
                <Button variant="outlined" className={classes.button}>
                  Start Quiz
                </Button>
            </Link> */}
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

export default Home;
