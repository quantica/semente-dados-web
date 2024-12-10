import { screen, waitFor } from '@testing-library/react'
import ProtectedRoute from '..'
import { getRender } from '../../../test/render'
import { USER_MOCK } from '../../../test/mocks'
import { User } from '../../../types'

const mockUseAuth: { user?: User } = {
  user: undefined
}

jest.mock('../../../contexts/auth', () => ({
  ...jest.requireActual('../../../contexts/auth'),
  useAuth: () => mockUseAuth
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <div>Navigate</div>
}))

describe('Page test', () => {
  test('render login page', async () => {
    getRender(<ProtectedRoute />)

    await waitFor(() => {
      expect(screen.getByText('Navigate')).toBeVisible()
    })
  })

  test('render subtitle', async () => {
    mockUseAuth.user = USER_MOCK

    getRender(<ProtectedRoute />)
    await waitFor(() => {
      expect(screen.queryByText('Navigate')).toBeNull()
    })
  })
})
