import React, {Component} from 'react'
import './Checkout.css'
import Header from '../../common/header/Header'

class Checkout extends Component{

    render(){
        return(
            <div>
                <Header showSearchBox={true}/>
            </div>
        )
    }
}
export default Checkout