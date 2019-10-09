export class TypedgateError extends Error {
  public name = 'TypedgateError';

  constructor(
    public message: string,
    public sourceFileName?: string,
    public sourceFilePos?: {
      line: number;
      column: number;
    }
  ) {
    super(message)
  }

  public toString() {
    const pos = this.sourceFilePos ? `:${this.sourceFilePos.line}:${this.sourceFilePos.column}` : ''
    return `${this.name}: ${this.message} at ${this.sourceFileName}${pos}`
  }
}
