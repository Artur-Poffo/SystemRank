export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User with same E-mail already exists')
  }
}
