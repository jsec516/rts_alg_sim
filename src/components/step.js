import React from 'react';
import { Card } from 'semantic-ui-react'

const Step = ({title, content, ...props}) => (
    <Card centered {...props}>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>
          {content}
        </Card.Description>
      </Card.Content>
    </Card>
  )
  
  export default Step
  