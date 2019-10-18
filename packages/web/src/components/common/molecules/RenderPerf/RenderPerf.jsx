import React from 'react';
import Safe from 'react-safe';
import { string } from 'prop-types';
import { NAVIGATION_START } from '@tcp/core/src/constants/rum.constants';
import { stringify } from '@tcp/core/src/utils';
import { usePerfMark, usePerfMeasure } from '../../../../hooks/performance';

const isEnabled = Boolean(process.env.PERF_TIMING);

function ServerOnlyScript({ children, ...props }) {
  return (
    <Safe.script suppressHydrationWarning {...props}>
      {/* This may be unnecessary since react-dom will not execute the contents. */}
      {typeof window === 'undefined' ? children : null}
    </Safe.script>
  );
}

ServerOnlyScript.propTypes = {
  children: string.isRequired,
};

export function Mark({ name }) {
  // For client-side execution
  usePerfMark(name);
  // For server-side execution
  return isEnabled ? (
    <ServerOnlyScript>{stringify`typeof performance !== ${'undefined'} && performance.mark(${name});`}</ServerOnlyScript>
  ) : null;
}

Mark.propTypes = {
  name: string.isRequired,
};

export function Measure({ name, start, end }) {
  // For client-side execution
  // Note: use `NAVIGATION_START` as a default for CSR user timing
  usePerfMeasure(name, start || NAVIGATION_START, end);
  // For server-side execution
  return isEnabled ? (
    <ServerOnlyScript>
      {/* "start" and "end" intentionally omitted for SSR */}
      {stringify`typeof performance !== ${'undefined'} && performance.measure(${name});`}
    </ServerOnlyScript>
  ) : null;
}

Measure.propTypes = {
  name: string.isRequired,
  start: string,
  end: string,
};

Measure.defaultProps = {
  start: undefined,
  end: undefined,
};

export default {
  Mark,
  Measure,
};
