import React from 'react';
import Display from '../Display';
import { render, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

let getByTestId;

beforeEach(() => {
    const component = render(<Display />);
    getByTestId = component.getByTestId;
});

test('initial value of display is empty', () => {
    const displayEl = getByTestId('display')
    expect(displayEl.textContent).toBe('')
});