import React from 'react';

const Line = ({up = 0, down = 0, col = 'black'}) => {
    const dividerStyle = {
        height: '3px',
        width: '100%',
        backgroundColor: `${col}`,
        marginTop: `-${up}px`,
        marginBottom: `-${down}px`
    }
    return <div style={dividerStyle}></div>; 
};
    

export default Line;