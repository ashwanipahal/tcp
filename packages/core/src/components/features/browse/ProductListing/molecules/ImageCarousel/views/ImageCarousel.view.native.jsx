import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import CustomImage from '../../../atoms/CustomImage';
import styles from '../styles/ImageCarousel.style.native';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../ProductList/utils/productsCommonUtils';

class ImageCarousel extends React.PureComponent {
  render() {
    const { item, selectedColorIndex } = this.props;
    const { colorsMap, imagesByColor } = item;
    const { colorProductId } = colorsMap[selectedColorIndex];
    const curentColorEntry = getMapSliceForColorProductId(colorsMap, colorProductId);
    const imageUrls = getImagesToDisplay({
      imagesByColor,
      curentColorEntry,
      isAbTestActive: true,
    });
    const imageUrl = get(imageUrls, '[0]', {});
    return <CustomImage imageSource={imageUrl} />;
  }
}

ImageCarousel.propTypes = {
  item: PropTypes.shape({}),
  selectedColorIndex: PropTypes.number,
};

ImageCarousel.defaultProps = {
  item: {},
  selectedColorIndex: 0,
};

export default withStyles(ImageCarousel, styles);
export { ImageCarousel as ImageCarouselVanilla };
