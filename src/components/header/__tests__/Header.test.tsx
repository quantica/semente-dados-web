import { render, screen } from '@testing-library/react'
import Header from '../'
import userEvent from '@testing-library/user-event'
import { USER_MOCK } from '../../../test/mocks'

const defaultProps = {
  user: USER_MOCK,
  onLogout: jest.fn()
}

describe('Header test', () => {
  test('renders initials', () => {
    render(<Header {...defaultProps} />)
    expect(screen.getByText('US')).toBeVisible()
  })

  test('Should call onLogout function', () => {
    render(<Header {...defaultProps} />)
    const logout = screen.getByRole('button', { name: 'Sair' })
    userEvent.click(logout)
    expect(defaultProps.onLogout).toHaveBeenCalled()
  })
})
