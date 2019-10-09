import React, { useEffect } from 'react';
import Safe from 'react-safe';
import { string } from 'prop-types';

const isEnabled = Boolean(process.env.PERF_TIMING);

// Helper
function entryExists(name) {
  return Boolean(performance.getEntriesByName(name).length);
}

/**
 * Helper for proper quotations in script string output.
 * This is a template literal tag function.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
function stringify(strings, ...values) {
  return strings.reduce(
    (result, str, i) => result + str + (i < values.length ? JSON.stringify(values[i]) : ''),
    ''
  );
}

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
  useEffect(() => {
    if (isEnabled && !entryExists(name)) {
      performance.mark(name);
    }
  }, [name]);

  // For server-side execution
  // NOTE: JSON.stringify used to properly quote the arguments
  return isEnabled ? (
    <ServerOnlyScript>
      {stringify`
        if (typeof performance !== ${undefined}) {
          performance.mark(${name});
        }`}
    </ServerOnlyScript>
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
    <ServerOnlyScript>
      {stringify`
        if (typeof performance !== ${undefined}) {
          performance.measure(
            ${name},
            ${start},
            ${end}
          );
        }`}
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
