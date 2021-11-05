import React from 'react';
import './CalculatorContainer.scss';
import Container from '@mui/material/Container';
import Display from '../Display/Display';

const CalculatorContainer = () => {
  return (
    <Container
      sx={{
        height: '90vh',
        width: '70%',
        marginTop: 5,
        borderRadius: 5,
        border: '4px solid black',
        boxShadow: 6,
      }}
    >
      <Display />
    </Container>
  );
};

export default CalculatorContainer;
