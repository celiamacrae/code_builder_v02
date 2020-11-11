import React from 'react'

const Connection = props => {
    return (
        <div>
            <svg id={props.id} onClick={props.makeConnection} width="100" height="100">
                <line id={props.id} x1="0" y1="100" x2="100" y2="100" stroke={props.strokeColor} strokeWidth="5" strokeDasharray={props.dashwidth}/>
            </svg>
        </div>
    )
}

export default Connection