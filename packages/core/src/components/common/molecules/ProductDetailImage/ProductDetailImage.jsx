import React from 'react';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';
import withStyles from '../../hoc/withStyles';
import styles from './ProductDetailImage.style';

const ProductDetailImage = props => {
  const { imageName, imageUrl, zoomImageUrl, className } = props;
  let productSectionWidth;
  if (typeof window !== 'undefined') {
    productSectionWidth =
      document.getElementById('productDetailsSection') &&
      document.getElementById('productDetailsSection').offsetWidth;
  }
  return (
    <div itemScope itemType="http://schema.org/ImageObject" className={className} title={imageName}>
      <ReactImageMagnify
        {...{
          enlargedImagePortalId: 'portal',
          smallImage: {
            src: imageUrl,
            isFluidWidth: true,
          },
          enlargedImageContainerDimensions: {
            width: productSectionWidth || '100%',
            height: '100%',
          },
          largeImage: {
            src: zoomImageUrl,
            width: 900,
            height: 900,
          },
          enlargedImageContainerClassName: 'enlarged-image-wrapper',
          isActivatedOnTouch: false,
        }}
      />
    </div>
  );
};

ProductDetailImage.propTypes = {
  imageName: PropTypes.string,

  /** the image url */
  imageUrl: PropTypes.string.isRequired,

  /** zoom image url */
  zoomImageUrl: PropTypes.string.isRequired,

  className: PropTypes.string,
};

ProductDetailImage.defaultProps = {
  className: '',
  imageName: '',
};

export default withStyles(ProductDetailImage, styles);
export { ProductDetailImage as ProductDetailImageVanilla };
