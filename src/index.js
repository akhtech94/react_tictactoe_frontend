import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    render() {
      return (
        <button className="square" onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {    

    renderSquare(i) {
      return <Square
        value={this.props.squares[i]} 
        onClick={ () => this.props.onClick(i) }
        />
    }
  
    render() {
        
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        history : [
          { squares: Array(9).fill(null) },
        ],
        xIsNext: true,
        winner: null,
        showwMoves : -1,
      };
    }

    finddWinner(squares){
      const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
      ]
      for(let line of lines){
        const [a, b, c] = line;
        if((squares[a] === squares[b]) && (squares[b] === squares[c]) && (squares[c]!= null)){
          return squares[a];
        };
      }
      return null;

    }

    handleClick(i){
      if(this.state.history[this.state.history.length-1].squares[i] != null || this.state.winner != null) return ;
      let squares = this.state.history[this.state.history.length-1].squares.slice();  
      // console.log("Value of i : ", i);
      squares[i] = this.state.xIsNext ? 'X' : 'O' ;
      // console.log("Value of squares : ", squares[i]);    

      this.setState({
        history: this.state.history.concat([ { squares: squares } ]),
        xIsNext: !this.state.xIsNext,
        showwMoves: -1,
      })

      const winner = this.finddWinner(squares)
      if(winner != null){
        squares = Array(9).fill(winner)
        this.setState({
          // history: this.state.history.concat([ {squares: squares} ]),
          winner: squares[i],
        })
      }   
    }

    showMove(move){
        this.setState(
          { showwMoves : move }
        )
    }

    render() {

      const moves = this.state.history.map( (square, move) => {
        const buttonText = move ? "Go to move " + move : "Go to the begining" ;
        return (
          <li key={move}>
            <button onClick={ () => {this.showMove(move)} }>{ buttonText }</button>
          </li>
        )
      })

      let status = '';
      if(this.state.winner){
        status = "Winner is " + (this.state.winner);
      }
      else {status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O') ;}

      // console.log("Akhilarray: ", this.state.history[this.state.history.length-1].squares);

      if(this.state.showwMoves < 0){
        return (
          <div className="game">
            <div className="game-board">
              <Board 
                squares={ this.state.history[this.state.history.length-1].squares}
                onClick={ (i) => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{ status }</div>
              <ol>{ moves }</ol>
            </div>
          </div>
        );  
      }
      else{
        return (
          <div className="game">
            <div className="game-board">
              <Board 
                squares={ this.state.history[this.state.showwMoves].squares}
                onClick={ (i) => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{ status }</div>
              <ol>{ moves }</ol>
            </div>
          </div>
        );
      }
      
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  