import React from 'react';
import PropTypes from 'prop-types';
import ModuleMRoot from '../styles/ModuleM.style.native';

const ModuleM = ({ children }) => <ModuleMRoot>{children}</ModuleMRoot>;

ModuleM.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

ModuleM.defaultProps = {
  children: null,
};

export default ModuleM;
