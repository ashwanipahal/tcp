import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, FlatList, Dimensions } from 'react-native';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
  getProductListToPathInMobileApp,
} from '../../ProductList/utils/productsCommonUtils';
import { DamImage } from '../../../../../../common/atoms';
import OutOfStockWaterMark from '../../../../ProductDetail/molecules/OutOfStockWaterMark';

const win = Dimensions.get('window');
const paddingAroundImage = 24;
const numberOfColumn = 2;
const imageWidth = win.width / numberOfColumn;
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

  renderOutOfStockOverlay = () => {
    const { keepAlive, outOfStockLabels } = this.props;
    return keepAlive ? <OutOfStockWaterMark label={outOfStockLabels.outOfStockCaps} /> : null;
  };

  render() {
    const {
      item,
      selectedColorIndex,
      onGoToPDPPage,
      productImageWidth,
      productImageHeight,
      isFavorite,
    } = this.props;
    const { activeSlideIndex } = this.state;
    const { colorsMap, imagesByColor, productInfo } = item;
    const pdpUrl = productInfo ? productInfo.pdpUrl : item.pdpUrl;
    const modifiedPdpUrl = getProductListToPathInMobileApp(pdpUrl) || '';
    const { colorProductId } = (colorsMap && colorsMap[selectedColorIndex]) || item.skuInfo;
    const curentColorEntry = getMapSliceForColorProductId(colorsMap, colorProductId);
    const imageUrls = getImagesToDisplay({
      imagesByColor,
      curentColorEntry,
      isAbTestActive: true,
      isFavoriteView: isFavorite,
    });
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
          return (
            <TouchableOpacity
              onPress={() => onGoToPDPPage(modifiedPdpUrl, colorProductId, productInfo)}
              accessible={index === activeSlideIndex}
              accessibilityRole="image"
              accessibilityLabel={`product image ${index + 1}`}
            >
              <DamImage
                key={index.toString()}
                url={imgSource.item}
                isProductImage
                height={productImageHeight || imageHeight}
                width={productImageWidth || imageWidth}
                resizeMode="contain"
              />
              {this.renderOutOfStockOverlay()}
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
  productImageHeight: PropTypes.number,
  isFavorite: PropTypes.bool,
  keepAlive: PropTypes.bool,
  outOfStockLabels: PropTypes.shape({
    outOfStockCaps: PropTypes.string,
  }),
};

ImageCarousel.defaultProps = {
  item: {},
  selectedColorIndex: 0,
  productImageWidth: null,
  productImageHeight: null,
  isFavorite: false,
  keepAlive: false,
  outOfStockLabels: {
    outOfStockCaps: '',
  },
};

export default ImageCarousel;
export { ImageCarousel as ImageCarouselVanilla };
