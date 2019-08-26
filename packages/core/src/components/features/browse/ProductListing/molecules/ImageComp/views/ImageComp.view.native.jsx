import React from 'react';
import { Image } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import styles from '../styles/ImageComp.style.native';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../ProductList/utils/productsCommonUtils';

class ImageComp extends React.PureComponent {
  render() {
    const { item, imageIndex } = this.props;
    const { colorsMap, imagesByColor } = item;
    const { colorProductId } = colorsMap[imageIndex];
    const curentColorEntry = getMapSliceForColorProductId(colorsMap, colorProductId);
    const imageUrls = getImagesToDisplay({
      imagesByColor,
      curentColorEntry,
      isAbTestActive: true,
    });
    const imageUrl = get(imageUrls, '[0]', {});
    const { imageStyle } = styles;
    return (
      <Image
        source={{
          uri: imageUrl,
        }}
        style={imageStyle}
      />
    );
  }
}

ImageComp.propTypes = {
  item: PropTypes.shape({}),
  imageIndex: PropTypes.number,
};

ImageComp.defaultProps = {
  item: {},
  imageIndex: 0,
};

export default ImageComp;
