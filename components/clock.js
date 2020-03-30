import React from 'react';

export default class Clock {

  constructor() {
    // super(props);
    // this.state = {
    //   time: new Date()
    // };
    this.time = new Date()
    this.tick = this.tick.bind(this);
    setInterval(this.tick, 1000)
  }

  // componentDidMount() {
  //   this.intervalId = setInterval(this.tick, 1000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.intervalId);
  // }

  tick() {
    // this.setState({time: new Date()});
    this.time = new Date()
  }

  render() {

    let hours = this.time.getHours();
    let minutes = this.time.getMinutes();
    let seconds = this.time.getSeconds();

    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    const time = document.getElementById('time')
    time.innerHTML = `${hours}:${minutes}:${seconds}`
    const date = document.getElementById('date')
    date.innerHTML = `${this.time.toDateString()}`
    // return (
    //   <div className='clock'>
    //     <h1>Clock</h1>
    //     <div className='clock'>
    //       <p><span>
    //            Time:
    //          </span>
    //          <span>
    //            {hours}:{minutes}:{seconds} PDT
    //          </span>
    //       </p>
    //       <p>Date: {this.state.time.toDateString()}</p>
    //     </div>
    //   </div>
    // );
  }
};
