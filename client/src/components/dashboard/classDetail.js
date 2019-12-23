import React from "react";

import "../../styles/classDetail.scss";

import ClassContainer from "./Classes/classContatiner";

import AddTask from "./Add/addTask";
import AddTest from "./Add/addTest";

class ClassDetail extends React.Component {
  state = {
    showAddTask: false,
    showAddTest: false,
    IsAnAddModalOpen: false
  };

  SetshowAddTask = () => {
    this.setState({
      showAddTask: !this.state.showAddTask,
      showAddTest: false,
      IsAnAddModalOpen: !this.state.showAddTask
    });
  };

  SetshowAddTest = () => {
    this.setState({
      showAddTest: !this.state.showAddTest,
      showAddTask: false,
      IsAnAddModalOpen: !this.state.showAddTest
    });
  };

  render() {
    return (
      <div id="class-detail">
        <div className={`flexbox ${this.state.IsAnAddModalOpen && "expand"}`}>
          <ClassContainer
            toggle={this.props.toggle}
            show={[this.SetshowAddTask, this.SetshowAddTest]}
          />
          <AddTask show={this.SetshowAddTask} />
          <AddTest show={this.SetshowAddTest} />
        </div>
      </div>
    );
  }
}

export default ClassDetail;
