import React, { Component } from 'react';
import Squares from "./Squares"

export default class Board extends Component {
    //initiate state with array to hold 100 null spots on board.
    constructor(props) {
        super(props)
        this.state = {
            board: Array(100).fill(null),
            background: Array(100).fill('aqua'),
            clicks: 7,
            shipLoc: [
                0,1,2,3,4
            ]
        }
    }

    renderSquare = (i) => {
        return <Squares
                    value = {this.state.board[i]}
                    background = {this.state.background[i]}
                    handleClick = {() => this.handleClick(i)}
                />
    }
    winner = (board) => {
        // const [a,b,c,d,e] = this.state.shipLoc
        // if(board[a] && square[a] === square[b]) && square[a] === square[c] && square[a] === square[d] && square[a] === square[e])
        const winningCom = board.filter((value, index) => value === 'X')
        console.log(winningCom)
        if(winningCom.length === this.state.shipLoc.length){
            return true
        }
        return null
    }
    handleClick = (i) => {
        const newBoard = this.state.board.slice()
        let newBackground = this.state.background
        let numClicks = this.state.clicks
        const shipLoc = this.state.shipLoc
        if(numClicks > 0 && !this.winner(newBoard)){
            if(newBoard[i] === null && shipLoc.includes(i)) {
                numClicks --
                newBoard[i] = 'X'
                newBackground[i] = 'red'
                if(this.winner(newBoard)){
                    setTimeout(function() {alert("You win!")}, 250)
                }
            }else if(newBoard[i] === null){
                numClicks --
                newBoard[i] = 'O'
                newBackground[i] = 'blue'
                if(numClicks ===0) {
                    setTimeout(function() {alert("Out of torpedoes.. you lose!!  Click reset to try again..")}, 250)
                }
            }
        }
        this.setState({board: newBoard, background: newBackground, clicks: numClicks})
    }

    render(){
        const {board, background, clicks} = this.state
        return (
            <div>
                <div className = "Board">
                    {board.map((value, index)=>{
                    return <div className = "Squares">
                                {this.renderSquare(index)}
                           </div>
                    })}
                </div>
                <div>Torpedoes Remaining: {clicks}</div>
            </div>
        );
    }
}
