import React, {Component} from 'react'
import {Route, Switch} from "react-router-dom";
import Home from './screens/home/Home';

class App extends Component {

    constructor() {
        super();
        this.baseUrl = 'http://localhost:8080/api/'
    }

    render() {
        return (
            <div>
                <Home/>
            </div>
        )

    }
}

export default App;