import './App.css';
import React from 'react'
import {Board, Card, Connection, Trigger, DebugOutput, Timer} from './components'


class App extends React.Component{

  constructor(){
    super()

    this.state = {
      c1 : {
        color:"grey",
        dashwidth:"4",
        connection: false,
      },
      c2 : {
        color:"grey",
        dashwidth:"4",
        connection: false,
      },
      position : {
        1 : 'trigger-card',
        2 : null,
        3 : null
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

    this.onChangeBoard = this.onChangeBoard.bind(this)
  }

  async onChangeBoard(board, card){
    let boardNum = parseInt(board[board.length-1])

    await this.setState({position : {...this.state.position, [boardNum] : card}})

    this.checkConnection() 
  }

  async checkConnection(){
    if(this.state.position[1] !== null && this.state.position[2] !== null){
      await this.setState({c1 : {...this.state.c1, connection: true}})
    }else{
      await this.setState({c1 : {...this.state.c1, connection: false}})
    }

    if(this.state.position[2] !== null && this.state.position[3] !== null){
      await this.setState({c2 : {...this.state.c2, connection: true}})
    }else{
      await this.setState({c2 : {...this.state.c2, connection: false}})
    }
  }

  async makeConnection(e){
    if(e.target.id === 'c1'){
      if(this.state.c1.connection === true && this.state.c1.color === "grey"){
        await this.setState({c1: {color:"black", dashwidth:"0"}})
      }else{
        await this.setState({c1: {color:"grey", dashwidth:"4"}})
      }
    }
    if(e.target.id === 'c2'){
      if(this.state.c1.connection === true && this.state.c2.color === "grey"){
        await this.setState({c2: {color:"black", dashwidth:"0"}})
      }else{
        await this.setState({c2: {color:"grey", dashwidth:"4"}})
      }
    }
  }

  inputHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  startTimer = () => {
    // if(this.state.triggerState && this.state.hasTimer){
      this.timer = setInterval(this.countDown, 1000);
    // }
  }

  countDown = async () => {
    const  { seconds } = this.state;

    if(seconds > 0) {
      await this.setState({seconds: seconds-1})

      // if(this.state.seconds === 0){
      //  this.timerOutput()
      // }  
    }
    else {
      clearInterval(this.timer);
    }
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
            <Card id='trigger-card' className='card' draggable='true'>
              <Trigger />
            </Card>
          </Board>

          <Connection id='c1' makeConnection={this.makeConnection} strokeColor={this.state.c1.color} dashwidth={this.state.c1.dashwidth}/>
     
          <Board id='board-2' className='board' onChangeBoard={this.onChangeBoard}/>
  
          <Connection id='c2' makeConnection={this.makeConnection} strokeColor={this.state.c2.color} dashwidth={this.state.c2.dashwidth} onClick={this.makeConnection}/>
     
          <Board id='board-3' className='board' onChangeBoard={this.onChangeBoard}/>
  
        </div>
  
        <div>
        <Board id='board-4' className='options-board' onChangeBoard={this.onChangeBoard}>
            <Card id='debug-card' className='card' draggable='true'>
              <DebugOutput />
            </Card>
  
            <Card id='timer-card' className='card' draggable='true'>
              <Timer secondsInput={this.secondsInput} startTimer={this.startTimer} inputHandler={this.inputHandler} seconds={this.state.seconds} stopTimer={this.stopTimer} resetTimer={this.resetTimer} triggerState={this.state.triggerState}/>
            </Card>
  
          </Board>
        </div>
  
  
      </div>
    );
  }
  
}

export default App;
