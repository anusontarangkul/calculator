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
    let beginningSum = 0;
    let endingSum = expression.length - 1;

    for (let i = multiplySignIndex + 1; i < expression.length; i++) {
      let currentChar = +expression[i];
      if (expression[i] === '-' && !isNaN(+expression[i + 1])) {
        for (let j = i + 1; j < expression.length; j++) {
          let currentChar = +expression[i];
          if (isNaN(currentChar)) {
            endingSum = j - 2;
          }
        }
      } else if (isNaN(currentChar)) {
        endingSum = i - 1;
      }
    }
    for (let i = multiplySignIndex - 1; i >= 0; i--) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        if (expression[i] === '-' && i === 0) {
          beginningSum = i;
        } else {
          beginningSum = i + 1;
        }
      }
    }
    let expressionCalc = expression.substring(beginningSum, endingSum + 1);
    let addExpression;
    let newSum;
    switch (operator) {
      case '+':
        addExpression = expressionCalc.split('+');
        newSum = (+addExpression[0] + +addExpression[1]).toString();
        break;
      case '-':
        if (expressionCalc.includes('--')) {
          addExpression = expressionCalc.split('--');
          newSum = (+addExpression[0] + +addExpression[1]).toString();
        } else {
          addExpression = expressionCalc.split('-');
          if (addExpression.length === 3) {
            newSum = (+addExpression[1] * -1 - +addExpression[2]).toString();
          } else {
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

  const calculateParen = (expression) => {
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
            const exponentCalculated = calculateExponents(expressionCalc);
            const multiplyCaluclated = calculateMultiplyDivison(
              exponentCalculated
            );
            const calculated = calculatAdditionSubtraction(multiplyCaluclated);
            expression = expression.replace(expressionSub, calculated);
            openingParenArray.pop();
          }
      }
    }
    if (existsOpeningParen && existsClosingParen) {
      return calculateParen(expression);
    } else {
      return expression;
    }
  };

  const calculateExponents = (expression) => {
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
      return calculateExponents(expression);
    } else {
      return expression;
    }
  };

  const calculateMultiplyDivison = (expression) => {
    let changes = false;
    for (let i = 0; i < expression.length; i++) {
      let num = expression[i];
      switch (num) {
        case '*':
          expression = calculateOperator(i, expression, '*');
          changes = true;
          break;
        case '/':
          expression = calculateOperator(i, expression, '/');
          changes = true;
          break;
        default:
          break;
      }
    }
    if (changes) {
      return calculateMultiplyDivison(expression);
    } else {
      return expression;
    }
  };

  const calculatAdditionSubtraction = (expression) => {
    let changes = false;

    for (let i = 0; i < expression.length; i++) {
      let num = expression[i];
      switch (num) {
        case '+':
          expression = calculateOperator(i, expression, '+');
          changes = true;
          break;
        case '-':
          if (i === 0) {
            break;
          }
          if (
            (typeof +expression[i - 1] === 'number' &&
              typeof +expression[i + 1] === 'number') ||
            (typeof +expression[i - 1] === 'number' &&
              typeof +expression[i + 2] === 'number')
          ) {
            expression = calculateOperator(i, expression, '-');
            changes = true;
          }
          break;
        default:
          break;
      }
    }
    if (changes) {
      return calculatAdditionSubtraction(expression);
    } else {
      return expression;
    }
  };

  const showNum = (expression) => {
    try {
      const parenCalculated = calculateParen(expression);
      const exponentCalculated = calculateExponents(parenCalculated);
      const multiplyCaluclated = calculateMultiplyDivison(exponentCalculated);
      const calculated = calculatAdditionSubtraction(multiplyCaluclated);
      const checkError = isNaN(+calculated);
      if (checkError) {
        setDisplayValue('Invalid');
      } else {
        setDisplayValue(calculated);
      }
    } catch {
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
