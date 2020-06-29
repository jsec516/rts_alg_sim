import React from 'react';
import { Form } from 'semantic-ui-react'

const InputForm = ({handler}) => (
    <Form>
        <Form.Field>
            <Form.Input
                placeholder='Simulation Time'
                onChange={handler}
            />
        </Form.Field>
    </Form>
  )
  
  export default InputForm
  