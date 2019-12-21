import React from "react";

import ShowTasks from "./showTasks";
import ShowTests from "./showTests";
import { FaTrashAlt } from "react-icons/fa";

import { connect } from "react-redux";
import { removeClass } from "../../../redux/action";

const mapStateToProps = state => {
  return {
    classes: state.classes,
    classIndex: state.classIndex,
    classID: state.classID,
    isGuess: state.isGuess
  };
};

class ClassContainer extends React.Component {
  state = {
    showTask: true,
    showTest: false,
    isDeleting: false
  };

  deleteClass = id => {
    if (!this.state.isDeleting) {
      this.setState({ isDeleting: true });
      if (!this.props.isGuess) {
        fetch(`/api/class/${id}`, {
          method: "DELETE",
          credentials: "include"
        }).then(() => {
          this.props.toggle();
          this.props.dispatch(removeClass(id));
        });
      } else {
        this.props.toggle();
        this.props.dispatch(removeClass(id));
      }
    }
  };

  SetShowTest = () => {
    this.setState({
      showTask: false,
      showTest: true
    });
  };

  SetShowtask = () => {
    this.setState({
      showTask: true,
      showTest: false
    });
  };
  render() {
    return (
      <div id="class-container">
        <div id="class-header">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => this.deleteClass(this.props.classID)}
          >
            <FaTrashAlt color="white" size="3em" />
          </div>
          <span id="class-header-text">
            {this.props.classes[this.props.classIndex].name}
          </span>
          <button
            className="close-button"
            onClick={() => this.props.toggle()}
            style={{ width: "35px", height: "35px" }}
            type="button"
          ></button>
        </div>
        <div id="tab-container">
          <div
            className="tab"
            onMouseDown={this.SetShowtask}
            style={this.state.showTask ? { backgroundColor: "#06CAF2" } : null}
          >
            <span
              className="centered"
              style={this.state.showTask ? { color: "white" } : null}
            >
              Task
            </span>
          </div>
          <div
            className="tab"
            onMouseDown={this.SetShowTest}
            style={this.state.showTest ? { backgroundColor: "#06CAF2" } : null}
          >
            <span
              className="centered"
              style={this.state.showTest ? { color: "white" } : null}
            >
              Test
            </span>
          </div>
        </div>
        {this.state.showTask && <ShowTasks show={this.props.show[0]} />}
        {this.state.showTest && <ShowTests show={this.props.show[1]} />}
      </div>
    );
  }
}
ClassContainer = connect(mapStateToProps)(ClassContainer);
export default ClassContainer;
