import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import Immutable from 'seamless-immutable';
import { Anchor } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import config from '../config';
import { breakpoints } from '../../../../../../styles/themes/TCP/mediaQuery';
import ThumbnailsList from '../../../molecules/ThumbnailsList';
import FullSizeImageWithQuickViewModal from '../../../../features/browse/ProductDetail/molecules/FullSizeImageWithQuickViewModal/views/FullSizeImageWithQuickViewModal.view';
import FullSizeImageModal from '../../../../features/browse/ProductDetail/molecules/FullSizeImageModal/views/FullSizeImageModal.view';
import Carousel from '../../../molecules/Carousel';
import styles, { carousalStyle } from '../styles/ProductImages.style';
import ProductDetailImage from '../../../molecules/ProductDetailImage';
import { getIconPath } from '../../../../../utils';

const getThumbNailList = (
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

    /**
     * Flags if we should show big size images, instead of regular size
     * images (default behavior)
     */
    isShowBigSizeImages: PropTypes.bool,

    /** Flags if the zoom should be enabled */
    isZoomEnabled: PropTypes.bool.isRequired,
    isThumbnailListVisible: PropTypes.bool.isRequired,
    className: PropTypes.string,
    isFullSizeVisible: PropTypes.bool,
    isFullSizeForTab: PropTypes.bool,
  };

  state = {
    currentImageIndex: 0,
    isFullSizeModalOpen: false,
  };

  constructor(props) {
    super(props);

    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.handleShowFullSizeModalClick = this.handleShowFullSizeModalClick.bind(this);
    this.handleCloseFullSizeModalClick = this.handleCloseFullSizeModalClick.bind(this);
  }

  handleThumbnailClick = imageIndex => {
    this.setState({ currentImageIndex: imageIndex });
  };

  handleShowFullSizeModalClick(e) {
    e.preventDefault();
    this.setState({ isFullSizeModalOpen: true });
  }

  handleCloseFullSizeModalClick() {
    this.setState({ isFullSizeModalOpen: false });
  }

  render() {
    const {
      productName,
      images,
      isShowBigSizeImages,
      isZoomEnabled,
      isFullSizeVisible,
      className,
      isThumbnailListVisible,
      isFullSizeForTab,
    } = this.props;
    const { currentImageIndex, isFullSizeModalOpen } = this.state;

    const thumbnailImagesPaths = Immutable.asMutable(
      images.map(image => ({
        imageUrl: image.iconSizeImageUrl,
        imageName: productName,
      }))
    );
    const imageSizePropertyName = isShowBigSizeImages ? 'bigSizeImageUrl' : 'regularSizeImageUrl';
    const isMobile =
      ExecutionEnvironment.canUseDOM && document.body.offsetWidth < breakpoints.values.sm;
    const { CAROUSEL_OPTIONS } = config;
    CAROUSEL_OPTIONS.beforeChange = (current, next) => {
      this.setState({ currentImageIndex: next });
    };
    return (
      <div className={className}>
        {getThumbNailList(
          isThumbnailListVisible,
          thumbnailImagesPaths,
          currentImageIndex,
          this.handleThumbnailClick
        )}
        <div
          className={[
            'main-image-container-wrap',
            isFullSizeForTab && !isMobile ? 'main-image-container-wrap-full-size' : '',
          ].join(' ')}
        >
          <div className="main-image-container">
            {
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
                    return (
                      <ProductDetailImage
                        imageUrl={image && image[imageSizePropertyName]}
                        zoomImageUrl={superSizeImageUrl}
                        imageName={productName}
                        isZoomEnabled={isZoomEnabled}
                        onOpenSimpleFullSize={this.handleShowFullSizeModalClick}
                        isMobile={isMobile}
                        isFullSizeModalOpen={isFullSizeModalOpen}
                      />
                    );
                  })}
              </Carousel>
            }
            {isFullSizeVisible && (
              <Anchor
                className="resize-text"
                aria-label="view full size image"
                onClick={this.handleShowFullSizeModalClick}
              >
                Full Size
              </Anchor>
            )}
          </div>

          <div className="enlarged-image-container">
            <div id="portal" className="enlarged-image" />
          </div>
        </div>

        {isFullSizeModalOpen &&
          (isMobile ? (
            <FullSizeImageModal
              name={productName}
              image={images[currentImageIndex] && images[currentImageIndex][imageSizePropertyName]}
              onCloseClick={this.handleCloseFullSizeModalClick}
            />
          ) : (
            <FullSizeImageWithQuickViewModal
              onCloseClick={this.handleCloseFullSizeModalClick}
              images={images}
              isMobile={isMobile}
              name={productName}
              isThumbnailListVisible
            />
          ))}
      </div>
    );
  }
}

ProductImages.defaultProps = {
  className: '',
  isShowBigSizeImages: false,
  isFullSizeForTab: false,
  isFullSizeVisible: true,
};

export default withStyles(ProductImages, styles);
export { ProductImages as ProductImagesVanilla };
