import '@testing-library/jest-dom'
import { server } from './server'

global['Request'] = jest.fn().mockImplementation(() => ({
  signal: {
    removeEventListener: () => {},
    addEventListener: () => {}
  }
}))

beforeAll(() =>
  server.listen({
    onUnhandledRequest(request, print) {
      if (request.url.href.includes('http://127.0.0.1:56641/')) return

      // Print the regular MSW unhandled request warning otherwise.
      print.warning()
    }
  })
)

afterEach(() => server.resetHandlers())
afterAll(() => server.close())
