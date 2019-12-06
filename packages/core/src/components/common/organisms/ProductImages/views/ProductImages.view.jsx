import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy, Image } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import config from '../config';
import ThumbnailsList from '../../../molecules/ThumbnailsList';
import FullSizeImageModal from '../../../../features/browse/ProductDetail/molecules/FullSizeImageModal/views/FullSizeImageModal.view';
import Carousel from '../../../molecules/Carousel';
import styles, { carousalStyle } from '../styles/ProductImages.style';
import ProductDetailImage from '../../../molecules/ProductDetailImage';
import { getIconPath, getLocator, getVideoUrl } from '../../../../../utils';
import SocialConnect from './SocialConnect.view';
import OutOfStockWaterMarkView from '../../../../features/browse/ProductDetail/molecules/OutOfStockWaterMark';

// function to return Thumbnails list to show on PDP and full size page
const getThumbnailList = (
  isThumbnailListVisible,
  thumbnailImagesPaths,
  currentImageIndex,
  onThumbnailClick
) => {
  return (
    isThumbnailListVisible && (
      <div className="preview-and-social-media-icons">
        <ThumbnailsList
          images={thumbnailImagesPaths}
          selectedImageIndex={currentImageIndex}
          onThumbnailClick={onThumbnailClick}
        />
      </div>
    )
  );
};
class ProductImages extends React.Component {
  static propTypes = {
    /** Product's Name (global product, not by color, size, fit or some clasification) */
    productName: PropTypes.string.isRequired,

    /** list of images of the product */
    images: PropTypes.arrayOf(
      PropTypes.shape({
        iconSizeImageUrl: PropTypes.string.isRequired,
        regularSizeImageUrl: PropTypes.string.isRequired,
        bigSizeImageUrl: PropTypes.string.isRequired,
        superSizeImageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
    pdpLabels: PropTypes.shape({
      fullSize: PropTypes.string,
    }).isRequired,
    /**
     * Flags if we should show big size images, instead of regular size
     * images (default behavior)
     */
    isShowBigSizeImages: PropTypes.bool,
    isGiftCard: PropTypes.bool,

    /** Flags if the zoom should be enabled */
    isZoomEnabled: PropTypes.bool.isRequired,
    isThumbnailListVisible: PropTypes.bool.isRequired,
    className: PropTypes.string,
    isFullSizeVisible: PropTypes.bool,
    isFullSizeForTab: PropTypes.bool,
    onCloseClick: PropTypes.func.isRequired,
    isFullSizeModalOpen: PropTypes.bool,
    isMobile: PropTypes.bool,
    outOfStockLabels: PropTypes.shape({
      outOfStockCaps: PropTypes.string,
    }),
    keepAlive: PropTypes.bool,
    accessibilityLabels: PropTypes.shape({}),
    ratingsProductId: PropTypes.string,
  };

  state = {
    currentImageIndex: 0,
  };

  constructor(props) {
    super(props);

    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
  }

  handleThumbnailClick = imageIndex => {
    this.setState({ currentImageIndex: imageIndex });
  };

  getImageWrapperCss = () => {
    const { isFullSizeForTab, isMobile } = this.props;
    return [
      'main-image-container-wrap',
      isFullSizeForTab && !isMobile ? 'main-image-container-wrap-full-size' : '',
    ].join(' ');
  };

  render() {
    const {
      productName,
      images,
      isShowBigSizeImages,
      isZoomEnabled,
      isFullSizeVisible,
      className,
      isThumbnailListVisible,
      onCloseClick,
      isFullSizeModalOpen,
      isMobile,
      pdpLabels,
      isGiftCard,
      keepAlive,
      outOfStockLabels,
      accessibilityLabels,
      ratingsProductId,
    } = this.props;
    const { currentImageIndex } = this.state;
    const thumbnailImagesPaths = images.map(image => ({
      imageUrl: image.iconSizeImageUrl,
      imageName: productName,
    }));

    const imageSizePropertyName = isShowBigSizeImages ? 'bigSizeImageUrl' : 'regularSizeImageUrl';

    const { CAROUSEL_OPTIONS } = config;
    CAROUSEL_OPTIONS.beforeChange = (current, next) => {
      this.setState({ currentImageIndex: next });
    };
    return (
      <div className={className}>
        {getThumbnailList(
          isThumbnailListVisible,
          thumbnailImagesPaths,
          currentImageIndex,
          this.handleThumbnailClick
        )}
        <div className={this.getImageWrapperCss()}>
          <div className="main-image-container">
            <div className="carousel-container">
              <Carousel
                options={config.CAROUSEL_OPTIONS}
                inheritedStyles={carousalStyle}
                sliderImageIndex={currentImageIndex}
                carouselConfig={{
                  autoplay: false,
                  customArrowLeft: getIconPath('carousel-big-carrot'),
                  customArrowRight: getIconPath('carousel-big-carrot'),
                }}
              >
                {images &&
                  images.map(image => {
                    const { superSizeImageUrl } = image;
                    const isVideoUrl = getVideoUrl(superSizeImageUrl);
                    const checkZoomEnabled = isVideoUrl ? false : !isGiftCard && isZoomEnabled;
                    return (
                      <ProductDetailImage
                        imageUrl={image && image[imageSizePropertyName]}
                        zoomImageUrl={superSizeImageUrl}
                        imageName={productName}
                        isZoomEnabled={checkZoomEnabled}
                        onOpenSimpleFullSize={onCloseClick}
                        isMobile={isMobile}
                        isFullSizeModalOpen={isFullSizeModalOpen}
                      />
                    );
                  })}
              </Carousel>
              {keepAlive && (
                <OutOfStockWaterMarkView
                  label={outOfStockLabels.outOfStockCaps}
                  fontSizes={['fs16', 'fs16', 'fs48']}
                />
              )}
            </div>
            <div className="social-connect-wrapper">
              {isFullSizeVisible && !isGiftCard && (
                <span className="fullSize-image-label">
                  <Anchor
                    className="resize-text"
                    aria-label="View full size image"
                    onClick={onCloseClick}
                    dataLocator={getLocator('pdp_full_size_btn')}
                  >
                    <Image
                      alt={pdpLabels.fullSize}
                      className="icon-expand"
                      src={getIconPath('icon-expand')}
                      height="25px"
                    />
                    <BodyCopy fontFamily="secondary" fontSize="fs10">
                      {pdpLabels.fullSize}
                    </BodyCopy>
                  </Anchor>
                </span>
              )}
              {isFullSizeVisible && (
                <SocialConnect
                  isFacebookEnabled
                  isPinterestEnabled
                  isTwitterEnabled
                  accessibilityLabels={accessibilityLabels}
                  ratingsProductId={ratingsProductId}
                />
              )}
            </div>
          </div>

          <div className="enlarged-image-container">
            <div id="portal" className="enlarged-image" />
          </div>
        </div>

        {isFullSizeModalOpen &&
          (isMobile ? (
            <FullSizeImageModal
              name={productName}
              modalLabel={pdpLabels.fullSize}
              image={images[currentImageIndex] && images[currentImageIndex][imageSizePropertyName]}
              onCloseClick={onCloseClick}
            />
          ) : null)}
      </div>
    );
  }
}

ProductImages.defaultProps = {
  className: '',
  isShowBigSizeImages: false,
  isFullSizeForTab: false,
  isFullSizeVisible: true,
  isFullSizeModalOpen: false,
  isMobile: true,
  isGiftCard: false,
  outOfStockLabels: {
    outOfStockCaps: '',
  },
  keepAlive: false,
  accessibilityLabels: {},
  ratingsProductId: '',
};

export default withStyles(ProductImages, styles);
export { ProductImages as ProductImagesVanilla };
