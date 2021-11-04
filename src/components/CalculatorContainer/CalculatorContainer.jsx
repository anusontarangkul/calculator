import React from 'react';
import './CalculatorContainer.scss';
import Container from '@mui/material/Container';

const CalculatorContainer = () => {
  return (
    <Container
      sx={{
        height: '90vh',
        width: '70%',
        marginTop: 5,
        borderRadius: 5,
        border: '4px solid #255585',
        boxShadow: 6,
      }}
    ></Container>
  );
};

export default CalculatorContainer;
