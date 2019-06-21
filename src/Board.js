import React, { Component } from 'react';
import Squares from "./Squares"

export default class Board extends Component {
    //initiate state with array to hold 100 null spots on board.
    constructor(props) {
        super(props)
        this.state = {
            board: Array(100).fill(null),
            background: Array(100).fill('aqua'),
            clicks: 25,
            hits: 0,
            shipLoc: Array.from({length:5}, () =>
            Math.floor(Math.random() * 100))
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
        const winningCom = board.filter((value, index) => value === 'X')
        if(winningCom.length === this.state.shipLoc.length){
            return true
        }
        return null
    }

    handleClick = (i) => {
        console.log(this.state.shipLoc)
        const newBoard    = this.state.board.slice()
        let newBackground = this.state.background
        let numClicks     = this.state.clicks
        const shipLoc     = this.state.shipLoc
        let hits = this.state.hits
        if(numClicks > 0 && !this.winner(newBoard)){
            if(newBoard[i] === null && shipLoc.includes(i)) {
                numClicks--
                hits++
                newBoard[i] = 'X'
                newBackground[i] = 'red'
                if(this.winner(newBoard)){
                    setTimeout(function() {alert("You win!")}, 250)
                } else if(numClicks === 0){
                    setTimeout(function() {alert("Out of torpedoes.. you lose!!  Click reset to try again..")}, 250)
                }
            }else if(newBoard[i] === null){
                numClicks --
                newBoard[i] = 'O'
                newBackground[i] = 'blue'
                if(numClicks === 0) {
                    for(let j = 0; j < shipLoc.length; j++){
                        if(newBoard[shipLoc[j]] === null){
                            newBoard[shipLoc[j]] = 'S'
                            newBackground[shipLoc[j]] = 'orange'
                        }
                    }
                    setTimeout(function() {alert("Out of torpedoes.. you lose!!  Click reset to try again..")}, 250)
                }
            }
        }
        this.setState({board: newBoard, background: newBackground, clicks: numClicks, hits})
    }

    placeShips = () => {
        let shipLoc = []
        let board = Array(100).fill(null)
        let background = Array(100).fill('aqua')
        let clicks = 25
        let newNum = 0
        let hits = 0

        for(let i = 0; i < 5; i++){
            newNum = Math.floor(Math.random() * 100)
            if(!shipLoc.includes(newNum)){
                shipLoc.push(newNum)
            }
        }
        this.setState({board, background, clicks, hits, shipLoc})
    }

    render(){
        const {board, background, clicks, hits} = this.state
        return (
            <div>
                <div className = "Board">
                    {board.map((value, index)=>{
                    return <div className = "Squares">
                                {this.renderSquare(index)}
                           </div>
                    })}
                </div>
                <div className = "status">Torpedoes Remaining: {clicks}</div>
                <div className = "status">Number of Hits: {hits}/5</div>
                <button className = "NewGame" onClick = {this.placeShips}>New Game!</button>
            </div>
        );
    }
}
