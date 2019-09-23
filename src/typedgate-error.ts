export class TypedgateError extends Error {
  public name = 'TypedgateError';

  constructor(
    public message: string,
    public interfaceSourcePath?: string,
    public interfacePos?: number
  ) {
    super(message)
  }

  public toString() {
    return `${this.name}: ${this.message} at ${this.interfaceSourcePath}, position ${this.interfacePos}`
  }
}
