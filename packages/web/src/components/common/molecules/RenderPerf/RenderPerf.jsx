import React from 'react';
import ServerOnly from '../../atoms/ServerOnly';
import Perf from '../../atoms/Perf';

export function Mark(props) {
  return process.env.RWD_WEB_PERF_TIMING ? (
    <ServerOnly>
      <Perf.Mark {...props} />
    </ServerOnly>
  ) : null;
}

export function Measure(props) {
  return process.env.RWD_WEB_PERF_TIMING ? (
    <ServerOnly>
      <Perf.Measure {...props} />
    </ServerOnly>
  ) : null;
}

export default {
  Mark,
  Measure,
};
