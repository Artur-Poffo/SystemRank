import { SystemsRepository } from '@/repositories/systems-repository'
import { System } from '@prisma/client'
import { PermissionDeniedError } from '../shared/errors/permission-denied-error'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface EditSystemInfoUseCaseRequest {
  name?: string
  description?: string
  content?: string
  systemPageLink?: string
  systemLogoImagePath?: string
  systemCoverImagePath?: string
  systemId: string
  userId: string
}

interface EditSystemInfoUseCaseResponse {
  system: System
}

export class EditSystemInfoUseCase
  implements
    UseCase<EditSystemInfoUseCaseRequest, EditSystemInfoUseCaseResponse>
{
  constructor(private readonly systemsRepository: SystemsRepository) {}

  async exec({
    name,
    description,
    content,
    systemCoverImagePath,
    systemLogoImagePath,
    systemId,
    userId,
    systemPageLink,
  }: EditSystemInfoUseCaseRequest): Promise<EditSystemInfoUseCaseResponse> {
    const system = await this.systemsRepository.findById(systemId)

    if (!system) {
      throw new ResourceNotFoundError()
    }

    if (system.user_id !== userId) {
      throw new PermissionDeniedError()
    }

    const updatedSystem = await this.systemsRepository.update({
      id: systemId,
      name: name || system.name,
      description: description || system.description,
      content: content || system.content,
      system_cover_image_path:
        systemCoverImagePath || system.system_cover_image_path,
      system_logo_image_path:
        systemLogoImagePath || system.system_logo_image_path,
      system_page_link: systemPageLink || system.system_page_link,
      created_at: system.created_at,
      user_id: userId,
    })

    return { system: updatedSystem }
  }
}
