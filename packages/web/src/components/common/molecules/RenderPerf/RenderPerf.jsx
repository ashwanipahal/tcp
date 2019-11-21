/* eslint-disable react/no-danger */
import React from 'react';
import { string } from 'prop-types';
import { NAVIGATION_START } from '@tcp/core/src/constants/rum.constants';
import { usePerfMark, usePerfMeasure } from '../../../../hooks/performance';

const isEnabled = Boolean(process.env.PERF_TIMING);

function ServerOnlyScript({ children, ...props }) {
  // This may be unnecessary since react-dom will not execute the contents.
  return (
    <script
      suppressHydrationWarning
      {...props}
      dangerouslySetInnerHTML={{ __html: typeof window === 'undefined' ? children : null }}
    />
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
    <ServerOnlyScript>{`typeof performance !== ${'undefined'} && performance.mark('${name}');`}</ServerOnlyScript>
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
      {`typeof performance !== ${'undefined'} && performance.measure('${name}');`}
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
