import { screen } from '@testing-library/react'
import Page from '..'
import { getRender } from '../../../test/render'
import { USER_MOCK } from '../../../test/mocks'

const defaultProps = { title: 'Title', children: <p>oi</p>, subtitle: 'subtitle' }

jest.mock('../../../contexts/auth', () => ({
  ...jest.requireActual('../../../contexts/auth'),
  useAuth: () => ({
    user: USER_MOCK
  })
}))

describe('Page test', () => {
  test('render header', () => {
    getRender(<Page {...defaultProps} />)
    expect(screen.getByText(`${USER_MOCK.name} ${USER_MOCK.surname}`)).toBeVisible()
  })

  test('render subtitle', () => {
    getRender(<Page {...defaultProps} />)
    expect(screen.getByText('subtitle')).toBeVisible()
  })
})
