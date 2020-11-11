import React from 'react'

const Trigger = props => {
    return (
        // props.hasTrigger ? (
            <div className='box-container'>
                <div className='box'>
                    <label className="switch">
                    <input type="checkbox" value={props.triggerState} onChange={props.handleToggle}/>
                    <span className="slider round"></span>
                    </label>
                </div>
            </div>
       
        // ) : (<p>Trigger</p>)
    )
}

export default Trigger