import React, { Component } from "react";

class GameHeader extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-4"></div>
          <div
            className="col-md-2"
            style={{ color: "white", fontSize: "13px", letterSpacing: ".5px" }}
          >
            <strong>Name</strong>
          </div>
          <div
            className="col-md-2"
            style={{ color: "white", fontSize: "13px", letterSpacing: ".5px" }}
          >
            <strong>Total number of cards</strong>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-md-4"></div>
          <div className="col-md-2">
            <input
              name="name"
              type="text"
              className="form-control"
              value={this.props.name}
              onChange={this.props.handleChange}
            ></input>
          </div>
          <div className="col-md-2">
            <select
              className="form-control"
              name="totalCards"
              value={this.props.totalCards}
              onChange={this.props.handleChange}
            >
              <option value="" disabled selected>
                Choose total Cards
              </option>
              <option value={2}>2 x 2 cards</option>
              <option value={3}>3 x 3 cards</option>
              <option value={4}>4 x 4 cards</option>
              <option value={5}>5 x 5 cards</option>
            </select>
          </div>
          <div className="col-md-auto">
            <button
              className="btn btn-primary"
              onClick={this.props.handleStart}
            >
              Start Game
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default GameHeader;
