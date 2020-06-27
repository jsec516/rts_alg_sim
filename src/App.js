import React from 'react';
import InputForm from './components/form';
import TaskInput from './components/task-input';
import Step from './components/step';
import './App.css';
import TaskList from './components/task-list';
import Result from './components/result';
import { Button } from 'semantic-ui-react';
import edf from './algorithms/edf';
import lst from './algorithms/lst';
import rms from './algorithms/rms';
import filter from 'lodash/filter';

const taskMapper = {
  'edf': edf,
  'lst': lst,
  'rms': rms,
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: null,
      tasks: [],
      result: {
        collector:{data: [],
        axis: []},
        collectormissed:{data: [],
          axis: []},
          collectorcomplete:{data: [],
            axis: []}
      },
      /*resultmissed: {
        datamissed: [],
        axismissed: []
      }*/
    };
    this.handleTaskRequest = this.handleTaskRequest.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
    this.updateAlg = this.updateAlg.bind(this);
  }

  handleTaskRequest(item) {
    console.log(item);
    this.setState({tasks: [...this.state.tasks, item]});
  }

  handleRemoveTask = (e, index) => {
    e.preventDefault();
    console.log(index);
    const results = filter(this.state.tasks, (item, currentIndex) => currentIndex !== index);
    this.setState({tasks: results});
  }

  updateAlg(e, item) {
    this.setState({algorithm: item.value});
  }

  updateResult = (result) => {
    this.setState({result});
  }
  /*updateResultMissed = (resultmissed) => {
    this.setState({resultmissed});
  }*/

  runSimulation(e) {
    e.preventDefault();
    const selectedAlg = taskMapper[this.state.algorithm];
    if(selectedAlg) {
      selectedAlg(this.state.tasks, this.updateResult);
      //selectedAlg(this.state.tasks, this.updateResultMissed);
    }
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid container">
        <div className="column ">
          <div className="steps"><Step title="which algorithm you want to simulate" content={<InputForm handler={this.updateAlg}/>} /></div>
          <div className="steps"><Step fluid title="Add Task" content={<TaskInput handler={this.handleTaskRequest} />} /></div>
          <div className="steps"><Step fluid title="Current Task List" content={<TaskList tasks={this.state.tasks} handler={this.handleRemoveTask} />} /></div>
          <div className="steps"><Button primary onClick={this.runSimulation}>{this.state.algorithm ? `Simulate ${this.state.algorithm} Algorithm`: `Select an algorithm`}</Button></div>
          <div className="result"><Step fluid title="Simulation Result Executed Tasks" content={<Result payload={this.state.result.collector} algorithm={this.state.algorithm}/>} /></div>
          <div className="result"><Step fluid title="Simulation Result Deadline Misses" content={<Result payload={this.state.result.collectormissed} algorithm={this.state.algorithm}/>} /></div>
          <div className="result"><Step fluid title="Simulation Deadline Completed Tasks" content={<Result payload={this.state.result.collectorcomplete} algorithm={this.state.algorithm}/>} /></div>
        </div>
      </div>
    );
  }
}

export default App;
