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
        setDisplayValue(displayValue + btn.value);
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

  const calculateOperator = (multiplySignIndex, expression, operator) => {
    console.log('index', multiplySignIndex);
    console.log('operator', operator);
    let beginningSum = 0;
    let endingSum = expression.length - 1;

    for (let i = multiplySignIndex + 1; i < expression.length; i++) {
      let currentChar = +expression[i];
      if (expression[i] === '-' && !isNaN(+expression[i + 1])) {
        for (let j = i + 1; j < expression.length; j++) {
          let currentChar = +expression[i];
          if (isNaN(currentChar)) {
            console.log(j);
            console.log('find end');
            console.log('endingSum', endingSum);
            endingSum = j - 2;
          }
        }
      } else if (isNaN(currentChar)) {
        // if(currentChar === '-' && isNaN(+expression[i+1]) && !isNaN(+expression[i+2]){
        //   endingSum =
        // }
        endingSum = i - 1;
      }
    }
    for (let i = multiplySignIndex - 1; i >= 0; i--) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        console.log('nan');
        console.log(currentChar);
        if (expression[i] === '-' && i === 0) {
          console.log('hit');
          beginningSum = i;
        } else {
          console.log('reg');
          beginningSum = i + 1;
        }
      }
    }
    let expressionCalc = expression.substring(beginningSum, endingSum + 1);
    console.log('expcalc', expressionCalc);
    let addExpression;
    let newSum;
    switch (operator) {
      case '+':
        addExpression = expressionCalc.split('+');
        console.log('add', addExpression);
        newSum = (+addExpression[0] + +addExpression[1]).toString();
        break;
      case '-':
        if (expressionCalc.includes('--')) {
          console.log('double');
          addExpression = expressionCalc.split('--');
          console.log(addExpression);
          newSum = (+addExpression[0] + +addExpression[1]).toString();
        } else {
          addExpression = expressionCalc.split('-');

          if (addExpression.length === 3) {
            console.log('splitting');
            newSum = (+addExpression[1] * -1 - +addExpression[2]).toString();
          } else {
            console.log(addExpression);
            newSum = (+addExpression[0] - +addExpression[1]).toString();
          }
        }

        break;
      case '*':
        addExpression = expressionCalc.split('*');
        newSum = (+addExpression[0] * +addExpression[1]).toString();
        break;
      case '/':
        addExpression = expressionCalc.split('/');
        newSum = (+addExpression[0] / +addExpression[1]).toString();
        break;
      case '^':
        addExpression = expressionCalc.split('^');
        newSum = ((+addExpression[0]) ** +addExpression[1]).toString();
        break;
      default:
        break;
    }
    let substituteExpression = expression.replace(expressionCalc, newSum);
    return substituteExpression;
  };

  const calculate4th = (expression) => {
    let openingParenArray = [];
    let closingParen;
    let openingParen;
    let existsOpeningParen = false;
    let existsClosingParen = false;
    for (let i = 0; i < expression.length; i++) {
      let num = expression[i];
      switch (num) {
        case '(':
          openingParenArray.push(i);
          existsOpeningParen = true;
          break;
        case ')':
          closingParen = i;
          openingParen = openingParenArray[openingParenArray.length - 1];

          existsClosingParen = true;
          if (openingParenArray.length > 0) {
            let expressionSub = expression.substring(
              openingParen,
              closingParen + 1
            );
            let expressionCalc = expression.substring(
              openingParen + 1,
              closingParen
            );
            const exponentCalculated = calculate3rd(expressionCalc);
            const multiplyCaluclated = calculate2nd(exponentCalculated);
            const calculated = calculateNum(multiplyCaluclated);
            expression = expression.replace(expressionSub, calculated);
            openingParenArray.pop();
          }
      }
    }
    if (existsOpeningParen && existsClosingParen) {
      return calculate4th(expression);
    } else {
      return expression;
    }
  };

  const calculate3rd = (expression) => {
    let changes = false;
    for (let i = 0; i < expression.length; i++) {
      let num = expression[i];
      switch (num) {
        case '^':
          expression = calculateOperator(i, expression, '^');
          changes = true;
          break;
        default:
          break;
      }
    }
    if (changes) {
      return calculate3rd(expression);
    } else {
      return expression;
    }
  };

  const calculate2nd = (expression) => {
    let changes = false;
    for (let i = 0; i < expression.length; i++) {
      let num = expression[i];
      switch (num) {
        case '*':
          expression = calculateOperator(i, expression, '*');
          console.log('new exp before rec', expression);
          changes = true;
          break;
        case '/':
          expression = calculateOperator(i, expression, '/');
          console.log('new exp before rec', expression);
          changes = true;
          break;
        default:
          break;
      }
    }
    if (changes) {
      return calculate2nd(expression);
    } else {
      return expression;
    }
  };

  const calculateNum = (expression) => {
    let changes = false;
    try {
      for (let i = 0; i < expression.length; i++) {
        let num = expression[i];
        switch (num) {
          case '+':
            expression = calculateOperator(i, expression, '+');
            console.log('new exp before rec', expression);
            changes = true;
            break;
          case '-':
            console.log('minus');
            // does not contain
            let addExpression = expression.split('-');
            console.log('add', addExpression);

            if (
              (typeof +expression[i - 1] === 'number' &&
                typeof +expression[i + 1] === 'number') ||
              (typeof +expression[i - 1] === 'number' &&
                typeof +expression[i + 2] === 'number')
            ) {
              if (i === 0) {
                console.log('break i = 0');
                break;
              } else {
                expression = calculateOperator(i, expression, '-');
                changes = true;
              }
            }
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
    } catch (error) {
      console.log(error);
    }
  };
  // const turnNegative = (negativeIndex, expression) => {
  //   let endingNegativeNum = expression.length - 1;
  //   for (let i = 0; i++; i < expression.legnth) {
  //     let currentChar = +expression[i];
  //     if (isNaN(currentChar)) {
  //       endingNegativeNum = i - 1;
  //     }
  //   }
  //   let expressionCalc = expression.substring(0, endingNegativeNum + 1);
  //   console.log('exp', expressionCalc);
  //   let addExpression;
  //   let newSum;
  //   addExpression = expressionCalc.split('-');
  //   newSum = +addExpression[0] * -1;
  //   console.log('newSum', newSum);
  //   let substituteExpression = expression.replace(expressionCalc, newSum);

  //   return substituteExpression;
  // };

  const showNum = (expression) => {
    const parenCalculated = calculate4th(expression);
    const exponentCalculated = calculate3rd(parenCalculated);
    const multiplyCaluclated = calculate2nd(exponentCalculated);
    const calculated = calculateNum(multiplyCaluclated);
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
      // lastChar === '-' ||
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
