
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

})