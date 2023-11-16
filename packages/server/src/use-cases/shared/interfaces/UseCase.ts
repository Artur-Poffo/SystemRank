export interface UseCase<REQ, RES> {
  exec(req: REQ): Promise<RES>
}
