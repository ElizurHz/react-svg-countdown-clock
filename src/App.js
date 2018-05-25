import React, { Component } from 'react';
import CountdownClock from './CountdownClock';

const TOTAL_TIME = 5;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: TOTAL_TIME,
      totalTime: TOTAL_TIME,
      isCountingDown: false,
      isPasued: false,
    };
  }
  startCountdown = () => {
    if (!window.countdown) {
      this.setState({
        isCountingDown: true,
      });
      window.countdown = setInterval(() => {
        this.setState({
          timeout: this.state.timeout - 1,
        });
        if (this.state.timeout === 0) {
          clearInterval(window.countdown);
        }
      }, 1000);
    } else {
      return false;
    }
  }
  pauseCountdown = () => {
    if (window.countdown) {
      clearInterval(window.countdown);
      this.setState({
        isPasued: true,
      })
    } else {
      return false;
    }
  }
  resumeCountdown = () => {
    if (window.countdown) {
      this.setState({
        isPasued: false,
      });
      window.countdown = setInterval(() => {
        this.setState({
          timeout: this.state.timeout - 1,
        })
        if (this.state.timeout === 0) {
          clearInterval(window.countdown);
        }
      }, 1000);
    } else {
      return false;
    }
  }
  endCountdown = () => {
    if (window.countdown) {
      clearInterval(window.countdown);
      window.countdown = null;
      this.setState({
        timeout: TOTAL_TIME,
        isCountingDown: false,
        isPasued: false,
      })
    } else {
      return false;
    }
  }
  render() {
    const {
      timeout,
      totalTime,
      isPasued,
      isCountingDown
    } = this.state;
    return (
      <div className="App">
        {/* <CountdownClock
          width={114}
          height={114}
          radius={49}
          timeout={timeout}
          totalTime={totalTime}
          lineWidth={6}
          dotInnerStrokeWidth={8}
          dotOuterStrokeWidth={14}
          passedColor="#eee"
          remainingColor="#ff6379"
          dotOuterColor="#ffb1bc"
          fontSize={22}
          textDy=".4em"
        /> */}
        <CountdownClock
          width={200}
          height={200}
          radius={80}
          timeout={timeout}
          totalTime={totalTime}
          lineWidth={6}
          dotInnerStrokeWidth={8}
          dotOuterStrokeWidth={14}
          passedColor="#eee"
          remainingColor="#ff6379"
          dotInnerColor="#ff6379"
          dotOuterColor="#ffb1bc"
          fontSize={32}
          textDy=".4em"
        />
        <button onClick={this.startCountdown}>开始</button>
        {
          isCountingDown &&
            <button
              onClick={isPasued ? this.resumeCountdown : this.pauseCountdown}
            >
              {
                isPasued ?
                  '继续' :
                  '暂停'
              }
            </button>
        }
        <button onClick={this.endCountdown}>
          {
            this.state.timeout === 0 ?
              '复原' :
              '结束'
          }
        </button>
      </div>
    );
  }
}

export default App;
