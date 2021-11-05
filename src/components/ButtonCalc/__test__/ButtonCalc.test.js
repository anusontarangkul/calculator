import React from 'react';
import { render, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ButtonCalc from '../ButtonCalc'

test('value of equal sign is displayed on button', () => {
    const { getByTestId } = render(<ButtonCalc btn={{ value: "=" }} />);

    const equalEl = getByTestId('=')
    expect(equalEl.textContent).toBe('=')
});

test('The equal button has blue background', () => {
    const { getByTestId } = render(<ButtonCalc btn={{ value: "=" }} />);

    const equalEl = getByTestId('=')
    expect(equalEl).toHaveStyle(`background: #6CC3F7`)
});

test('The equal button is a square', () => {
    const { getByTestId } = render(<ButtonCalc btn={{ value: "=" }} />);

    const equalEl = getByTestId('=')
    expect(equalEl).toHaveStyle(`borderRadius: 0`)
});

test('The number 7 button has a white background', () => {
    const { getByTestId } = render(<ButtonCalc btn={{ value: "7" }} />);

    const sevenEl = getByTestId('7')
    expect(sevenEl).toHaveStyle(`background: white`)
});

test('The number 7 button is a circle', () => {
    const { getByTestId } = render(<ButtonCalc btn={{ value: "7" }} />);

    const sevenEl = getByTestId('7')
    expect(sevenEl).toHaveStyle(`borderRadius: 50%`)
});


