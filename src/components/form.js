import React from 'react';
import { Button, Form } from 'semantic-ui-react'
const options = [
    { key: 'edf', text: 'Earliest Deadline First', value: 'edf' },
    { key: 'rms', text: 'Rate-Monotonic Scheduling', value: 'rms' },
    { key: 'lst', text: 'Least Slack Time', value: 'lst' },
];

const InputForm = ({handler}) => (
    <Form>
        <Form.Field>
            <Form.Select
                options={options}
                placeholder='Select'
                onChange={handler}
            />
        </Form.Field>
    </Form>
  )
  
  export default InputForm
  