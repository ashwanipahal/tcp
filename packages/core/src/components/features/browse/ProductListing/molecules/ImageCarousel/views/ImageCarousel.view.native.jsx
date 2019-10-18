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
    const { item, selectedColorIndex, onGoToPDPPage } = this.props;
    const { activeSlideIndex } = this.state;
    const { colorsMap, imagesByColor, productInfo } = item;
    const { pdpUrl } = productInfo;
    const modifiedPdpUrl = getProductListToPathInMobileApp(pdpUrl) || '';
    const { colorProductId } = colorsMap[selectedColorIndex];
    const curentColorEntry = getMapSliceForColorProductId(colorsMap, colorProductId);
    const imageUrls = getImagesToDisplay({
      imagesByColor,
      curentColorEntry,
      isAbTestActive: true,
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
              onPress={() => onGoToPDPPage(modifiedPdpUrl, colorProductId)}
              accessible={index === activeSlideIndex}
              accessibilityRole="image"
              accessibilityLabel={`product image ${index + 1}`}
            >
              <DamImage
                key={index.toString()}
                url={imgSource.item}
                isProductImage
                height={imageHeight}
                width={imageWidth}
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
};

ImageCarousel.defaultProps = {
  item: {},
  selectedColorIndex: 0,
};

export default ImageCarousel;
export { ImageCarousel as ImageCarouselVanilla };
