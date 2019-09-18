import React from 'react';
import Safe from 'react-safe';
import { string } from 'prop-types';
import ServerOnly from '../../atoms/ServerOnly';

export function Mark({ name }) {
  return process.env.PERF_TIMING ? (
    <ServerOnly>
      <Safe.script>{`performance.mark("${name}")`}</Safe.script>
    </ServerOnly>
  ) : null;
}

Mark.propTypes = {
  name: string.isRequired,
};

export function Measure({ name, start, end }) {
  const startMark = start ? `"${start}"` : undefined;
  const endMark = end ? `"${end}"` : undefined;
  return process.env.PERF_TIMING ? (
    <ServerOnly>
      <Safe.script>{`performance.measure("${name}", ${startMark}, ${endMark})`}</Safe.script>
    </ServerOnly>
  ) : null;
}

Measure.propTypes = {
  name: string.isRequired,
  start: string,
  end: string,
};

Measure.defaultProps = {
  start: '',
  end: '',
};

export default {
  Mark,
  Measure,
};
