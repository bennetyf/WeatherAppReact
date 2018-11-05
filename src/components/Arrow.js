import leftarrow from '../../static/leftArrow.png';
import rightarrow from '../../static/rightArrow.png';
import React from "react";


export const Arrow = (props) => {
    if (props.direction === 'left') {
        return (
            <div className='d-flex flex-column align-items-center justify-content-center h-100'>
                <img onClick={() => props.changeCity(props.cityId)} src={leftarrow}
                     style={{width: `100%`, display: `block`}}/>
            </div>);
    }
    if (props.direction === 'right'){
        return (
            <div className='d-flex flex-column align-items-center justify-content-center h-100'>
                <img onClick={() => props.changeCity(props.cityId)} src={rightarrow}
                     style={{width: `100%`, display: `block`}}/>
            </div>);
    }
};