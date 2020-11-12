import './App.css';
import React from 'react'
import {Board, Card, Connection, Trigger, DebugOutput, Timer} from './components'


class App extends React.Component{

  constructor(){
    super()

    this.state = {
      c1 : {
        canConnect : false,
        connected: false,
      },
      c2 : {
        canConnect: false,
        connected: false,
      },
      position : {
        1 : 'trigger-card',
        2 : null,
        3 : null
      },
      trigger : {
        output : false
      },
      debug : {
        input: null
      },
      timer: {
        input: null,
        output : false
      },
      
      seconds : 10
      
    }

    this.secondsInput = React.createRef();

    this.makeConnection = this.makeConnection.bind(this)
    this.inputHandler = this.inputHandler.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.countDown = this.countDown.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.changeTimerOutput = this.changeTimerOutput.bind(this)
    this.timerFalse = this.timerFalse.bind(this)

    this.onChangeBoard = this.onChangeBoard.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleConnection = this.handleConnection.bind(this)
  }

  async onChangeBoard(board, card){
    let boardNum = parseInt(board[board.length-1])

    await this.setState({position : {...this.state.position, [boardNum] : card}})

    if(card ==='debug-card'){
      await this.setState({debug: {...this.state.debug, input: null}})
      if(this.state.position[2] === 'debug-card' && boardNum !== 2){
        await this.setState({position : {...this.state.position, 2: null}})
      }
      if(this.state.position[3] === 'debug-card' && boardNum !== 3){
        await this.setState({position : {...this.state.position, 3: null}})
      }
    }

    if(card === 'timer-card'){
      if(this.state.position[2] === 'timer-card' && boardNum !== 2){
        await this.setState({position : {...this.state.position, 2: null}})
      }
      if(this.state.position[3] === 'timer-card' && boardNum !== 3){
        await this.setState({position : {...this.state.position, 3: null}})
      }

    }

    this.checkConnection() 
  }

  async handleToggle(){
    let newTriggerOutput = !this.state.trigger.output
    await this.setState({trigger: {...this.state.trigger, output : newTriggerOutput}})
    this.handleConnection()

    if(this.state.timer.input === true){
      this.startTimer()
    }
    if(this.state.timer.input === false){
      this.stopTimer()
      this.resetTimer()
    }
  }

  async checkConnection(){
    if(this.state.position[1] !== null && this.state.position[2] !== null){
      await this.setState({c1 : {...this.state.c1, canConnect: true}})
    }else{
      await this.setState({c1 : {...this.state.c1, canConnect: false, connected: false}})
    }

    if(this.state.position[2] !== null && this.state.position[3] !== null){
      await this.setState({c2 : {...this.state.c2, canConnect: true}})
    }else{
      await this.setState({c2 : {...this.state.c2, canConnect: false, connected: false}})
    }

    this.handleConnection()
  }

  async makeConnection(e){
    if(e.target.id === 'c1'){
      if(this.state.c1.canConnect === true && this.state.c1.connected === false){
        await this.setState({c1: {...this.state.c1, connected: true}})
      }else{
        await this.setState({c1: {...this.state.c1, connected: false}})
      }
    }
    if(e.target.id === 'c2'){
      if(this.state.c1.canConnect === true && this.state.c2.connected === false){
        await this.setState({c2: {...this.state.c2, connected: true}})
      }else{
        await this.setState({c2: {...this.state.c2, connected: false}})
      }
    }
    this.handleConnection()
  }

  async handleConnection(){
    if(this.state.position[2] === 'debug-card' && this.state.c1.connected === true){
        await this.setState({debug : {...this.state.debug, input: this.state.trigger.output}})
    }
    if(this.state.position[2] === 'debug-card' && this.state.c1.connected === false){
      await this.setState({debug : {...this.state.debug, input: null}})
    }
    if(this.state.position[2] === 'timer-card' && this.state.c1.connected === true){
      await this.setState({timer : {...this.state.timer, input : this.state.trigger.output}})
    }
    if(this.state.position[2] === 'timer-card' && this.state.c1.connected === false){
      await this.setState({timer : {...this.state.timer, input: null, output: false}})
    }
    if(this.state.position[3] === 'timer-card'){
      await this.setState({timer : {...this.state.timer, input: null}})
    }
    if(this.state.position[3] === 'debug-card' && this.state.position[2] === null){
      await this.setState({debug: {... this.state.debug, input: null}})
    }
    if(this.state.position[2] === 'timer-card' && this.state.position[3] === 'debug-card' && this.state.c2.connected){
      await this.setState({debug : {...this.state.debug, input: this.state.timer.output}})
    }
    if(this.state.position[2] === 'timer-card' && this.state.position[3] === 'debug-card' && this.state.c2.connected === false){
      await this.setState({debug : {...this.state.debug, input: null}})
    }
  }

  inputHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  startTimer = () => {
    if(this.state.timer.input === true){
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = async () => {
    const  { seconds } = this.state;

    if(seconds > 0) {
      await this.setState({seconds: seconds-1})

      if(this.state.seconds === 0){
       this.changeTimerOutput()
      }  
    }
    else {
      clearInterval(this.timer);
    }
  }

  async changeTimerOutput(){
    await this.setState({timer: {...this.state.timer, output: true}})
    await this.handleConnection()
    this.timerTrue = setInterval(this.timerFalse, 1000);
  }

  async timerFalse(){
    await this.setState({timer: {...this.state.timer, output: false}})
    this.handleConnection()
    clearInterval(this.timerTrue)
  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState({
      seconds: 10
    });
    this.secondsInput.current.value = 10;
  }

  render(){
    return (
      <div className="App">
        <div id='code-builder'>

          <Board id='board-1' className='board' onChangeBoard={this.onChangeBoard}>
            <Card id='trigger-card' className='card' draggable='false'>
              <Trigger output={this.state.trigger.output} handleToggle={this.handleToggle}/>
            </Card>
          </Board>

          <Connection id='c1' makeConnection={this.makeConnection} connected={this.state.c1.connected}/>
     
          <Board id='board-2' className='board' onChangeBoard={this.onChangeBoard}/>
  
          <Connection id='c2' makeConnection={this.makeConnection} connected={this.state.c2.connected}/>
     
          <Board id='board-3' className='board' onChangeBoard={this.onChangeBoard}/>
  
        </div>
  
        <div>
        <Board id='board-4' className='options-board' onChangeBoard={this.onChangeBoard}>
            <Card id='timer-card' className='card' draggable='true'>
              <Timer input={this.state.timer.input} secondsInput={this.secondsInput} startTimer={this.startTimer} inputHandler={this.inputHandler} seconds={this.state.seconds} stopTimer={this.stopTimer} resetTimer={this.resetTimer} triggerState={this.state.triggerState}/>
            </Card>

            <Card id='debug-card' className='card' draggable='true'>
              <DebugOutput input={this.state.debug.input}/>
            </Card>
          </Board>
        </div>
  
      </div>
    );
  }
  
}

export default App;
