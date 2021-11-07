import React, { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import Item from '@mui/material/Item';
import Display from '../Display/Display';
import ButtonCalc from '../ButtonCalc/ButtonCalc';

const CalculatorContainer = () => {
  // state
  const [displayValue, setDisplayValue] = useState('');

  const btnInfo = [
    {
      value: 'AC',
      type: 'clear-function',
    },
    {
      value: '(',
      type: 'open-parentheses',
    },
    {
      value: ')',
      type: 'close-parentheses',
    },
    {
      value: '/',
      type: 'operator',
    },
    {
      value: '7',
      type: 'number',
    },
    {
      value: '8',
      type: 'number',
    },
    {
      value: '9',
      type: 'number',
    },
    {
      value: '*',
      type: 'operator',
    },
    {
      value: '4',
      type: 'number',
    },
    {
      value: '5',
      type: 'number',
    },
    {
      value: '6',
      type: 'number',
    },
    {
      value: '-',
      type: 'operator',
    },
    {
      value: '1',
      type: 'number',
    },
    {
      value: '2',
      type: 'number',
    },
    {
      value: '3',
      type: 'number',
    },
    {
      value: '+',
      type: 'operator',
    },
    {
      value: '0',
      type: 'number',
    },
    {
      value: '.',
      type: 'decimal',
    },
    {
      value: '^',
      type: 'number',
    },
    {
      value: '=',
      type: 'number',
    },
  ];

  return (
    <Container
      sx={{
        height: '950px',
        width: '600px',
        borderRadius: 5,
        border: '4px solid black',
        boxShadow: 6,
        marginTop: 10,
      }}
    >
      <Display displayValue={displayValue} setDisplayValue={setDisplayValue} />
      <Grid
        container
        spacing={5}
        sx={{
          marginTop: 1,
          justifyContent: 'center',
        }}
      >
        {btnInfo.map((btn, idx) => {
          return (
            <Grid item key={idx}>
              <ButtonCalc
                btn={btn}
                displayValue={displayValue}
                setDisplayValue={setDisplayValue}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CalculatorContainer;
