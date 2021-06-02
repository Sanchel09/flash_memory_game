import React, { Component } from "react";
import "../../assets/scss/flashGame.scss";
import ReactCardFlip from "react-card-flip";
import patternCard from "../../assets/images/patternCard.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

class GameBody extends Component {
  state = {};

  render() {
    let renderCards = this.props.renderCards;
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col text-center">
            <div className="gameBoard">
              {renderCards.length > 0 ? (
                renderCards.map((row, index) => {
                  return (
                    <div key={index}>
                      <div style={{ display: "inline-flex" }}>
                        {row.map((card, idx) => {
                          return (
                            <div
                              key={idx}
                              style={card.matched ? { opacity: 0 } : {}}
                            >
                              <ReactCardFlip
                                isFlipped={card.selected}
                                containerStyle={{
                                  width: "70px",
                                }}
                              >
                                <div
                                  className="cardFront"
                                  onClick={() =>
                                    this.props.handleFlip(index, idx)
                                  }
                                >
                                  <img src={patternCard} alt="BackOfCard"></img>
                                </div>

                                <div className="cardBack">
                                  {card.hexCode === "extraCard" ? (
                                    <div className="extraCard">
                                      <FontAwesomeIcon
                                        icon={faBan}
                                      ></FontAwesomeIcon>
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        backgroundColor: card.hexCode,
                                        height: "100%",
                                        border: "1px solid #ccc",
                                      }}
                                    ></div>
                                  )}
                                </div>
                              </ReactCardFlip>
                            </div>
                          );
                        })}
                      </div>
                      <br></br>
                    </div>
                  );
                })
              ) : (
                <div className="intro">FLASH MEMORY GAME</div>
              )}
            </div>
          </div>
          <div className="col-md-3" style={{ borderLeft: "1px solid #ccc" }}>
            {renderCards.length > 0 ? (
              <>
                <div className="nameDisplay text-center">{this.props.name}</div>
                <div className="p-2" style={{ fontSize: "15px" }}>
                  <span style={{ fontSize: "20px", color: "white" }}>
                    <strong>Moves: </strong>
                    {this.props.moves}
                  </span>
                  <span className="timerSpan">
                    <div
                      className={
                        "timer " +
                        (this.props.min === 0 && this.props.sec < 10
                          ? "danger"
                          : "")
                      }
                      id="time"
                    >
                      {this.props.min} : {this.props.sec < 10 ? 0 : ""}
                      {this.props.sec}
                    </div>
                  </span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default GameBody;
