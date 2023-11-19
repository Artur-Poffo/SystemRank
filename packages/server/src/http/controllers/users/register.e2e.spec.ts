import { app } from '@/app'
import request from 'supertest'

describe('Register a new user (e2e)', () => {
  it('Should be able to register a new user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      isCompany: true,
    })

    expect(response.statusCode).toEqual(201)
  })
})
