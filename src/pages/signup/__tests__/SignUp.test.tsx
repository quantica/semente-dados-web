import userEvent from '@testing-library/user-event'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { getRender } from '../../../test/render'
import SignUp from '..'

const createUserMock = jest.fn()

jest.mock('../../../services/user.service', () => ({
  create: jest.fn().mockImplementation(() => createUserMock())
}))

describe('SignUp test', () => {
  test('Submit button with errors', async () => {
    getRender(<SignUp />)
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAccessibleErrorMessage(
        'O email é obrigatório'
      )
      expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveAccessibleErrorMessage(
        'O nome é obrigatório'
      )
      expect(screen.getByRole('textbox', { name: 'Sobrenome' })).toHaveAccessibleErrorMessage(
        'O sobrenome é obrigatório'
      )
      expect(screen.getByLabelText('Senha')).toHaveAccessibleErrorMessage('A senha é obrigatória')
      expect(screen.getByLabelText('Confirmar senha')).toHaveAccessibleErrorMessage(
        'A confirmação da senha é obrigatória'
      )
    })
  })

  test('Successful submit button', async () => {
    getRender(<SignUp />)
    userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'email@quanti.ca')
    userEvent.type(screen.getByRole('textbox', { name: 'Nome' }), 'Quanti')
    userEvent.type(screen.getByRole('textbox', { name: 'Sobrenome' }), 'Ca')
    userEvent.type(screen.getByLabelText('Senha'), 'senha12')
    userEvent.type(screen.getByLabelText('Confirmar senha'), 'senha12')

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeVisible()
      expect(screen.getByRole('alert')).toHaveTextContent('Conta criada com sucesso!')
    })
  })

  test('Submit with api errors', async () => {
    createUserMock.mockRejectedValue('error')
    getRender(<SignUp />)
    userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'email@quanti.ca')
    userEvent.type(screen.getByRole('textbox', { name: 'Nome' }), 'Quanti')
    userEvent.type(screen.getByRole('textbox', { name: 'Sobrenome' }), 'Ca')
    userEvent.type(screen.getByLabelText('Senha'), 'senha12')
    userEvent.type(screen.getByLabelText('Confirmar senha'), 'senha12')

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeVisible()
      expect(screen.getByRole('alert')).toHaveTextContent('Algo deu errado')
    })
  })
})
