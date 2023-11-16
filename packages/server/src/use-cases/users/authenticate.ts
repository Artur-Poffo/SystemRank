import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../shared/errors/invalid-credentials-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserUseCaseResponse {
  user: User
}

export class AuthenticateUserUseCase
  implements
    UseCase<AuthenticateUserUseCaseRequest, AuthenticateUserUseCaseResponse>
{
  constructor(private readonly usersRepository: UserRepository) {}

  async exec({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordsMatch = await compare(password, user.password_hash)

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
