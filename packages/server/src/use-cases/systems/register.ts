import { SystemsRepository } from '@/repositories/systems-repository'
import { UserRepository } from '@/repositories/users-repository'
import { System } from '@prisma/client'
import { PermissionDeniedError } from '../shared/errors/permission-denied-error'
import { UseCase } from '../shared/interfaces/UseCase'
import { SystemAlreadyExistsError } from './errors/system-already-exists-error'

interface RegisterSystemUseCaseRequest {
  name: string
  description: string
  content: string
  systemPageLink?: string
  systemLogoImagePath?: string
  systemCoverImagePath?: string
  userId: string
}

interface RegisterSystemUseCaseResponse {
  system: System
}

export class RegisterSystemUseCase
  implements
    UseCase<RegisterSystemUseCaseRequest, RegisterSystemUseCaseResponse>
{
  constructor(
    private readonly systemsRepository: SystemsRepository,
    private readonly usersRepository: UserRepository,
  ) {}

  async exec({
    name,
    description,
    content,
    systemCoverImagePath,
    systemLogoImagePath,
    userId,
    systemPageLink,
  }: RegisterSystemUseCaseRequest): Promise<RegisterSystemUseCaseResponse> {
    const systemWithSameName = await this.systemsRepository.findByName(name)

    if (systemWithSameName) {
      throw new SystemAlreadyExistsError()
    }

    const doesUserHavePermission = await this.usersRepository.findById(userId)

    if (!doesUserHavePermission || doesUserHavePermission.role !== 'COMPANY') {
      throw new PermissionDeniedError()
    }

    const newSystem = await this.systemsRepository.create({
      name,
      description,
      content,
      system_cover_image_path: systemCoverImagePath,
      system_logo_image_path: systemLogoImagePath,
      system_page_link: systemPageLink,
      user_id: userId,
    })

    return { system: newSystem }
  }
}
