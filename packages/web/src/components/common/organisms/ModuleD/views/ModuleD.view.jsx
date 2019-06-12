import React from 'react';
import ModuleD from '@tcp/core/src/components/common/molecules/ModuleD';
import { PropTypes } from 'prop-types';

const ModuleDComponent = data => <ModuleD data={data} />;

ModuleDComponent.propTypes = {
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

export default ModuleDComponent;
