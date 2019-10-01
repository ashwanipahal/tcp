/* istanbul ignore file */
import React from 'react';

import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import moduleQStyle from '../styles/ModuleQ.style';

function ModuleQ() {
  return <div>ModuleQ</div>;
}

const styledModuleQ = withStyles(errorBoundary(ModuleQ), moduleQStyle);
styledModuleQ.defaultProps = ModuleQ.defaultProps;
export default styledModuleQ;
export { ModuleQ as ModuleQVanilla };
