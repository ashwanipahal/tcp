import React from 'react';
import PropTypes from 'prop-types';
import RichText from '../../atoms/RichText';

const ModuleX = props => {
  const {
    richTextList: [{ text: html }],
  } = props;
  return <RichText isNativeView source={html} />;
};

ModuleX.propTypes = {
  richTextList: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.string)).isRequired,
};
export default ModuleX;
