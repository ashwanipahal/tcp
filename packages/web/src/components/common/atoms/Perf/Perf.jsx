import React from 'react';
import Safe from 'react-safe';
import { string } from 'prop-types';

const propTypes = {
  value: string.isRequired,
};

function mark({ value }) {
  return <Safe.script>{`performance.mark("${value}")`}</Safe.script>;
}

mark.propTypes = propTypes;

function measure({ value }) {
  return <Safe.script>{`performance.measure("${value}")`}</Safe.script>;
}

measure.propTypes = propTypes;

export default { mark, measure };
