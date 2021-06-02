import React, { Component } from "react";
import DialogBoxTemplate from "./DialogBoxTemplate";
import GameBody from "./GameBody";
import GameHeader from "./GameHeader";

class MainModule extends Component {
  state = {
    name: "",
    totalCards: "",
    totalPairCards: 0,
    availableColors: [
      "#6897bb",
      "#79f5f5",
      "#101010",
      "#000080",
      "#ff1f66",
      "#55f5dc",
      "#81d8d0",
      "#0a75ad",
      "#7fef50",
      "#ff80ed",
      "#407294",
      "#f7347a",
      "#ffa500",
    ],
    selectedColors: [],
    renderCards: [],
    tempCard: "",
    moves: 0,
    count: 0,
    totalMatchedPairs: 0,
    min: 3,
    sec: 0,
    showDialog: false,
  };

  startTimer = () => {
    this.setState({ sec: this.state.sec - 1 }, function () {
      if (this.state.sec === -1) {
        this.setState({ min: this.state.min - 1 });
        this.setState({ sec: 59 });
      }
      if (this.state.min === 0 && this.state.sec === 0) {
        clearInterval(this.startInterval);
        this.setState({ showDialog: true });
      }
    });
  };

  handleChange = (e) => {
    let name = e.target.name,
      value = e.target.value;
    this.setState({ [name]: value });
  };

  handleStart = () => {
    let totalCards = this.state.totalCards,
      name = this.state.name;
    if (totalCards === "" || name === "") {
      alert("Enter your name and total Cards first");
    } else {
      let totalFlipCards = totalCards * totalCards,
        totalPairCards = 0;
      if (totalCards % 2 === 0) {
        totalPairCards = totalFlipCards / 2;
      } else {
        totalPairCards = (totalFlipCards - 1) / 2;
      }
      this.setState({ totalPairCards }, function () {
        this.addUniqueIdentityToCards();
      });
    }
  };

  addUniqueIdentityToCards = () => {
    let availableColors = this.state.availableColors,
      selectedColors = [];
    for (let i = 0; i < this.state.totalPairCards; i++) {
      selectedColors.push({
        hexCode: availableColors[i],
        selected: false,
        matched: false,
      });
    }
    selectedColors = selectedColors.concat(
      JSON.parse(JSON.stringify(selectedColors))
    );
    if (this.state.totalCards % 2 !== 0) {
      selectedColors.push({
        hexCode: "extraCard",
        selected: false,
        matched: false,
      });
    }
    this.shuffleCards(selectedColors);
  };

  shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    this.setState({ selectedColors: array }, function () {
      this.manageRenderingCards();
    });
  };

  manageRenderingCards = () => {
    let allCards = this.state.selectedColors,
      totalCards = parseInt(this.state.totalCards),
      renderCards = [];
    if (allCards.length > 0) {
      let count = 0;
      for (let j = 0; j < totalCards; j++) {
        let tempCards = [];
        for (let i = 0; i < totalCards; i++) {
          tempCards.push(allCards[count]);
          count++;
        }
        renderCards.push(tempCards);
      }
    }
    this.setState({ renderCards }, function () {
      this.startInterval = setInterval(this.startTimer, 1000);
    });
  };

  handleFlip = (index, idx) => {
    let renderCards = [...this.state.renderCards],
      moves = this.state.moves,
      count = this.state.count,
      totalMatchedPairs = this.state.totalMatchedPairs;
    count++;
    renderCards[index][idx].selected = true;
    if (count === 1) {
      this.setState({ tempCard: renderCards[index][idx] });
    }
    if (count >= 2) {
      if (renderCards[index][idx].hexCode === this.state.tempCard.hexCode) {
        setTimeout(() => {
          renderCards.forEach((el) => {
            el.forEach((card) => {
              if (card.hexCode === renderCards[index][idx].hexCode) {
                card.matched = true;
              }
            });
          });
        }, 300);
        totalMatchedPairs = totalMatchedPairs + 1;
      }
      this.setState(
        { renderCards, moves: moves + 1, count: 0, tempCard: "" },
        function () {
          setTimeout(() => {
            this.closeAllCards();
            this.setState({ totalMatchedPairs }, function () {
              if (totalMatchedPairs === parseInt(this.state.totalPairCards)) {
                this.setState({ showDialog: true });
                clearInterval(this.startInterval);
              }
            });
          }, 500);
        }
      );
    } else {
      this.setState({ renderCards, count });
    }
  };

  closeAllCards = () => {
    let renderCards = [...this.state.renderCards];
    renderCards.forEach((el) => {
      el.forEach((card) => {
        card.selected = false;
      });
    });
    this.setState({ renderCards });
  };

  resetGame = () => {
    this.setState({
      name: "",
      totalCards: "",
      totalPairCards: 0,
      selectedColors: [],
      renderCards: [],
      tempCard: "",
      moves: 0,
      count: 0,
      totalMatchedPairs: 0,
      min: 3,
      sec: 0,
    });
  };

  closeDialog = () => {
    this.resetGame();
    this.setState({ showDialog: false });
  };

  render() {
    return (
      <div className="container">
        {this.state.showDialog ? (
          <DialogBoxTemplate
            min={this.state.min}
            sec={this.state.sec}
            name={this.state.name}
            moves={this.state.moves}
            closeDialog={this.closeDialog}
          ></DialogBoxTemplate>
        ) : null}
        <div
          className={this.state.renderCards.length > 0 ? "minimize" : "expand"}
        >
          <GameHeader
            name={this.state.name}
            totalCards={this.state.totalCards}
            handleChange={this.handleChange}
            handleStart={this.handleStart}
          ></GameHeader>
          <hr></hr>
        </div>
        <GameBody
          totalCards={this.state.totalCards}
          renderCards={this.state.renderCards}
          handleFlip={this.handleFlip}
          moves={this.state.moves}
          count={this.state.count}
          name={this.state.name}
          min={this.state.min}
          sec={this.state.sec}
        ></GameBody>
      </div>
    );
  }
}

export default MainModule;
