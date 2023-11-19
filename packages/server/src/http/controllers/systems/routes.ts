import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { deleteSystem } from './delete'
import { editSystemInfo } from './edit-system-info'
import { fetchSystemsByCompany } from './fetch-systems-by-company'
import { getDetails } from './get-details'
import { querySystems } from './query-systems'
import { register } from './register'

export async function systemsRoutes(app: FastifyInstance) {
  app.get('/systems', querySystems)
  app.get('/systems/:systemId', getDetails)
  app.get('/systems/company/:companyId', fetchSystemsByCompany)

  app.patch(
    '/systems/:systemId',
    { onRequest: [verifyJwt, verifyUserRole('COMPANY')] },
    editSystemInfo,
  )

  app.delete(
    '/systems/:systemId',
    { onRequest: [verifyJwt, verifyUserRole('COMPANY')] },
    deleteSystem,
  )

  app.post(
    '/systems',
    { onRequest: [verifyJwt, verifyUserRole('COMPANY')] },
    register,
  )
}
