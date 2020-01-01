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
    display: "inline-block",
    marginRight: "5px",
    width: 0,
    height: 0,
    borderRadius: "50%",
    borderWidth: "8px",
    borderStyle: "solid"
  },
  select: {
    display: "flex"
  }
}));

function CreateClassForm({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: null,
    teacher: null,
    color: "#000"
  });
  const [formErrors, setFormErrors] = useState({
    name: null,
    teacher: null
  });

  function handleOnSubmit(event) {
    event.preventDefault();

    validateForm(); // always call to remove errors if form is valid
    if (!form.name || !form.teacher) {
      return;
    }

    onSubmit(form);
  }

  function validateForm() {
    setFormErrors({
      name: !form.name ? "name is required" : null,
      teacher: !form.teacher ? "teacher is required" : null
    });
  }

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
        <form onSubmit={handleOnSubmit} noValidate>
          <TextField
            error={!!formErrors.name}
            helperText={formErrors.name}
            required
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            onChange={handleOnChange}
            margin="normal"
          />
          <TextField
            error={!!formErrors.teacher}
            helperText={formErrors.teacher}
            required
            fullWidth
            variant="outlined"
            label="Teacher"
            name="teacher"
            onChange={handleOnChange}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            label="Color"
            name="color"
            select
            onChange={handleOnChange}
            className={classes.select}
            value={form.color}
            margin="normal"
          >
            {[
              ["#000", "Black"],
              ["#f00", "Red"],
              ["#0f0", "Green"],
              ["#00f", "Blue"]
            ].map((item, i) => (
              <MenuItem value={item[0]} key={i}>
                <div
                  className={classes.colorBall}
                  style={{ borderColor: item[0] }}
                />
                {item[1]}
              </MenuItem>
            ))}
          </TextField>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateClassForm;
