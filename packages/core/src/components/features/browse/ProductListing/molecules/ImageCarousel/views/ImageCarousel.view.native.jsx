import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, FlatList, Dimensions } from 'react-native';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
  getProductListToPathInMobileApp,
} from '../../ProductList/utils/productsCommonUtils';
import { DamImage } from '../../../../../../common/atoms';

const win = Dimensions.get('window');
const paddingAroundImage = 24;
const numberOfColumn = 2;
const imageWidth = win.width / numberOfColumn - paddingAroundImage;
const imageHeight = '205px';

class ImageCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { activeSlideIndex: 0 };
  }

  setActiveSlideIndex = index => {
    const { activeSlideIndex } = this.state;
    if (index !== activeSlideIndex) {
      this.setState({
        activeSlideIndex: index,
      });
    }
  };

  onViewableItemsChanged = ({ changed }) => {
    const len = (changed && changed.length) || 0;
    for (let i = 0; i < len; i += 1) {
      const item = changed[i];
      const { isViewable, index } = item;
      if (isViewable) {
        this.setActiveSlideIndex(index);
        break;
      }
    }
  };

  render() {
    const { item, selectedColorIndex, onGoToPDPPage, productImageWidth } = this.props;
    const { activeSlideIndex } = this.state;
    const { colorsMap, imagesByColor, productInfo } = item;
    const { pdpUrl, name } = productInfo;
    const modifiedPdpUrl = getProductListToPathInMobileApp(pdpUrl) || '';
    const { colorProductId } = (colorsMap && colorsMap[selectedColorIndex]) || item.skuInfo;
    const curentColorEntry = getMapSliceForColorProductId(colorsMap, colorProductId);
    const imageUrls = (colorsMap &&
      getImagesToDisplay({
        imagesByColor,
        curentColorEntry,
        isAbTestActive: true,
      })) || [item.skuInfo];
    return (
      <FlatList
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        initialNumToRender={1}
        initialScrollIndex={0}
        refreshing={false}
        data={imageUrls}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        listKey={(_, index) => index.toString()}
        renderItem={imgSource => {
          const { index } = imgSource;
          const imageUrl = colorsMap
            ? imgSource.item
            : `https://test4.childrensplace.com${imgSource.item.imageUrl}`;
          return (
            <TouchableOpacity
              onPress={() => onGoToPDPPage(modifiedPdpUrl, colorProductId, name)}
              accessible={index === activeSlideIndex}
              accessibilityRole="image"
              accessibilityLabel={`product image ${index + 1}`}
            >
              <DamImage
                key={index.toString()}
                url={imageUrl}
                isProductImage
                height={imageHeight}
                width={productImageWidth || imageWidth}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

ImageCarousel.propTypes = {
  item: PropTypes.shape({}),
  selectedColorIndex: PropTypes.number,
  onGoToPDPPage: PropTypes.func.isRequired,
  productImageWidth: PropTypes.number,
};

ImageCarousel.defaultProps = {
  item: {},
  selectedColorIndex: 0,
  productImageWidth: null,
};

export default ImageCarousel;
export { ImageCarousel as ImageCarouselVanilla };
