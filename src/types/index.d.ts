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

  type ParentProcessMessage = {
    data?: string;
    type: typeof START_AGENT | typeof STOP_AGENT;
  }
}
