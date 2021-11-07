import React from 'react';
import Display from '../Display';

import { render, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Unit Test

describe('Display', () => {
    test('initial value of display is empty', () => {
        const { getByTestId } = render(<Display />);

        const displayEl = getByTestId('display');

        expect(displayEl.textContent).toBe('');
    });
})
