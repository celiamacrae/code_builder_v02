import React from 'react'

const Timer = props => {
    const seconds = props.seconds
    return (
      
        <div className='box'>
            <div id="control">
                <div className="inputGroup"> 
                    <input ref={props.secondsInput} type="number"  max={10} min={0} placeholder={10}  name="seconds"  onChange={props.inputHandler} />
                </div>
                <div id='timer_buttons'>
                    <button disabled={props.input !== true} onClick={props.startTimer} className="start">start</button>
                    <button disabled={props.input !== true} onClick={props.stopTimer}  className="stop">stop</button>
                    <button disabled={props.input !== true} onClick={props.resetTimer} className="reset">reset</button>
                </div>
            </div>
            {seconds < 10 ? (
                <h1 id='timer'>0:0{seconds}</h1>
            ): (
                <h1 id='timer'>0:{seconds}</h1>
            )}
        </div>
        
    )
}

export default Timer