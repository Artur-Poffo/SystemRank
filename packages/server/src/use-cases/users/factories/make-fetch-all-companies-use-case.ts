import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { FetchAllCompaniesUseCase } from "../fetch-all-companies"

export function makeFetchAllCompaniesUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const fetchAllCompaniesUseCase = new FetchAllCompaniesUseCase(usersRepository)

  return fetchAllCompaniesUseCase
}