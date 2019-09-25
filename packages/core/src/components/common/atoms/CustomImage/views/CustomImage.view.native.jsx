import React from 'react';
import PropTypes from 'prop-types';
import ImageZoom from 'react-native-image-pan-zoom';

import withStyles from '../../../hoc/withStyles.native';
import ImageContainer from '../styles/CustomImage.style.native';
import { getScreenWidth, getScreenHeight } from '../../../../../utils/index.native';

const CustomImage = props => {
  const { source, url, width, height, resizeMode, allowZoom } = props;
  if (allowZoom) {
    return (
      <ImageZoom
        cropWidth={getScreenWidth()}
        cropHeight={getScreenHeight()}
        imageWidth={width}
        imageHeight={height}
        doubleClickInterval={500}
      >
        <ImageContainer
          {...props}
          width={width}
          height={height}
          resizeMode={resizeMode}
          source={!source ? { uri: url } : source}
          enableCenterFocus={false}
        />
      </ImageZoom>
    );
  }
  return (
    <ImageContainer
      width={width}
      height={height}
      resizeMode={resizeMode}
      source={!source ? { uri: url } : source}
    />
  );
};

CustomImage.propTypes = {
  source: PropTypes.shape({}),
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  resizeMode: PropTypes.string,
  allowZoom: PropTypes.bool,
};

CustomImage.defaultProps = {
  source: null,
  url: null,
  width: 347, // sample default value as per the pdp
  height: 427, // sample default value as per the pdp
  resizeMode: 'contain',
  allowZoom: false,
};

export default withStyles(CustomImage);
export { CustomImage as CustomImageVanilla };
