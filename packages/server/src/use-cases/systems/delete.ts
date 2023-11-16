import { SystemsRepository } from '@/repositories/systems-repository'
import { UserRepository } from '@/repositories/users-repository'
import { System } from '@prisma/client'
import { PermissionDeniedError } from '../shared/errors/permission-denied-error'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface DeleteSystemUseCaseRequest {
  systemId: string
  userId: string
}

interface DeleteSystemUseCaseResponse {
  system: System
}

export class DeleteSystemUseCase
  implements UseCase<DeleteSystemUseCaseRequest, DeleteSystemUseCaseResponse>
{
  constructor(
    private readonly systemsRepository: SystemsRepository,
    private readonly usersRepository: UserRepository,
  ) {}

  async exec({
    systemId,
    userId,
  }: DeleteSystemUseCaseRequest): Promise<DeleteSystemUseCaseResponse> {
    const system = await this.systemsRepository.findById(systemId)
    const user = await this.usersRepository.findById(userId)

    if (!system || !user) {
      throw new ResourceNotFoundError()
    }

    if (system.user_id !== userId) {
      throw new PermissionDeniedError()
    }

    await this.systemsRepository.delete(systemId)

    return { system }
  }
}
