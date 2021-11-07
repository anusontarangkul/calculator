import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ButtonCalc from '../ButtonCalc';

// Design Unit Tests

describe('ButtonCalc', () => {
    test('value of equal sign is displayed on button', () => {
        render(<ButtonCalc btn={{ value: "=" }} />);

        const equalEl = screen.getByText('=');
        expect(equalEl).toBeInTheDocument();
    });

    test('The equal button has blue background', () => {
        render(<ButtonCalc btn={{ value: "=" }} />);

        const equalEl = screen.getByText('=');
        expect(equalEl).toHaveStyle(`background: #6CC3F7`);
    });

    test('The equal button is a square', () => {
        render(<ButtonCalc btn={{ value: "=" }} />);

        const equalEl = screen.getByText('=');
        expect(equalEl).toHaveStyle(`borderRadius: 0`);
    });

    test('The number 7 button has a white background', () => {
        render(<ButtonCalc btn={{ value: "7" }} />);

        const sevenEl = screen.getByText('7');
        expect(sevenEl).toHaveStyle(`background: white`);
    });

    test('The number 7 button is a circle', () => {
        render(<ButtonCalc btn={{ value: "7" }} />);

        const sevenEl = screen.getByText('7');
        expect(sevenEl).toHaveStyle(`borderRadius: 50%`);
    });
})



