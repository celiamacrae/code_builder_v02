import React from 'react'

const Trigger = props => {
    return (

        <div className='box'>
            <label className="switch">
            <input type="checkbox" value={props.output} onChange={props.handleToggle}/>
            <span className="slider round"></span>
            </label>
        </div>

    )
}

export default Trigger