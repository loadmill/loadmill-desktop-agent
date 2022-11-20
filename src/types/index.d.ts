export { };

declare global {
  interface Window {
    api: {
      checkForUpdates: (msg?: string) => void;
      getVersion: (msg?: string) => void;
      startAgent: (msg: string) => void;
      stopAgent: (msg?: string) => void;
    }
  }
}
