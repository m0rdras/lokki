// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
let __encrypted = false;
const mock = jest.fn().mockImplementation(() => {
  return {
    decrypt: jest.fn(),
    deleteKey: jest.fn(),
    detectExecutablePath: jest.fn(),
    encrypt: jest.fn(),
    getPublicKeys: jest.fn(),
    setExecutablePath: jest.fn(),
    __setEncrypted: (encrypted: boolean) => {
      __encrypted = encrypted;
    },
  };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(mock as any).isEncrypted = jest.fn().mockImplementation(() => __encrypted);

export const GpgError = jest
  .fn()
  .mockImplementation(
    (code: number, msg: string) => new Error(`${msg} [Code: ${code}]`)
  );

export default mock;
