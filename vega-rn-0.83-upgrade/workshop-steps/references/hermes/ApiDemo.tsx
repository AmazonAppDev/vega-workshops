import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {scaleFontSize, scaleWidth, scaleHeight} from '../utils/scaling';
import {detectHermes} from '../utils/hermesInfo';
import {
  BenchmarkSummary,
  MATRIX_SIZE,
  TIMED_RUNS,
  WARMUP_RUNS,
  runMatrixBenchmark,
} from '../utils/benchmark';

interface ApiDemoProps {
  runId: number;
}

export const ApiDemo = ({runId}: ApiDemoProps) => {
  const hermes = useMemo(detectHermes, []);
  const [result, setResult] = useState<BenchmarkSummary | null>(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (runId === 0) {
      return;
    }
    setRunning(true);
    setResult(null);
    setProgress(0);

    const cancel = runMatrixBenchmark({
      onProgress: ({index}) => setProgress(index + 1),
      onComplete: (summary) => {
        setResult(summary);
        setRunning(false);
      },
    });

    return cancel;
  }, [runId]);

  return (
    <View style={styles.container}>
      <Text style={styles.engine}>
        Engine:{' '}
        {hermes.isHermes
          ? `Hermes ${hermes.version ?? '(version unknown)'}`
          : 'JSC (Hermes not detected)'}
      </Text>

      {runId === 0 && (
        <Text style={styles.hint}>
          Press select to multiply two {MATRIX_SIZE}×{MATRIX_SIZE} matrices.{' '}
          {WARMUP_RUNS} warmup run + {TIMED_RUNS} timed runs, median reported.
        </Text>
      )}

      {running && (
        <View style={styles.runningBlock}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.hint}>
            {progress <= WARMUP_RUNS
              ? `Warmup ${progress}/${WARMUP_RUNS}…`
              : `Run ${progress - WARMUP_RUNS}/${TIMED_RUNS}…`}
          </Text>
        </View>
      )}

      {result && (
        <View>
          <Text style={styles.runs}>
            Runs:{' '}
            {result.timedRuns.map((ms) => `${ms.toFixed(1)} ms`).join(', ')}
          </Text>
          <Text style={styles.metric}>
            Median (min {result.min.toFixed(1)} / max {result.max.toFixed(1)})
          </Text>
          <Text style={styles.metricValue}>{result.median.toFixed(1)} ms</Text>
          <Text style={styles.hint}>Press select again to re-run.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  engine: {
    color: '#FFFFFF',
    fontSize: scaleFontSize(28),
    opacity: 0.7,
    marginBottom: scaleHeight(12),
  },
  metric: {
    color: '#FFFFFF',
    fontSize: scaleFontSize(40),
    fontWeight: '600',
    marginTop: scaleHeight(8),
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: scaleFontSize(56),
    fontWeight: 'bold',
  },
  hint: {
    color: '#FFFFFF',
    fontSize: scaleFontSize(32),
    marginTop: scaleHeight(16),
    opacity: 0.8,
    width: scaleWidth(900),
  },
  runningBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(20),
  },
  runs: {
    color: '#FFFFFF',
    fontSize: scaleFontSize(32),
    fontWeight: '500',
    opacity: 0.85,
    marginTop: scaleHeight(8),
    width: scaleWidth(1000),
  },
});
