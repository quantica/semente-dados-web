import { rest } from 'msw'

const BASE_URL = 'http://localhost'

export const handlers = [
  rest.post(`${BASE_URL}/user`, (_, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.post(`${BASE_URL}/auth/login`, (_, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.post(`${BASE_URL}/auth/send-code`, (_, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.post(`${BASE_URL}/auth/validate-code`, (_, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.get(`${BASE_URL}/auth/me`, (_, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.put(`${BASE_URL}/user/password`, (_, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.get(`${BASE_URL}/user`, (_, res, ctx) => {
    return res(ctx.status(200))
  })
]
