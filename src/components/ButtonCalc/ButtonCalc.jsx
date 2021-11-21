import React from 'react';
import Button from '@mui/material/Button';

const ButtonCalc = ({ btn, setDisplayValue, displayValue }) => {
  const mapExpression = new Map();
  mapExpression.set('1', 1);
  mapExpression.set('2', 2);
  mapExpression.set('3', 3);
  mapExpression.set('4', 4);
  mapExpression.set('5', 5);
  mapExpression.set('6', 6);
  mapExpression.set('7', 7);
  mapExpression.set('8', 8);
  mapExpression.set('9', 9);
  mapExpression.set('0', 0);

  const handleBtnClick = () => {
    // cases for the different types of buttons when `=` is pressed
    // default is to append the value in button to display
    switch (btn.value) {
      case 'AC':
        setDisplayValue('');
        return;
      case '=':
        showNum(displayValue);
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

  const calculateSum = (plusSign, expression) => {
    let beginningSum = 0;
    let endingSum = expression.length - 1;
    // console.log('starting endsum', endingSum);
    // console.log('expression', expression);
    // console.log('plus', plusSign);

    for (let i = plusSign + 1; i < expression.length; i++) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        endingSum = i - 1;
        // console.log('endingSum', endingSum);
      }
    }
    for (let i = plusSign - 1; i >= 0; i--) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        beginningSum = i + 1;
        // console.log('begSum', beginningSum);
      }
    }
    let expressionCalc = expression.substring(beginningSum, endingSum + 1);
    // console.log('expression', expressionCalc);
    let addExpression = expression.split('+');
    let newSum = (+addExpression[0] + +addExpression[1]).toString();
    console.log('newSum', newSum);
    let substituteExpression = expression.replace(expressionCalc, newSum);
    console.log('exp being sub', expressionCalc);
    console.log('sub', substituteExpression);

    return substituteExpression;
    // console.log('return exp', expression);
  };

  // const iterator = (newExpression) => {
  //   for (let i = 0; i < newExpression.length; i++) {
  //     let num = expression[i];
  //     switch (num) {
  //       case '+':
  //         newExpression = calculateSum(i, expression);
  //         return calculateNum(newExpression);

  //         // calculateNum(expression);
  //         // let addExpression = expression.split('+');
  //         // newSum = +addExpression[0] + +addExpression[1];
  //         break;
  //       case '-':
  //         let minusExpression = expression.split('-');
  //         // newSum = +minusExpression[0] - +minusExpression[1];
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //   return newExpression;
  // };

  const calculateNum = (expression) => {
    let changes = false;
    try {
      for (let i = 0; i < expression.length; i++) {
        let num = expression[i];
        switch (num) {
          case '+':
            expression = calculateSum(i, expression);
            console.log('new exp before rec', expression);
            // calculateNum(expression);
            changes = true;

            // calculateNum(expression);
            // let addExpression = expression.split('+');
            // newSum = +addExpression[0] + +addExpression[1];
            break;
          case '-':
            let minusExpression = expression.split('-');
            // newSum = +minusExpression[0] - +minusExpression[1];
            break;
          default:
            break;
        }
      }
      if (changes) {
        return calculateNum(expression);
      } else {
        return expression;
      }
      // return changes ? calculateNum(expression) : changes;
      // console.log(newSum);
      // replace ^ with **
      // const updatedExpression = expression.replace('^', '**');

      // // calulate the display value
      // // eslint-disable-next-line no-new-func
      // const evaluatedNum = new Function(
      //   `'use strict'; return (${updatedExpression})`
      // )();
    } catch (error) {
      // if there is an error, display empty screen
      // setDisplayValue('');
      console.log(error);
    }
    // return expression;
    // console.log('display', expression);
    // setDisplayValue(expression);
  };

  const showNum = (expression) => {
    const calculated = calculateNum(expression);
    console.log('going to display', calculated);
    setDisplayValue(calculated);
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
