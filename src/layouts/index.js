// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import 'mdbreact/dist/css/mdb.css';

import React, {Component} from "react";
import {Row, Col} from 'antd';

import bg from '../../static/background.jpg'; // Use this for importing an image, the result is a string.

const bgstyle={
    background: `rgba(255,255,255,0) url(${bg}) 0 0/100% 100% no-repeat`,
    height: `100%`,
    backgroundBlendMode: 'multiply'
};

export default class BasicLayout extends Component{
    render(){
        return(
                <div>
                    <Row style={{marginTop: `2rem`}}>
                        <Col span={6}/>
                        <Col span={12} style={bgstyle}>
                            {this.props.children}
                        </Col>
                        <Col span={6}/>
                    </Row>
                </div>
        )
    }
}
