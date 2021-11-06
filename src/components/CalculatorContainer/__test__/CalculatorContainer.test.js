
import { render, screen, fireEvent } from '@testing-library/react';

import CaclulatorContainer from '../CalculatorContainer'

describe('CalculatorComponent', () => {
    // beforeEach(() => {
    //     const component = render(<CaclulatorContainer/>)
    // })

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

})