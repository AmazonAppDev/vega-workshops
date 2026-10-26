export interface HermesInfo {
  isHermes: boolean;
  version?: string;
  bytecodeVersion?: string;
}

export const detectHermes = (): HermesInfo => {
  const hermesInternal = (
    globalThis as {
      HermesInternal?: {getRuntimeProperties?: () => Record<string, string>};
    }
  ).HermesInternal;
  if (!hermesInternal) {
    return {isHermes: false};
  }
  const props = hermesInternal.getRuntimeProperties?.() ?? {};
  return {
    isHermes: true,
    version: props['OSS Release Version'],
    bytecodeVersion: props['Bytecode Version'],
  };
};
