export { };

declare global {
  interface Window {
    api: {
      getVersion: (msg?: string) => void;
      restartApp: (msg?: string) => void;
      startAgent: (msg: string) => void;
      stopAgent: (msg?: string) => void;
    }
  }
}
