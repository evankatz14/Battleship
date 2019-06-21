import React, { Component } from 'react';
import './App.css';
import Board from './Board'

class App extends Component {
    //initiate state with array to hold 100 null spots on board.
    render(){

        return (
            <div className="App">
                <Board />
            </div>
        );
    }
}

export default App;
