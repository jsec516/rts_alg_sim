import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import edf from './chart/edf';
import lst from './chart/lst';
import rms from './chart/rms';

const resultMapper = {
    edf: edf,
    lst: lst,
    rms: rms
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
  