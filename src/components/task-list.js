import React from 'react';
import { Table, Label } from 'semantic-ui-react'

const TaskList = ({tasks, handler}) => (
    <Table celled>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Task ID</Table.HeaderCell>
            <Table.HeaderCell>Deadline</Table.HeaderCell>
            <Table.HeaderCell>Execution Time</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
            {tasks.map((item, index) => (
                <Table.Row key={index}>
                    <Table.Cell>{item[0]}</Table.Cell>
                    <Table.Cell>{item[1]}</Table.Cell>
                    <Table.Cell>{item[2]}</Table.Cell>
                    <Table.Cell><a href="" onClick={(e) => handler(e, index)}>Remove</a></Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
)
  
export default TaskList
  
