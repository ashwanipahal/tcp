import React from 'react';
import ModuleD from '@tcp/core/src/components/common/molecules/ModuleD';
import { PropTypes } from 'prop-types';

const ModuleDComponent = data => <ModuleD data={data} />;

ModuleDComponent.propTypes = {
  data: PropTypes.string,
};

ModuleDComponent.defaultProps = {
  data: {},
};

export default ModuleDComponent;
