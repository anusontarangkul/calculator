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

  const calculateOperator = (operatorIndex, expression, operator) => {
    // loop backwards and forwards from the operator to find substring
    let beginningIndex = 0;
    let endingIndex = expression.length - 1;

    for (let i = operatorIndex + 1; i < expression.length; i++) {
      let currentChar = +expression[i];
      if (expression[i] === '-' && !isNaN(+expression[i + 1])) {
        for (let j = i + 1; j < expression.length; j++) {
          let currentChar = +expression[i];
          if (isNaN(currentChar) && expression[i] !== '.') {
            endingIndex = j - 2;
          }
        }
      } else if (isNaN(currentChar) && expression[i] !== '.') {
        endingIndex = i - 1;
      }
    }
    for (let i = operatorIndex - 1; i >= 0; i--) {
      let currentChar = +expression[i];
      if (isNaN(currentChar) && expression[i] !== '.') {
        if (expression[i] === '-' && i === 0) {
          beginningIndex = i;
        } else {
          beginningIndex = i + 1;
        }
      }
    }
    // use indices calculated to find supbstring
    let expressionCalc = expression.substring(beginningIndex, endingIndex + 1);
    let subExpression;
    let calculatedValue;

    // perform calculation of substring based on operator
    switch (operator) {
      case '+':
        subExpression = expressionCalc.split('+');
        if (subExpression[0] === '' || subExpression[1] === '') {
          return 'Invalid';
        }
        calculatedValue = (+subExpression[0] + +subExpression[1]).toString();
        break;
      case '-':
        if (expressionCalc.includes('--')) {
          subExpression = expressionCalc.split('--');
          calculatedValue = (+subExpression[0] + +subExpression[1]).toString();
        } else {
          subExpression = expressionCalc.split('-');
          if (subExpression.length === 3) {
            calculatedValue = (
              +subExpression[1] * -1 -
              +subExpression[2]
            ).toString();
          } else {
            subExpression = expressionCalc.split('-');
            if (subExpression[1] === '') {
              return 'Invalid';
            }
            calculatedValue = (
              +subExpression[0] - +subExpression[1]
            ).toString();
          }
        }
        break;
      case '*':
        subExpression = expressionCalc.split('*');
        if (subExpression[0] === '' || subExpression[1] === '') {
          return 'Invalid';
        }
        console.log('sub', subExpression);
        calculatedValue = (+subExpression[0] * +subExpression[1]).toString();
        break;
      case '/':
        subExpression = expressionCalc.split('/');
        if (subExpression[0] === '' || subExpression[1] === '') {
          return 'Invalid';
        }
        calculatedValue = (+subExpression[0] / +subExpression[1]).toString();
        break;
      case '^':
        subExpression = expressionCalc.split('^');
        if (subExpression[0] === '' || subExpression[1] === '') {
          return 'Invalid';
        }
        calculatedValue = ((+subExpression[0]) ** +subExpression[1]).toString();
        break;
      default:
        break;
    }
    // replaced the calculated value with the substring
    let substituteExpression = expression.replace(
      expressionCalc,
      calculatedValue
    );
    return substituteExpression;
  };

  // use recrusive approach for Order of Operations

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
          // used stack to keep track of parenthesis
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
      // calculate expression using order of operations
      const parenCalculated = calculateParen(expression);
      const exponentCalculated = calculateExponents(parenCalculated);
      const multiplyCaluclated = calculateMultiplyDivison(exponentCalculated);
      const calculated = calculatAdditionSubtraction(multiplyCaluclated);

      // check if finaly value is number, if it's not, display invalid
      const checkError = isNaN(+calculated);
      if (checkError) {
        setDisplayValue('Invalid');
      } else {
        // round decimals
        const roundedCalc = Math.round(calculated * 100) / 100;
        setDisplayValue(roundedCalc);
      }
    } catch {
      setDisplayValue('Invalid');
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
