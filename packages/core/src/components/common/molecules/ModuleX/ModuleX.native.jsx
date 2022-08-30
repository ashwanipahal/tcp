import React from 'react';
import PropTypes from 'prop-types';
import RichText from '../../atoms/RichText';

const ModuleX = props => {
  const {
    richTextList: [{ text: html }],
    navigation,
  } = props;

  return <RichText isNativeView source={html} navigation={navigation} />;
};

ModuleX.propTypes = {
  richTextList: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.string)).isRequired,
  navigation: PropTypes.shape({}),
};

ModuleX.defaultProps = {
  navigation: {},
};
export default ModuleX;
