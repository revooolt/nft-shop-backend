export class ServerError extends Error implements ControllerError {
  constructor () {
    super('Internal Server Error')
    this.name = 'ServerError'
  }
}
