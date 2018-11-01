import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, {Component} from "react";
import bg from '../../static/background.jpg';

const bgstyle={
    background: `rgba(255,255,255,0) url(${bg}) 0 0/100% 100% no-repeat`,
    height: `50rem`
};

export default class BasicLayout extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6" style={bgstyle}>
                        {this.props.children}
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        )
    }
}
