import React, {Component} from 'react';
import Header from '../../common/header/Header'
import "./Home.css";

class Home extends Component{

    render(){
        return(
            <div>
                <Header showSearchBox={true}/>
            </div>
        );
    }
}

export default Home;