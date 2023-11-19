import { UserAlreadyExistsError } from '@/use-cases/users/errors/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/users/factories/make-register-users-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    isCompany: z.boolean(),
  })

  const { name, email, password, isCompany } = registerUserBodySchema.parse(
    request.body,
  )

  try {
    const registerUserUseCase = makeRegisterUserUseCase()

    await registerUserUseCase.exec({
      name,
      email,
      password,
      isCompany,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
