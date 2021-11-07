
import { render, screen, fireEvent } from '@testing-library/react';

import CaclulatorContainer from '../CalculatorContainer'

describe('CalculatorComponent', () => {


    test('When a number is clicked, it is concatenated to display', () => {
        const { getByTestId } = render(<CaclulatorContainer />)
        const num7El = screen.getByText('7')
        const displayEl = getByTestId('display')
        fireEvent.click(num7El)
        expect(displayEl.textContent).toBe('7')
    })

    test('When "AC is clicked, the display is cleared', () => {
        const { getByTestId } = render(<CaclulatorContainer />)
        const num7El = screen.getByText('7')
        const displayEl = getByTestId('display')
        const acEL = screen.getByText('AC')

        fireEvent.click(num7El)
        fireEvent.click(acEL)

        expect(displayEl.textContent).toBe('')
    })

    test('evaluates exponents', () => {
        const { getByTestId } = render(<CaclulatorContainer />)

        const displayEl = getByTestId('display')
        const num3El = screen.getByText('3')
        const num2El = screen.getByText('2')
        const exponentEl = screen.getByText('^')
        const equalEl = screen.getByText('=')

        fireEvent.click(num3El)
        fireEvent.click(exponentEl)
        fireEvent.click(num2El)
        fireEvent.click(equalEl)

        expect(displayEl.textContent).toBe('9')
    })

    test('evaluates complex expressions', () => {
        const { getByTestId } = render(<CaclulatorContainer />)

        const displayEl = getByTestId('display')
        const num3El = screen.getByText('3')
        const num2El = screen.getByText('2')
        const num4El = screen.getByText('4')
        const divisionEl = screen.getByText('/')
        const additionEl = screen.getByText('+')
        const multiplicationEl = screen.getByText('*')
        const subtractionEl = screen.getByText('-')
        const equalEl = screen.getByText('=')
        const openParentheses = screen.getByText('(')
        const closeParentheses = screen.getByText(')')

        fireEvent.click(openParentheses)
        fireEvent.click(num3El)
        fireEvent.click(additionEl)
        fireEvent.click(num3El)
        fireEvent.click(closeParentheses)
        fireEvent.click(multiplicationEl)
        fireEvent.click(openParentheses)
        fireEvent.click(num4El)
        fireEvent.click(divisionEl)
        fireEvent.click(num2El)
        fireEvent.click(closeParentheses)
        fireEvent.click(subtractionEl)
        fireEvent.click(num2El)
        fireEvent.click(equalEl)

        expect(displayEl.textContent).toBe('10')
    })

    test('supports decimal arithmetic', () => {
        const { getByTestId } = render(<CaclulatorContainer />)
        const displayEl = getByTestId('display')
        const num2El = screen.getByText('2')
        const num0El = screen.getByText('0')
        const num5El = screen.getByText('5')
        const decimalEl = screen.getByText('.')
        const additionEl = screen.getByText('+')
        const equalEl = screen.getByText('=')

        fireEvent.click(num2El)
        fireEvent.click(decimalEl)
        fireEvent.click(num2El)
        fireEvent.click(num5El)
        fireEvent.click(additionEl)
        fireEvent.click(num2El)
        fireEvent.click(decimalEl)
        fireEvent.click(num5El)
        fireEvent.click(num0El)
        fireEvent.click(equalEl)

        expect(displayEl.textContent).toBe('4.75')

    })

    test('supports decimal arithmetic', () => {
        const { getByTestId } = render(<CaclulatorContainer />)
        const displayEl = getByTestId('display')
        const num2El = screen.getByText('2')
        const num0El = screen.getByText('0')
        const num5El = screen.getByText('5')
        const decimalEl = screen.getByText('.')
        const additionEl = screen.getByText('+')
        const equalEl = screen.getByText('=')

        fireEvent.click(num2El)
        fireEvent.click(decimalEl)
        fireEvent.click(num2El)
        fireEvent.click(num5El)
        fireEvent.click(additionEl)
        fireEvent.click(num2El)
        fireEvent.click(decimalEl)
        fireEvent.click(num5El)
        fireEvent.click(num0El)
        fireEvent.click(equalEl)

        expect(displayEl.textContent).toBe('4.75')

    })

    test('prevents consecutive operator entry', () => {
        const { getByTestId } = render(<CaclulatorContainer />)
        const displayEl = getByTestId('display')
        const num2El = screen.getByText('2')
        const additionEl = screen.getByText('+')
        const divisionEl = screen.getByText('/')

        fireEvent.click(num2El)
        fireEvent.click(additionEl)
        fireEvent.click(divisionEl)

        expect(displayEl.textContent).toBe('2+')
    })

    test('prevents consecutive decimal entry', () => {
        const { getByTestId } = render(<CaclulatorContainer />)
        const displayEl = getByTestId('display')
        const num2El = screen.getByText('2')
        const decimalEl = screen.getByText('.')


        fireEvent.click(num2El)
        fireEvent.click(decimalEl)
        fireEvent.click(decimalEl)

        expect(displayEl.textContent).toBe('2.')
    })

    test('displays empty screen if invalid expression is entered', () => {
        const { getByTestId } = render(<CaclulatorContainer />)
        const displayEl = getByTestId('display')
        const num2El = screen.getByText('2')
        const multiplicationlEl = screen.getByText('*')
        const equalEl = screen.getByText('=')

        fireEvent.click(num2El)
        fireEvent.click(multiplicationlEl)
        fireEvent.click(equalEl)

        expect(displayEl.textContent).toBe('')
    })
})