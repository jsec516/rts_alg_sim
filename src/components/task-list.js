import React from 'react';
import { Table, Label } from 'semantic-ui-react'

const TaskList = ({tasks, handler}) => (
    <Table celled>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Task ID</Table.HeaderCell>
            <Table.HeaderCell>Execution Time</Table.HeaderCell>
            <Table.HeaderCell>Deadline</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
            {tasks.map((item, index) => (
                <Table.Row key={index}>
                    <Table.Cell>{item.taskId}</Table.Cell>
                    <Table.Cell>{item.exec}</Table.Cell>
                    <Table.Cell>{item.deadline}</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
)
  
export default TaskList
  
