import React, { Component } from 'react';
import Squares from "./Squares"
import Boom from './boom.jpg'
import ScoreBoard from './ScoreBoard'

export default class Board extends Component {
    //initiate state with array to hold 100 null spots on board.
    constructor(props) {
        super(props)
        this.state = {
            board: Array(100).fill(null),
            background: Array(100).fill('aqua'),
            clicks: 25,
            hits: 0,
            shipLoc: [],
            wins: 0,
            attempts: 0
        }
    }

    componentDidMount = () => {
        this.newGame()
    }

    renderSquare = (i) => {
        return <Squares
                    value = {this.state.board[i]}
                    background = {this.state.background[i]}
                    index = {i}
                    handleClick = {this.handleClick}
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
        console.log(i)
        const board      = this.state.board.slice()
        const background = this.state.background
        let clicks     = this.state.clicks
        const shipLoc    = this.state.shipLoc
        let hits       = this.state.hits
        let wins       = this.state.wins
        let attempts   = this.state.attempts
        
        if(clicks > 0 && !this.winner(board)){
            if(board[i] === null && shipLoc.includes(i)) {
                clicks--
                hits++
                board[i] = 'X'
                background[i] = 'red'
                if(this.winner(board)){
                    wins++
                    attempts++
                    setTimeout(function() {alert("You win!")}, 250)
                } else if(clicks === 0){
                    setTimeout(function() {alert("Out of torpedoes.. you lose!!  Click reset to try again..")}, 250)
                    attempts++
                }
            }else if(board[i] === null){
                clicks --
                board[i] = 'O'
                background[i] = 'blue'
                if(clicks === 0) {
                    for(let j = 0; j < shipLoc.length; j++){
                        if(board[shipLoc[j]] === null){
                            board[shipLoc[j]] = 'S'
                            background[shipLoc[j]] = 'orange'
                        }
                    }
                    attempts++
                    setTimeout(function() {alert("Out of torpedoes.. you lose!!  Click reset to try again..")}, 250)
                }
            }
        }
        this.setState({board, background, clicks, hits, wins, attempts})
    }

    newGame = () => {
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
        const {board, clicks, hits, wins, attempts} = this.state
        console.log(this.state.shipLoc)
        return (
            <div>
                <div className = "Board">
                    {board.map((value, index)=>{
                    return <div className = "Squares">
                                {this.renderSquare(index)}
                           </div>
                    })}
                </div>
                <ScoreBoard 
                    wins = {wins}
                    attempts = {attempts}
                />
                <h2 className = "status">Torpedoes Remaining: {clicks}</h2>
                <h2 className = "status">Number of Hits: {hits}/5</h2>
                <button className = "NewGame" onClick = {this.newGame}>New Game!</button>
            </div>
        );
    }
}
