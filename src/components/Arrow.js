import leftarrow from '../../static/leftArrow.png';
import rightarrow from '../../static/rightArrow.png';
import React from "react";

export const Arrow = (props) => {
    if (props.direction === 'left') {
        return <img onClick={() => props.changeCity(props.cityId)} src={leftarrow}/>
    }
    if (props.direction === 'right'){
        return <img onClick={() => props.changeCity(props.cityId)} src={rightarrow}/>
    }
};