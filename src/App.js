import React, { Component } from 'react'
// import { Route, Switch } from "react-router-dom";

class App extends Component {

    constructor() {
        super();
        this.baseUrl = 'http://localhost:8080/api/'
    }

    render() {
        return (
            <div>
                Food Ordering App
            </div>
        )

    }
}

export default App;