import React from 'react'

const DebugOutput = props => {
    return (
        <div className='box'>
            {props.input === null ? 
                (<p>Debug Output</p>) : 
            (props.input ? (<p>True</p>) : (<p>False</p>))}
        </div>  
    )
}

export default DebugOutput