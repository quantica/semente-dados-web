import { fireEvent, screen, waitFor } from '@testing-library/react'
import { getRender } from '../../../test/render'
import { USER_MOCK } from '../../../test/mocks'
import { User } from '../../../types'
import Login from '..'
import userEvent from '@testing-library/user-event'

const useNavigateMock = jest.fn()
const mockLogin = jest.fn()

const mockUseAuth: { user?: User; login: () => void } = {
  user: undefined,
  login: jest.fn().mockImplementation(() => mockLogin())
}

jest.mock('../../../contexts/auth', () => ({
  ...jest.requireActual('../../../contexts/auth'),
  useAuth: () => mockUseAuth
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => useNavigateMock
}))

describe('Login test', () => {
  test('Submit successfully', async () => {
    getRender(<Login />)
    userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'email@quanti.ca')
    userEvent.type(screen.getByLabelText('Senha'), 'senha12')

    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled()
    })
  })

  test('Submit with error on api', async () => {
    mockLogin.mockRejectedValue('error')
    getRender(<Login />)
    userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'email@quanti.ca')
    userEvent.type(screen.getByLabelText('Senha'), 'senha12')

    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeVisible()
      expect(screen.getByRole('alert')).toHaveTextContent('Algo deu errado')
    })
  })

  test('Submit button with errors', async () => {
    getRender(<Login />)
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAccessibleErrorMessage(
        'O email é obrigatório'
      )
      expect(screen.getByLabelText('Senha')).toHaveAccessibleErrorMessage('A senha é obrigatória')
    })
  })
  test('Submit button with errors', async () => {
    getRender(<Login />)
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAccessibleErrorMessage(
        'O email é obrigatório'
      )
      expect(screen.getByLabelText('Senha')).toHaveAccessibleErrorMessage('A senha é obrigatória')
    })
  })

  test('Should go to home if user is set', async () => {
    mockUseAuth.user = USER_MOCK
    getRender(<Login />)

    await waitFor(() => {
      expect(useNavigateMock).toHaveBeenCalled()
    })
  })
})
