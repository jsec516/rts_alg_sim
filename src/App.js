import React from 'react';
import InputForm from './components/form';
import TaskInput from './components/task-input';
import Step from './components/step';
import './App.css';
import TaskList from './components/task-list';
import Result from './components/result';
import { Button } from 'semantic-ui-react';
import edf from './algorithms/edf';

const taskMapper = {
  'edf': edf
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: null,
      tasks: [],
      result: []
    };
    this.handleTaskRequest = this.handleTaskRequest.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
    this.updateAlg = this.updateAlg.bind(this);
  }

  handleTaskRequest(item) {
    console.log(item);
    this.setState({tasks: [...this.state.tasks, item]});
  }

  updateAlg(e, item) {
    this.setState({algorithm: item.value});
  }

  runSimulation(e) {
    e.preventDefault();
    const selectedAlg = taskMapper[this.state.algorithm];
    if(selectedAlg) {
      selectedAlg(this.state.tasks);
    }
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid container">
        <div className="column ">
          <div className="steps"><Step title="which algorithm you want to simulate" content={<InputForm handler={this.updateAlg}/>} /></div>
          <div className="steps"><Step fluid title="Add Task" content={<TaskInput handler={this.handleTaskRequest} />} /></div>
          <div className="steps"><Step fluid title="Current Task List" content={<TaskList tasks={this.state.tasks} />} /></div>
          <div className="steps"><Button primary onClick={this.runSimulation}>{this.state.algorithm ? `Simulate ${this.state.algorithm} Algorithm`: `Select an algorithm`}</Button></div>
          <div className="result"><Step fluid title="Simulation Result" content={<Result result={this.state.result}/>} /></div>
        </div>
      </div>
    );
  }
}

export default App;
