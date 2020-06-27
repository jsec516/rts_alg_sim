import React from 'react';
import { Button, Form } from 'semantic-ui-react'

class TaskInput extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        taskId: null,
        exec: null,
        deadline: null, 
        simulationtime: null
    }
}


handleChange = (e, { name, value }) => this.setState({ [name]: value })

handleSubmit = () => {
    this.props.handler([this.state.taskId, this.state.exec, this.state.deadline]);
    // this.setState({
    //     taskId: null,
    //     exec: null,
    //     deadline: null
    // })
}


render() {
    const {taskId, exec, deadline} = this.state;
    return (
        
        <Form onSubmit={this.handleSubmit}>
            
            <Form.Group widths='equal'>
            <Form.Input type="number" id="period" fluid placeholder='Task ID' name='taskId'
            value={taskId}
            onChange={this.handleChange}/>
            <Form.Input type="number" fluid placeholder='Deadline' name='exec'
            value={exec}
            onChange={this.handleChange}/>
            <Form.Input type="number" fluid placeholder='Execution Time' name='deadline'
            value={deadline}
            onChange={this.handleChange}/>
            </Form.Group>
        
            <Button primary>Add to task-list</Button>
        </Form>
    )
}
}

export default TaskInput

