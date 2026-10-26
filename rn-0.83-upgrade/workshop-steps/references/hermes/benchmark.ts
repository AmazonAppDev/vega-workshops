// Drop to 80 if you're running on real Fire TV hardware.
export const MATRIX_SIZE = 240;
export const WARMUP_RUNS = 1;
export const TIMED_RUNS = 5;
export const TOTAL_RUNS = WARMUP_RUNS + TIMED_RUNS;
export const RUN_GAP_MS = 300;

export const now = (): number =>
  typeof performance !== 'undefined' && performance.now
    ? performance.now()
    : Date.now();

export const createRandomMatrix = (size: number): number[][] => {
  const matrix: number[][] = new Array(size);
  for (let i = 0; i < size; i++) {
    matrix[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      matrix[i][j] = Math.floor(Math.random() * 100);
    }
  }
  return matrix;
};

export const matrixMultiply = (a: number[][], b: number[][]): number[][] => {
  const n = a.length;
  const result: number[][] = new Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
};

export const median = (values: number[]): number => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

export interface BenchmarkSummary {
  timedRuns: number[];
  median: number;
  min: number;
  max: number;
}

export interface BenchmarkProgress {
  index: number;
  isWarmup: boolean;
}

export interface BenchmarkOptions {
  onProgress?: (progress: BenchmarkProgress) => void;
  onComplete?: (summary: BenchmarkSummary) => void;
}

export const runMatrixBenchmark = (
  options: BenchmarkOptions = {},
): (() => void) => {
  const {onProgress, onComplete} = options;
  let cancelled = false;

  const a = createRandomMatrix(MATRIX_SIZE);
  const b = createRandomMatrix(MATRIX_SIZE);

  const timedRuns: number[] = [];
  let sink = 0;

  const stepRun = (idx: number) => {
    if (cancelled) {
      return;
    }
    if (idx >= TOTAL_RUNS) {
      // Read the sink so the optimiser can't prove it's unused.
      if (sink === Number.MAX_SAFE_INTEGER) {
        // eslint-disable-next-line no-console
        console.log('unreachable', sink);
      }
      onComplete?.({
        timedRuns,
        median: median(timedRuns),
        min: Math.min(...timedRuns),
        max: Math.max(...timedRuns),
      });
      return;
    }
    setTimeout(() => {
      if (cancelled) {
        return;
      }
      const start = now();
      const product = matrixMultiply(a, b);
      const elapsed = now() - start;
      sink += product[idx % MATRIX_SIZE][idx % MATRIX_SIZE];
      if (idx >= WARMUP_RUNS) {
        timedRuns.push(elapsed);
      }
      onProgress?.({index: idx, isWarmup: idx < WARMUP_RUNS});
      stepRun(idx + 1);
    }, RUN_GAP_MS);
  };

  stepRun(0);
  return () => {
    cancelled = true;
  };
};
