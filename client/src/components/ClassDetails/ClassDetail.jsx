import React, { useRef, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonIcon from "@material-ui/icons/Person";

import { useSelector, useDispatch } from "react-redux";

import { deleteClass } from "../../redux/action";

import "./ClassDetails.scss";

function ClassDetail({ open, classID, onClose }) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const classObj =
    useSelector(state => state.classes.find(c => c._id === classID)) || {};

  const dispatch = useDispatch();

  const settingElement = useRef(null);

  function onDelete() {
    dispatch(deleteClass(classID));
    setIsSettingOpen(false);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ backgroundColor: classObj.color, color: "white" }}>
        <div className="classDetail-title">
          {classObj.name}
          <div>
            <IconButton onClick={() => setIsSettingOpen(true)}>
              <MoreVertIcon style={{ color: "white" }} />
            </IconButton>
            <IconButton onClick={onClose} ref={settingElement}>
              <CloseIcon style={{ color: "white" }} />
            </IconButton>
            <Menu
              anchorEl={settingElement.current}
              keepMounted
              open={isSettingOpen}
              onClose={() => setIsSettingOpen(false)}
            >
              <MenuItem onClick={onDelete}>Delete Class</MenuItem>
              <MenuItem>Edit Class</MenuItem>
            </Menu>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="classDetail-heading">
          <DateRangeIcon />
          <p>Mon - Tues - Weds</p>
        </div>
        <div className="classDetail-heading">
          <PersonIcon />
          <p>{classObj.teacher}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ClassDetail;
