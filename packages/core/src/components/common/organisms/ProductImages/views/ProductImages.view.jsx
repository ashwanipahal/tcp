import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import withStyles from '../../../hoc/withStyles';
import config from '../config';
import ThumbnailsList from '../../../molecules/ThumbnailsList';
import Carousel from '../../../molecules/Carousel';
import styles, { carousalStyle } from '../styles/ProductImages.style';
import ProductDetailImage from '../../../molecules/ProductDetailImage';
import { getIconPath } from '../../../../../utils';

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
    className: PropTypes.string,
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

  render() {
    const {
      productName,
      images,
      isShowBigSizeImages,
      isZoomEnabled,

      className,
    } = this.props;
    const { currentImageIndex } = this.state;

    const thumbnailImagesPaths = Immutable.asMutable(
      images.map(image => ({
        imageUrl: image.iconSizeImageUrl,
        imageName: productName,
      }))
    );
    const imageSizePropertyName = isShowBigSizeImages ? 'bigSizeImageUrl' : 'regularSizeImageUrl';

    return (
      <div className={className}>
        <div className="preview-and-social-media-icons">
          <ThumbnailsList
            images={thumbnailImagesPaths}
            selectedImageIndex={currentImageIndex}
            onThumbnailClick={this.handleThumbnailClick}
          />
        </div>
        <div className="main-image-container-wrap">
          <div className="main-image-container">
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
                    />
                  );
                })}
            </Carousel>
          </div>
          <div className="enlarged-image-container">
            <div id="portal" className="enlarged-image" />
          </div>
        </div>
      </div>
    );
  }
}

ProductImages.defaultProps = {
  className: '',
  isShowBigSizeImages: true,
};

export default withStyles(ProductImages, styles);
export { ProductImages as ProductImagesVanilla };
