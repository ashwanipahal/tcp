import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import { FlatList, Text, Dimensions, Share } from 'react-native';
// import Share from 'react-native-share';
import { withTheme } from 'styled-components/native';
import CustomImage from '@tcp/core/src/components/common/atoms/CustomImage';
import PaginationDots from '@tcp/core/src/components/common/molecules/PaginationDots';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  Container,
  FavoriteAndPaginationContainer,
  FavoriteContainer,
  DownloadContainer,
  ImageTouchableOpacity,
  styles,
} from '../styles/ImageCarousel.style.native';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../../../../common/atoms/Icon/Icon.constants';

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

  onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share the details on different platforms',
        url: 'http://local.childrensplace.com:3000/us/p/3000332_2155',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with activity type of result.activityType');
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  renderNormalImage = imgSource => {
    const { onImageClick } = this.props;
    const { activeSlideIndex } = this.state;

    const { index } = imgSource;
    return (
      <ImageTouchableOpacity
        onPress={onImageClick}
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
  };

  render() {
    const { imageUrls } = this.props;

    const { activeSlideIndex } = this.state;

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
            renderItem={this.renderNormalImage}
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
            <DownloadContainer>
              <CustomIcon
                iconFontName={ICON_FONT_CLASS.Icomoon}
                name={ICON_NAME.iconShare}
                size="fs18"
                color="gray.1600"
                dataLocator="pdp_social_connect"
                onPress={this.onShare}
                title="Share"
                isButton
              />
            </DownloadContainer>
          </FavoriteAndPaginationContainer>
        </Container>
      );
    }
    return <Text>Loading...</Text>;
  }
}

ImageCarousel.propTypes = {
  theme: PropTypes.shape({}),
  imageUrls: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.shape({
        regularSizeImageUrl: PropTypes.string.isRequired,
      }),
    })
  ),
  onImageClick: PropTypes.func.isRequired,
};

ImageCarousel.defaultProps = {
  theme: {},
  imageUrls: [],
};

export default withStyles(withTheme(ImageCarousel), styles);
export { ImageCarousel as ImageCarouselVanilla };
