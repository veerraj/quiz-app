import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import QuizIcon from "@material-ui/icons/ContactSupport";
import FormIcon from "@material-ui/icons/ListAlt";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Hidden } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#2E3B55",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  link: {
    textDecoration: "none",
    color: "white",
    edge: "end",
  },
  active: {
    // backgroundColor: "#8F5C2C",
    borderBottom: "1px solid white",
    color: "white",
  },
  activeNav: {
    textDecoration: "none",
    color: "black",
  },
  navlink: {
    color: "orange",
  },
}));

const Layout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const data = useSelector((state) => state.quizs);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const linkStyle = {
    textDecoration: "none",
    marginRight: 10,
    color: "white",
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Hidden smUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Quiz App
          </Typography>
          <Hidden xsDown>
            {/* <Grid container spacing={2} justify="flex-end"> */}
            <NavLink
              to="/"
              exact
              className={classes.link}
              activeClassName={classes.active}
            >
              Home
            </NavLink>
            &nbsp;&nbsp;
            <NavLink
              to="/create-quiz"
              className={classes.link}
              activeClassName={classes.active}
            >
              Create
            </NavLink>
            &nbsp;&nbsp;
            {data.length ? (
              <NavLink
                to="/start-quiz"
                className={classes.link}
                activeClassName={classes.active}
              >
                Quiz
              </NavLink>
            ) : null}
            &nbsp;&nbsp;
            {/* </Grid> */}
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <NavLink
              to="/"
              exact
              className={classes.activeNav}
              activeClassName={classes.navlink}
            >
              <ListItemText primary={"Home"} />
            </NavLink>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FormIcon />
            </ListItemIcon>
            <NavLink
              to="/create-quiz"
              className={classes.activeNav}
              activeClassName={classes.navlink}
            >
              <ListItemText primary={"Create"} />
            </NavLink>
          </ListItem>
          {data.length ? (
            <ListItem button>
              <ListItemIcon>
                <QuizIcon />
              </ListItemIcon>

              <NavLink
                to="/start-quiz"
                className={classes.activeNav}
                activeClassName={classes.navlink}
              >
                <ListItemText primary={"Quiz"} />
              </NavLink>
            </ListItem>
          ) : null}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
};

export default Layout;
