import React, { useEffect } from 'react';
import Safe from 'react-safe';
import { string } from 'prop-types';
import ServerOnly from '../../atoms/ServerOnly';

const isEnabled = Boolean(process.env.PERF_TIMING);

// Helper
function entryExists(name) {
  return Boolean(performance.getEntriesByName(name).length);
}

export function Mark({ name }) {
  // For client-side execution
  useEffect(() => {
    if (isEnabled && !entryExists(name)) {
      performance.mark(name);
    }
  }, [name]);

  // For server-side execution
  // NOTE: JSON.stringify used to properly quote the arguments
  return isEnabled ? (
    <ServerOnly>
      <Safe.script>{`performance.mark(${JSON.stringify(name)})`}</Safe.script>
    </ServerOnly>
  ) : null;
}

Mark.propTypes = {
  name: string.isRequired,
};

export function Measure({ name, start, end }) {
  // For client-side execution
  useEffect(() => {
    try {
      if (isEnabled && !entryExists(name) && typeof performance !== 'undefined') {
        performance.measure(name, start, end);
      }
    } catch (err) {
      /* Will throw if "start" or "end" don't match existing marks */
    }
  }, [name]);

  // For server-side execution
  // NOTE: JSON.stringify used to properly quote the arguments
  return isEnabled && typeof performance !== 'undefined' ? (
    <ServerOnly>
      <Safe.script>
        {`
        performance.measure(
          ${JSON.stringify(name)},
          ${JSON.stringify(start)},
          ${JSON.stringify(end)}
        )
      `}
      </Safe.script>
    </ServerOnly>
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
