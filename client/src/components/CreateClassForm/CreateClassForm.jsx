import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  colorBall: {
    margin: "5px",
    width: 0,
    height: 0,
    borderRadius: "50%",
    borderWidth: "8px",
    borderStyle: "solid"
  }
}));

function CreateClassForm({ open, onClose }) {
  const [form, setForm] = useState({
    name: null,
    teacher: null,
    color: null
  });

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const classes = useStyle();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.title}>Add Class</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            onChange={handleOnChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Teacher"
            name="teacher"
            onChange={handleOnChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Color"
            name="color"
            select
            onChange={handleOnChange}
          >
            <MenuItem>
              <div
                className={classes.colorBall}
                style={{ borderColor: "#000" }}
              />
              Black
            </MenuItem>
            <MenuItem>
              <div className={classes.colorBall} />
              Black
            </MenuItem>
            <MenuItem>
              <div className={classes.colorBall} />
              Black
            </MenuItem>
            <MenuItem>
              <div className={classes.colorBall} />
              Black
            </MenuItem>
          </TextField>
          <Button fullWidth variant="contained" color="primary">
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateClassForm;
