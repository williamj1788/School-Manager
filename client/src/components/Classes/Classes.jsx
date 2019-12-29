import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";

import NavBar from "../NavBar/NavBar";
import AppDrawer from "../AppDrawer/AppDrawer";

const useStyles1 = makeStyles({
  screen: {
    top: 0,
    height: "100vh",
    width: "100vw",
    position: "fixed"
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20
  }
});

function Classes() {
  const classes = useStyles1();
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <NavBar title="Classes" onMenuClick={() => setOpen(!open)} />
      <AppDrawer open={open} onClose={() => setOpen(false)} />
      <Container>
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
        <Class />
      </Container>
      <div className={classes.screen}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </div>
    </React.Fragment>
  );
}

const useStyles2 = makeStyles({
  paper: {
    margin: "20px 0",
    padding: "5px 10px",
    height: 50,
    display: "flex"
  },
  colorBar: {
    backgroundColor: "#ff0000",
    width: 5,
    height: "100%",
    marginRight: "10px",
    boxSizing: "border-box"
  }
});

function Class() {
  const classes = useStyles2();
  return (
    <Paper className={classes.paper}>
      <div className={classes.colorBar} />
      <div style={{ flexGrow: 1 }}>
        <Typography>English 101</Typography>
        <Typography>Mon - Tues - Weds</Typography>
      </div>
      <Typography>Mrs.Teacher</Typography>
    </Paper>
  );
}

export default Classes;
