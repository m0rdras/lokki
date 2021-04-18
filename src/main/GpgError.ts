export default class GpgError extends Error {
  constructor(public readonly code: number, message: string) {
    super(message);
  }

  public toString(): string {
    return `${super.toString()} [Code: ${this.code}]`;
  }
}
