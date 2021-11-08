import React from 'react';
import Button from '@mui/material/Button';

const ButtonCalc = ({ btn, setDisplayValue, displayValue }) => {
  const handleBtnClick = () => {
    // cases for the different types of buttons when `=` is pressed
    // default is to append the value in button to display
    switch (btn.value) {
      case 'AC':
        setDisplayValue('');
        return;
      case '=':
        calculateNum(displayValue);
        return;
      case '^':
        consecutiveOperatorError(displayValue)
          ? setDisplayValue(displayValue)
          : setDisplayValue(displayValue + btn.value);
        return;
      case '+':
        consecutiveOperatorError(displayValue)
          ? setDisplayValue(displayValue)
          : setDisplayValue(displayValue + btn.value);
        return;
      case '-':
        consecutiveOperatorError(displayValue)
          ? setDisplayValue(displayValue)
          : setDisplayValue(displayValue + btn.value);
        return;
      case '*':
        consecutiveOperatorError(displayValue)
          ? setDisplayValue(displayValue)
          : setDisplayValue(displayValue + btn.value);
        return;
      case '/':
        consecutiveOperatorError(displayValue)
          ? setDisplayValue(displayValue)
          : setDisplayValue(displayValue + btn.value);
        return;
      case '.':
        consecutiveDecimalError(displayValue)
          ? setDisplayValue(displayValue)
          : setDisplayValue(displayValue + btn.value);
        return;
      default:
        setDisplayValue(displayValue + btn.value);
        return;
    }
  };

  const calculateNum = (expression) => {
    try {
      // replace ^ with **
      const updatedExpression = expression.replace('^', '**');

      // calulate the display value
      // eslint-disable-next-line no-new-func
      const evaluatedNum = new Function(
        `'use strict'; return (${updatedExpression})`
      )();
      setDisplayValue(evaluatedNum);
    } catch (error) {
      // if there is an error, display empty screen
      setDisplayValue('');
    }
  };

  // checks to see if previous character was a operator
  // prevents another operator to be entered consecutively.
  const consecutiveOperatorError = (expression) => {
    const lastChar = expression[expression.length - 1];
    if (
      lastChar === '/' ||
      lastChar === '*' ||
      lastChar === '+' ||
      lastChar === '-' ||
      lastChar === '^'
    ) {
      return true;
    } else {
      return false;
    }
  };

  // checks to see if previous character was a decimal
  // prevents another decimal to be entered consecutively.
  const consecutiveDecimalError = (expression) => {
    const lastChar = expression[expression.length - 1];
    return lastChar === '.';
  };

  return (
    <Button
      onClick={handleBtnClick}
      // render different design style for '=' button
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
