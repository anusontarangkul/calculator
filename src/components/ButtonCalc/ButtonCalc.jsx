import React from 'react';
import Button from '@mui/material/Button';

const ButtonCalc = ({ btn, setDisplayValue, displayValue }) => {
  const handleBtnClick = () => {
    if (btn.value === 'AC') {
      setDisplayValue('');
      return;
    }
    if (btn.value === '=') {
      calculateNum(displayValue);
      return;
    }

    setDisplayValue(displayValue + btn.value);
  };

  const calculateNum = (expression) => {
    const evaluatedNum = Function(`'use strict'; return (${expression})`)();
    setDisplayValue(evaluatedNum);
  };

  return (
    <Button
      onClick={handleBtnClick}
      data-testid={btn.value}
      //   variant='outlined'
      sx={{
        minHeight: 95,
        minWidth: 95,
        borderRadius: btn.value === '=' ? '0' : '50%',
        fontSize: 30,
        color: 'black',
        border: btn.value === '=' ? '2px solid black' : '2px solid #6CC3F7',
        background: btn.value === '=' ? '#6CC3F7' : 'white',
      }}
    >
      {btn.value}
    </Button>
  );
};

export default ButtonCalc;
