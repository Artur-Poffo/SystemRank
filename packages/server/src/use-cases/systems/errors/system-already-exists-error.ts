export class SystemAlreadyExistsError extends Error {
  constructor() {
    super('System already registered')
  }
}
