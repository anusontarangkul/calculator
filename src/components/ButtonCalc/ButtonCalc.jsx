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

  const calculateSum = (plusSignIndex, expression) => {
    let beginningSum = 0;
    let endingSum = expression.length - 1;
    // console.log('starting endsum', endingSum);
    // console.log('expression', expression);
    // console.log('plus', plusSign);

    for (let i = plusSignIndex + 1; i < expression.length; i++) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        endingSum = i - 1;
        // console.log('endingSum', endingSum);
      }
    }
    for (let i = plusSignIndex - 1; i >= 0; i--) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        beginningSum = i + 1;
        // console.log('begSum', beginningSum);
      }
    }
    let expressionCalc = expression.substring(beginningSum, endingSum + 1);
    // console.log('expression', expressionCalc);
    let addExpression = expressionCalc.split('+');
    let newSum = (+addExpression[0] + +addExpression[1]).toString();
    console.log('newSum', newSum);
    let substituteExpression = expression.replace(expressionCalc, newSum);
    console.log('exp being sub', expressionCalc);
    console.log('sub', substituteExpression);

    return substituteExpression;
    // console.log('return exp', expression);
  };

  const calculateDifference = (minusSignIndex, expression) => {
    let beginningSum = 0;
    let endingSum = expression.length - 1;

    for (let i = minusSignIndex + 1; i < expression.length; i++) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        endingSum = i - 1;
      }
    }
    for (let i = minusSignIndex - 1; i >= 0; i--) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        beginningSum = i + 1;
      }
    }
    let expressionCalc = expression.substring(beginningSum, endingSum + 1);
    let addExpression = expressionCalc.split('-');
    let newSum = (+addExpression[0] - +addExpression[1]).toString();
    console.log('newSum', newSum);
    let substituteExpression = expression.replace(expressionCalc, newSum);
    console.log('exp being sub', expressionCalc);
    console.log('sub', substituteExpression);

    return substituteExpression;
  };

  const calculateProduct = (multiplySignIndex, expression) => {
    let beginningSum = 0;
    let endingSum = expression.length - 1;

    for (let i = multiplySignIndex + 1; i < expression.length; i++) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        endingSum = i - 1;
      }
    }
    for (let i = multiplySignIndex - 1; i >= 0; i--) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        beginningSum = i + 1;
      }
    }
    let expressionCalc = expression.substring(beginningSum, endingSum + 1);
    let addExpression = expressionCalc.split('*');
    let newSum = (+addExpression[0] * +addExpression[1]).toString();
    console.log('newSum', newSum);
    let substituteExpression = expression.replace(expressionCalc, newSum);
    console.log('exp being sub', expressionCalc);
    console.log('sub', substituteExpression);

    return substituteExpression;
  };

  const calculateOperator = (multiplySignIndex, expression, operator) => {
    let beginningSum = 0;
    let endingSum = expression.length - 1;

    for (let i = multiplySignIndex + 1; i < expression.length; i++) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        endingSum = i - 1;
      }
    }
    for (let i = multiplySignIndex - 1; i >= 0; i--) {
      let currentChar = +expression[i];
      if (isNaN(currentChar)) {
        beginningSum = i + 1;
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
        addExpression = expressionCalc.split('-');
        newSum = (+addExpression[0] - +addExpression[1]).toString();
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

  // const calculate4th = (expression) => {
  //   let openingParen;
  //   let closingParen;
  //   let center = Math.floor(expression.length / 2);
  //   console.log('center', center);
  //   let existsOpeningParen = false;
  //   let existsClosingParen = false;
  //   for (let i = center; i >= 0; i--) {
  //     let num = expression[i];
  //     switch (num) {
  //       case '(':
  //         openingParen = i;
  //         existsOpeningParen = true;
  //     }
  //   }
  //   for (let i = center; i < expression.length; i++) {
  //     let num = expression[i];
  //     switch (num) {
  //       case ')':
  //         closingParen = i;
  //         existsClosingParen = true;
  //         let expressionSub = expression.substring(
  //           openingParen,
  //           closingParen + 1
  //         );

  //         let expressionCalc = expression.substring(
  //           openingParen + 1,
  //           closingParen
  //         );
  //         console.log('going into paren');
  //         console.log('first exp', expressionCalc);
  //         const exponentCalculated = calculate3rd(expressionCalc);
  //         const multiplyCaluclated = calculate2nd(exponentCalculated);
  //         const calculated = calculateNum(multiplyCaluclated);
  //         expression = expression.replace(expressionSub, calculated);
  //     }
  //   }

  //   if (existsOpeningParen && existsClosingParen) {
  //     console.log('going to recurison');
  //     console.log('nex expression', expression);
  //     return calculate4th(expression);
  //   } else {
  //     return expression;
  //   }
  // };

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
          console.log('pushd');
          existsOpeningParen = true;
          break;
        case ')':
          closingParen = i;
          openingParen = openingParenArray[openingParenArray.length - 1];

          console.log('opening', openingParen);
          existsClosingParen = true;
          console.log('closing');
          console.log(openingParenArray);
          if (openingParenArray.length > 0) {
            console.log('going to eval');
            let expressionSub = expression.substring(
              openingParen,
              closingParen + 1
            );
            console.log('sub', expressionSub);
            let expressionCalc = expression.substring(
              openingParen + 1,
              closingParen
            );
            console.log('going into paren');
            console.log('first exp', expressionCalc);
            const exponentCalculated = calculate3rd(expressionCalc);
            const multiplyCaluclated = calculate2nd(exponentCalculated);
            const calculated = calculateNum(multiplyCaluclated);
            expression = expression.replace(expressionSub, calculated);
            openingParenArray.pop();
          }
      }
    }
    if (existsOpeningParen && existsClosingParen) {
      console.log('going to recurison');
      console.log('nex expression', expression);
      return calculate4th(expression);
    } else {
      return expression;
    }
  };
  //   for (let i = center; i < expression.length; i++) {
  //     let num = expression[i];
  //     switch (num) {
  //       case ')':
  //         closingParen = i;
  //         existsClosingParen = true;
  //         let expressionSub = expression.substring(
  //           openingParen,
  //           closingParen + 1
  //         );

  //         let expressionCalc = expression.substring(
  //           openingParen + 1,
  //           closingParen
  //         );
  //         console.log('going into paren');
  //         console.log('first exp', expressionCalc);
  //         const exponentCalculated = calculate3rd(expressionCalc);
  //         const multiplyCaluclated = calculate2nd(exponentCalculated);
  //         const calculated = calculateNum(multiplyCaluclated);
  //         expression = expression.replace(expressionSub, calculated);
  //     }
  //   }

  //   if (existsOpeningParen && existsClosingParen) {
  //     console.log('going to recurison');
  //     console.log('nex expression', expression);
  //     return calculate4th(expression);
  //   } else {
  //     return expression;
  //   }
  // };

  // const calculate4th = (expression) => {
  //   let openingParen;
  //   let closingParen;
  //   let existsOpeningParen = false;
  //   let existsClosingParen = false;
  //   let needToEvaluate = true;

  //   while (needToEvaluate) {
  //     let i = 0;
  //     let num = expression[i];
  //     switch (num) {
  //       case '(':
  //         openingParen = i;
  //         existsOpeningParen = true;
  //         break;
  //       case ')':
  //         closingParen = i;
  //         existsClosingParen = true;
  //         if (existsOpeningParen) {
  //           let expressionSub = expression.substring(
  //             openingParen,
  //             closingParen + 1
  //           );

  //           let expressionCalc = expression.substring(
  //             openingParen + 1,
  //             closingParen
  //           );
  //           console.log('going into paren');
  //           console.log('first exp', expressionCalc);
  //           const exponentCalculated = calculate3rd(expressionCalc);
  //           const multiplyCaluclated = calculate2nd(exponentCalculated);
  //           const calculated = calculateNum(multiplyCaluclated);
  //           expression = expression.replace(expressionSub, calculated);
  //           needToEvaluate = false;
  //         }
  //         break;
  //     }
  //     if (i === expression.length - 1) {
  //       needToEvaluate = false;
  //     }
  //     i++;
  //   }

  //   if (existsOpeningParen && existsClosingParen) {
  //     console.log('going to recurison');
  //     console.log('nex expression', expression);
  //     return calculate4th(expression);
  //   } else {
  //     return expression;
  //   }
  // };

  const calculate3rd = (expression) => {
    console.log('expression', expression);
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
            expression = calculateOperator(i, expression, '-');
            changes = true;
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

  const showNum = (expression) => {
    const parenCalculated = calculate4th(expression);
    console.log('finished paren');
    console.log(parenCalculated);
    const exponentCalculated = calculate3rd(parenCalculated);
    const multiplyCaluclated = calculate2nd(exponentCalculated);
    const calculated = calculateNum(multiplyCaluclated);
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
