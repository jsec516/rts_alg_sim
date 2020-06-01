import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import edf from './chart/edf';

const resultMapper = {
    edf: edf
}
const Result = ({payload, algorithm}) => {
    const ResultPanel = resultMapper[algorithm];
    if(!ResultPanel) {
        return null;
    }
    return (
        <ResultPanel payload={payload} />
    );
  }
  
  export default Result
  