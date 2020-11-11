import React from 'react'

const Connection = props => {
    let sc, dw
    if(props.connected === true){
        sc = 'black'
        dw = '0'
    }else{
        sc = 'grey'
        dw = '4'
    }
    return (
        <div>
            <svg id={props.id} onClick={props.makeConnection} width="100" height="100">
                <line id={props.id} x1="0" y1="100" x2="100" y2="100" stroke={sc} strokeWidth="5" strokeDasharray={dw}/>
            </svg>
        </div>
    )
}

export default Connection