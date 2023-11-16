import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface GetUserProfileUserUseCaseRequest {
  userId: string
}

interface GetUserProfileUserUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase
  implements
    UseCase<
      GetUserProfileUserUseCaseRequest,
      GetUserProfileUserUseCaseResponse
    >
{
  constructor(private readonly usersRepository: UserRepository) {}

  async exec({
    userId,
  }: GetUserProfileUserUseCaseRequest): Promise<GetUserProfileUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
