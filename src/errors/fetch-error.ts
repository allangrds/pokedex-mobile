export class FetchError extends Error {
  public status: number
  public statusText: string
  public response?: Response

  constructor (message: string, status: number) {
    super(message)
    this.status = status
    this.statusText = `${status} - ${message}`
  }
}
