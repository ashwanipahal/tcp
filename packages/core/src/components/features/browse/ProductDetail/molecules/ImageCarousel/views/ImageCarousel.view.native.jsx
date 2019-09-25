import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { FlatList, Text, Dimensions } from 'react-native';
import { withTheme } from 'styled-components/native';
import CustomImage from '@tcp/core/src/components/common/atoms/CustomImage';
import PaginationDots from '@tcp/core/src/components/common/molecules/PaginationDots';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import {
  Container,
  FavoriteAndPaginationContainer,
  FavoriteContainer,
  DownloadContainer,
  ImageTouchableOpacity,
  styles,
} from '../styles/ImageCarousel.style.native';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_NAME } from '../../../../../../common/atoms/Icon/Icon.constants';

const win = Dimensions.get('window');
const paddingAroundImage = 24;
const imageWidth = win.width - paddingAroundImage;
const imageHeight = 400;
class ImageCarousel extends React.PureComponent {
  favoriteIconColor;

  favoriteIconSize;

  constructor(props) {
    super(props);
    this.state = { activeSlideIndex: 0 };
    const { theme } = props;
    this.favoriteIconColor = get(theme, 'colorPalette.gray[600]', '#9b9b9b');
    this.favoriteIconSize = get(theme, 'typography.fontSizes.fs25', 25);
  }

  // this method set current visible image
  setActiveSlideIndex = index => {
    const { activeSlideIndex } = this.state;
    if (index !== activeSlideIndex) {
      this.setState({
        activeSlideIndex: index,
      });
    }
  };

  // this method when swipe image and return changed view
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

  // this method call when tap on the pagination dots and navigate to clicked image
  onPageChange = dotClickedIndex => {
    this.flatListRef.scrollToIndex({ animated: true, index: dotClickedIndex });
  };

  onFavorite = () => {};

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
          <FavoriteAndPaginationContainer>
            <FavoriteContainer>
              <CustomIcon
                name={ICON_NAME.favorite}
                size={this.favoriteIconSize}
                color={this.favoriteIconColor}
                onPress={this.onFavorite}
                isButton
                dataLocator="pdp_favorite_icon"
              />
              <BodyCopy
                dataLocator="pdp_favorite_icon_count"
                margin="0 0 0 8px"
                mobileFontFamily="secondary"
                fontSize="fs10"
                fontWeight="regular"
                color="gray.600"
                text="100"
              />
            </FavoriteContainer>
            <PaginationDots
              numberOfDots={imageUrls.length}
              selectedIndex={activeSlideIndex}
              onPress={this.onPageChange}
            />
            <DownloadContainer />
          </FavoriteAndPaginationContainer>
        </Container>
      );
    }
    return <Text>Loading...</Text>;
  }
}

ImageCarousel.propTypes = {
  theme: PropTypes.shape({}),
  item: PropTypes.shape({}),
  selectedColorProductId: PropTypes.number.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

ImageCarousel.defaultProps = {
  theme: {},
  item: {},
};

export default withStyles(withTheme(ImageCarousel), styles);
export { ImageCarousel as ImageCarouselVanilla };
