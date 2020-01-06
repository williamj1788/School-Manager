import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createClass } from "../../redux/action";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";

import NavBar from "../NavBar/NavBar";
import AppDrawer from "../AppDrawer/AppDrawer";
import CreateClassForm from "../CreateClassForm/CreateClassForm";
import ClassDetail from "../ClassDetails/ClassDetail";

const useStyles1 = makeStyles({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20
  }
});

function Classes() {
  const classes = useStyles1();
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [classID, setClassID] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const dispatch = useDispatch();
  const classesObj = useSelector(state => state.classes);

  function onSubmit(form) {
    dispatch(createClass(form));
    setOpenForm(false);
  }

  return (
    <React.Fragment>
      <NavBar title="Classes" onMenuClick={() => setOpen(!open)} />
      <AppDrawer open={open} onClose={() => setOpen(false)} />
      <Container>
        {classesObj.map(cla => (
          <Class
            key={cla._id}
            {...cla}
            onClick={() => {
              setClassID(cla._id);
              setOpenDetails(true);
            }}
          />
        ))}
      </Container>
      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => setOpenForm(true)}
      >
        <AddIcon />
      </Fab>
      <CreateClassForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={onSubmit}
      />
      <ClassDetail
        open={openDetails}
        classID={classID}
        onClose={() => setOpenDetails(false)}
      />
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
    width: 5,
    height: "100%",
    marginRight: "10px",
    boxSizing: "border-box"
  }
});

function Class({ name, teacher, color, onClick }) {
  const classes = useStyles2();
  return (
    <Paper className={classes.paper} onClickCapture={onClick}>
      <div className={classes.colorBar} style={{ backgroundColor: color }} />
      <div style={{ flexGrow: 1 }}>
        <Typography>{name}</Typography>
        <Typography>Mon - Tues - Weds</Typography>
      </div>
      <Typography>{teacher}</Typography>
    </Paper>
  );
}

export default Classes;
