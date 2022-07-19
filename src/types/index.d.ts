export { };

declare global {
  interface Window {
    api: {
      startAgent: (msg: string) => void,
      stopAgent: (msg?: string) => void,
    }
  }
}