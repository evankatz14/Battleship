import React, { Component } from 'react';


export default class Squares extends Component {

    render(){
        return (
            <a
                className = "Button"
                style={{backgroundColor: this.props.background}}
                onClick = {() => this.props.handleClick()}>
                {this.props.value}
            </a>
        );
    }
}
