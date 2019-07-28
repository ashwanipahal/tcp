// @flow
import React from 'react';
import { Image } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles.native';
import style from '../Image.style';

type Props = {
  source: string,
  customStyle: Object,
};

const ImageComp = (otherProps: Props) => {
  const { source, customStyle } = otherProps;
  return <Image source={source} {...otherProps} {...customStyle} />;
};

ImageComp.propTypes = {
  customStyle: PropTypes.shape({}),
};
ImageComp.defaultProps = {
  customStyle: {},
};

export default withStyles(ImageComp, style);
export { ImageComp as ImageCompVanilla };
