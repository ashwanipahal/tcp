import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { FlatList, Text, Dimensions } from 'react-native';
import CustomImage from '@tcp/core/src/components/common/atoms/CustomImage';
import PaginationDots from '@tcp/core/src/components/common/molecules/PaginationDots';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { Container, ImageTouchableOpacity, styles } from '../styles/ImageCarousel.style.native';

const win = Dimensions.get('window');
const paddingAroundImage = 24;
const imageWidth = win.width - paddingAroundImage;
const imageHeight = 400;
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

  onPageChange = dotClickedIndex => {
    this.flatListRef.scrollToIndex({ animated: true, index: dotClickedIndex });
  };

  render() {
    const { item, onImageClick, selectedColorProductId } = this.props;
    const { activeSlideIndex } = this.state;
    const imagesByColor = get(item, 'imagesByColor', null);
    const colorFitsSizesMap = get(item, 'colorFitsSizesMap', null);
    let curentColorEntry;
    let imageUrls;
    if (colorFitsSizesMap) {
      curentColorEntry = getMapSliceForColorProductId(colorFitsSizesMap, selectedColorProductId);
      imageUrls = getImagesToDisplay({
        imagesByColor,
        curentColorEntry,
        isAbTestActive: false,
        isFullSet: true,
      });
    }

    if (imageUrls && imageUrls.length > 0) {
      return (
        <Container>
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
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
                <ImageTouchableOpacity
                  onPress={() => onImageClick()}
                  accessible={index === activeSlideIndex}
                  accessibilityRole="image"
                  accessibilityLabel={`product image ${index + 1}`}
                >
                  <CustomImage
                    url={imgSource.item.regularSizeImageUrl}
                    width={imageWidth}
                    height={imageHeight}
                  />
                </ImageTouchableOpacity>
              );
            }}
          />
          <PaginationDots
            numberOfDots={imageUrls.length}
            selectedIndex={activeSlideIndex}
            onPress={this.onPageChange}
          />
        </Container>
      );
    }
    return <Text>Loading...</Text>;
  }
}

ImageCarousel.propTypes = {
  item: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

ImageCarousel.defaultProps = {
  item: {},
};

export default withStyles(ImageCarousel, styles);
export { ImageCarousel as ImageCarouselVanilla };
