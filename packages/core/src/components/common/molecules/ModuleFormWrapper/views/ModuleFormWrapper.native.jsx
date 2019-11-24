import React from 'react';
import PropTypes from 'prop-types';
import ModuleFormWrapperRoot from '../styles/ModuleFormWrapper.style.native';

const ModuleFormWrapper = ({ children }) => (
  <ModuleFormWrapperRoot>{children}</ModuleFormWrapperRoot>
);

ModuleFormWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

ModuleFormWrapper.defaultProps = {
  children: null,
};

export default ModuleFormWrapper;
