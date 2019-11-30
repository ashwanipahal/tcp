import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import { FlatList, Text, Dimensions, Share, SafeAreaView } from 'react-native';
import { withTheme } from 'styled-components/native';
import PaginationDots from '@tcp/core/src/components/common/molecules/PaginationDots';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Notification from '@tcp/core/src/components/common/molecules/Notification/views/Notification.native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  Container,
  FavoriteAndPaginationContainer,
  FavoriteContainer,
  DownloadContainer,
  ImageTouchableOpacity,
  styles,
  EmptyView,
} from '../styles/ImageCarousel.style.native';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../../../../common/atoms/Icon/Icon.constants';
import { DamImage } from '../../../../../../common/atoms';
import { ModalViewWrapper } from '../../../../../account/LoginPage/molecules/LoginForm/LoginForm.style.native';
import ModalNative from '../../../../../../common/molecules/Modal/index';
import LoginPageContainer from '../../../../../account/LoginPage/index';
import OutOfStockWaterMark from '../../OutOfStockWaterMark';

const win = Dimensions.get('window');
const paddingAroundImage = 24;
const imageWidth = win.width - paddingAroundImage;
const imageHeight = 400;
class ImageCarousel extends React.PureComponent {
  favoriteIconColor;

  favoriteIconSize;

  constructor(props) {
    super(props);
    this.state = {
      activeSlideIndex: 0,
      showModal: false,
      productId: '',
    };
    const { theme } = props;
    this.favoriteIconColor = get(theme, 'colorPalette.gray[600]', '#9b9b9b');
    this.favoriteIconSize = get(theme, 'typography.fontSizes.fs25', 25);
  }

  componentWillUnmount() {
    const { removeAddToFavoritesErrorMsg } = this.props;
    if (typeof removeAddToFavoritesErrorMsg === 'function') {
      removeAddToFavoritesErrorMsg('');
    }
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

  static getDerivedStateFromProps(props, state) {
    const { onAddItemToFavorites, skuId, currentColorEntry, isLoggedIn } = props;
    const { colorProductId } = currentColorEntry;
    const { productId, showModal } = state;
    if (isLoggedIn && showModal) {
      if (productId !== '') {
        onAddItemToFavorites({
          colorProductId: productId,
          productSkuId: (skuId && skuId.skuId) || null,
          pdpColorProductId: colorProductId,
          page: 'PDP',
        });
      }
      return { showModal: false };
    }
    return null;
  }

  // this method call when tap on the pagination dots and navigate to clicked image
  onPageChange = dotClickedIndex => {
    this.flatListRef.scrollToIndex({ animated: true, index: dotClickedIndex });
  };

  onFavorite = productId => {
    const { isLoggedIn, onAddItemToFavorites, skuId, currentColorEntry } = this.props;
    const { colorProductId } = currentColorEntry;

    if (!isLoggedIn) {
      this.setState({ productId });
      this.setState({ showModal: true });
    } else {
      onAddItemToFavorites({
        colorProductId: productId,
        productSkuId: (skuId && skuId.skuId) || null,
        pdpColorProductId: colorProductId,
        page: 'PDP',
      });
    }
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

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

  renderComponent = ({ isUserLoggedIn }) => {
    let componentContainer = null;
    if (!isUserLoggedIn) {
      componentContainer = (
        <LoginPageContainer
          onRequestClose={this.toggleModal}
          isUserLoggedIn={isUserLoggedIn}
          showLogin={this.showloginModal}
          variation="favorites"
        />
      );
    }
    return <React.Fragment>{componentContainer}</React.Fragment>;
  };

  renderOutOfStockOverlay = () => {
    const { keepAlive, outOfStockLabels } = this.props;
    return keepAlive ? (
      <OutOfStockWaterMark label={outOfStockLabels.outOfStockCaps} fontSize="fs24" />
    ) : null;
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
        <DamImage
          key={index.toString()}
          url={imgSource.item.regularSizeImageUrl}
          isProductImage
          width={imageWidth}
          height={imageHeight}
        />
        {this.renderOutOfStockOverlay()}
      </ImageTouchableOpacity>
    );
  };

  renderFavoriteIcon = () => {
    const { currentColorEntry, isBundleProduct, currentProduct } = this.props;
    const { favoritedCount, isFavorite, miscInfo } = currentColorEntry;
    const { productId } = currentProduct;
    if (!isBundleProduct) {
      return (
        <FavoriteContainer>
          {isFavorite !== undefined || miscInfo.isInDefaultWishlist ? (
            <CustomIcon
              isButton
              iconFontName={ICON_FONT_CLASS.Icomoon}
              name={ICON_NAME.filledHeart}
              size={this.favoriteIconSize}
              color="gray.500"
              dataLocator="pdp_favorite_icon"
            />
          ) : (
            <CustomIcon
              isButton
              name={ICON_NAME.favorite}
              size={this.favoriteIconSize}
              color="gray.600"
              dataLocator="pdp_favorite_icon"
              onPress={() => {
                this.onFavorite(productId);
              }}
            />
          )}
          <BodyCopy
            dataLocator="pdp_favorite_icon_count"
            margin="0 0 0 8px"
            mobileFontFamily="secondary"
            fontSize="fs10"
            fontWeight="regular"
            color="gray.600"
            text={favoritedCount}
          />
        </FavoriteContainer>
      );
    }
    return <EmptyView />;
  };

  render() {
    const { imageUrls, isLoggedIn, isGiftCard, AddToFavoriteErrorMsg } = this.props;

    const { activeSlideIndex, showModal } = this.state;

    if (imageUrls && imageUrls.length > 0) {
      return (
        <Container>
          {AddToFavoriteErrorMsg !== '' && (
            <Notification status="error" message={`Error : ${AddToFavoriteErrorMsg}`} />
          )}
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
          {!isGiftCard ? (
            <FavoriteAndPaginationContainer>
              {this.renderFavoriteIcon()}
              {imageUrls.length > 1 && (
                <PaginationDots
                  numberOfDots={imageUrls.length}
                  selectedIndex={activeSlideIndex}
                  onPress={this.onPageChange}
                />
              )}
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
          ) : null}
          <FavoriteAndPaginationContainer>
            {showModal && (
              <ModalNative
                isOpen={showModal}
                onRequestClose={this.toggleModal}
                heading="LOG IN"
                headingFontFamily="secondary"
                fontSize="fs16"
              >
                <SafeAreaView>
                  <ModalViewWrapper>
                    {this.renderComponent({
                      isLoggedIn,
                    })}
                  </ModalViewWrapper>
                </SafeAreaView>
              </ModalNative>
            )}
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
  isGiftCard: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  currentProduct: PropTypes.shape({}),
  onAddItemToFavorites: PropTypes.func,
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
  currentColorEntry: PropTypes.string,
  isBundleProduct: PropTypes.bool,
  keepAlive: PropTypes.bool,
  skuId: PropTypes.string,
  outOfStockLabels: PropTypes.shape({
    outOfStockCaps: PropTypes.string,
  }),
};

ImageCarousel.defaultProps = {
  theme: {},
  imageUrls: [],
  isGiftCard: false,
  isLoggedIn: false,
  currentProduct: {},
  onAddItemToFavorites: () => {},
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
  currentColorEntry: '',
  isBundleProduct: false,
  keepAlive: false,
  outOfStockLabels: {
    outOfStockCaps: '',
  },
  skuId: '',
};

export default withStyles(withTheme(ImageCarousel), styles);
export { ImageCarousel as ImageCarouselVanilla };
