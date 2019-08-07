import React from 'react';
// import PropTypes from 'prop-types';

import style from '../ModuleA.style';

import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';

const ModuleA = () => {
  return <div>Module A</div>;
};

export default errorBoundary(withStyles(ModuleA, style));
export { ModuleA as ModuleAVanilla };
