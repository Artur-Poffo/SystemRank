import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UseCase } from '../shared/interfaces/UseCase'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  isCompany: boolean
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase
  implements UseCase<RegisterUserUseCaseRequest, RegisterUserUseCaseResponse>
{
  constructor(private readonly usersRepository: UserRepository) {}

  async exec({
    name,
    email,
    password,
    isCompany,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await hash(password, 6)

    const newUser = await this.usersRepository.create({
      name,
      email,
      password_hash: hashedPassword,
      role: isCompany ? 'COMPANY' : 'MEMBER',
    })

    return { user: newUser }
  }
}
