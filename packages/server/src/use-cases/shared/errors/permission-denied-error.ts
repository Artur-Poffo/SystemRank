export class PermissionDeniedError extends Error {
  constructor() {
    super('Permission Denied')
  }
}
