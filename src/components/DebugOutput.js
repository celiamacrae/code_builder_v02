import React from 'react'

const DebugOutput = props => {
    return (
        <div className='box'>
            <p>True</p>
        </div>  
    )
    // return (
    //     props.hasDebug ? (
    //         <div className='box-container'>
    //             <ConnectLine color={props.c3 ? 'green' : 'red'}/>
    //             <div className='box'>
    //         {props.hasTimer ? 
    //             (props.timerState === true ? (<h1>True </h1>) : (<h1>False</h1>)
    //         ) :
    //         props.triggerState === true ? (<h1>True</h1>) : (<h1>False</h1>)
    //         }
    //     </div>
    //         </div>
    //      ) : (<p>Debug Output</p>)
    // )
}

export default DebugOutput