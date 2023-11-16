import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface UpdateUserProfileUseCaseRequest {
  userId: string
  name?: string
  email?: string
  profileImagePath?: string
  bannerProfileImagePath?: string
}

interface UpdateUserProfileUseCaseResponse {
  user: User
}

export class UpdateUserProfileUseCase
  implements
    UseCase<UpdateUserProfileUseCaseRequest, UpdateUserProfileUseCaseResponse>
{
  constructor(private readonly usersRepository: UserRepository) {}

  async exec({
    userId,
    name,
    email,
    profileImagePath,
    bannerProfileImagePath,
  }: UpdateUserProfileUseCaseRequest): Promise<UpdateUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const updatedUser = await this.usersRepository.updateProfile({
      id: user.id,
      name: name || user.name,
      email: email || user.email,
      password_hash: user.password_hash,
      banner_profile_image_path:
        bannerProfileImagePath || user.banner_profile_image_path,
      profile_image_path: profileImagePath || user.profile_image_path,
      role: user.role,
      created_at: user.created_at,
    })

    return { user: updatedUser }
  }
}
