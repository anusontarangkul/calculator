import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import Item from '@mui/material/Item';
import Display from '../Display/Display';
import ButtonCalc from '../ButtonCalc/ButtonCalc';

const CalculatorContainer = () => {
  const btnInfo = [
    {
      value: 'AC',
    },
    {
      value: '(',
    },
    {
      value: ')',
    },
    {
      value: '/',
    },
    {
      value: '7',
    },
    {
      value: '8',
    },
    {
      value: '9',
    },
    {
      value: '*',
    },
    {
      value: '4',
    },
    {
      value: '5',
    },
    {
      value: '6',
    },
    {
      value: '-',
    },
    {
      value: '1',
    },
    {
      value: '2',
    },
    {
      value: '3',
    },
    {
      value: '+',
    },
    {
      value: ')',
    },
    {
      value: '.',
    },
    {
      value: '+/-',
    },
    {
      value: '=',
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
      <Display />
      <Grid
        container
        spacing={5}
        sx={{
          marginTop: 1,
          justifyContent: 'center',
        }}
      >
        {btnInfo.map((btn) => {
          return (
            <Grid item key={btn.value}>
              <ButtonCalc btn={btn} key={btn.value} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CalculatorContainer;
