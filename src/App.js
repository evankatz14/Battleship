import React, { Component } from 'react';
import './App.css';
import Board from './Board'

class App extends Component {
    //initiate state with array to hold 100 null spots on board.
    render(){

        return (
            <div>
                <h2 className = "Header">Battleship! Find the Ships</h2>
                <div className="App">
                    <Board />
                </div>
            </div>
        );
    }
}

export default App;
