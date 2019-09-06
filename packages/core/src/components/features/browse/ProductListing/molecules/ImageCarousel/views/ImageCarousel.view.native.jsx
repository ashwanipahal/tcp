import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import CustomImage from '../../../atoms/CustomImage';
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
    return (
      <FlatList
        initialNumToRender={1}
        initialScrollIndex={0}
        refreshing={false}
        data={imageUrls}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        listKey={(_, index) => index.toString()}
        renderItem={imageItem => {
          return <CustomImage imageSource={imageItem.item} />;
        }}
      />
    );
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

export default ImageCarousel;
export { ImageCarousel as ImageCarouselVanilla };
