export class ReviewAlreadyExistsError extends Error {
  constructor() {
    super('Review already exists')
  }
}
