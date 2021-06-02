import React, { Component } from "react";

class DialogBoxTemplate extends Component {
  state = {};
  render() {
    return (
      <div className="dialogBox-backface">
        <div className="dialogBox">
          <div>
            <span className="dialogBoxCongrats">Congratulations !!! </span>
            <span className="dialogBoxBody">{this.props.name}</span>
          </div>
          <div className="dialogBoxBody">
            You completed the game in{" "}
            <strong>
              {this.props.min} : {this.props.sec < 10 ? 0 : ""}
              {this.props.sec}
            </strong>{" "}
            minutes with <strong>{this.props.moves}</strong> moves.
          </div>
          <div className="mt-3" style={{ textAlign: "right" }}>
            <button
              className="btn btn-primary"
              onClick={this.props.closeDialog}
            >
              Start New Game
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DialogBoxTemplate;
