import React from 'react';
import PropTypes from 'prop-types';
import HelpCenterHeaderRoot from '../styles/HelpCenterHeader.style.native';

const HelpCenterHeader = ({ children }) => <HelpCenterHeaderRoot>{children}</HelpCenterHeaderRoot>;

HelpCenterHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

HelpCenterHeader.defaultProps = {
  children: null,
};

export default HelpCenterHeader;
