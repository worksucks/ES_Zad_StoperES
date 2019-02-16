class Stopwatch extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
          running: false,
          times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
          }
      }
    }

    reset() {
      this.setState({times: {minutes: 0, seconds: 0, miliseconds: 0}});
    }


    format() {
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
      }

    start() {
    if (!this.state.running) {
        this.setState({running:true});
        this.watch = setInterval(() => this.step(), 10);
      }
    }

    step() {
    if (!this.state.running) return;
      this.calculate();
    }

    calculate() {
      let times = this.state.times;
      times.miliseconds += 1;
      if (times.miliseconds >= 100) {
        times.seconds += 1;
        times.miliseconds = 0;
      }
      if (times.seconds >= 60) {
        times.minutes += 1;
        times.seconds = 0;
      }
      this.setState({times:times})
    }

    stop() {
      this.setState({running:false});
        clearInterval(this.watch);
    }

    render() {
      return React.createElement('div', {},
       React.createElement('p', {}, this.format()),
       React.createElement('button', { onClick: () => this.start() }, 'start'),
       React.createElement('button', { onClick: () => this.stop() }, 'stop'),
       React.createElement('button', { onClick: () => this.reset() }, 'reset')
       );
    }
};

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));

function pad0(value) {
  let result = value.toString();
  if (result.length<2) {
    result = '0' + result;
  };
  return result;
}
