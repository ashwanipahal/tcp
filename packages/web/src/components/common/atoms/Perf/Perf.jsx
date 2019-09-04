import React from 'react';
import Safe from 'react-safe';
import { string } from 'prop-types';

export function Mark({ name }) {
  return <Safe.script>{`performance.mark("${name}")`}</Safe.script>;
}

Mark.propTypes = {
  name: string.isRequired,
};

export function Measure({ name, start, end }) {
  const startMark = start ? `"${start}"` : undefined;
  const endMark = end ? `"${end}"` : undefined;
  return <Safe.script>{`performance.measure("${name}", ${startMark}, ${endMark})`}</Safe.script>;
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
