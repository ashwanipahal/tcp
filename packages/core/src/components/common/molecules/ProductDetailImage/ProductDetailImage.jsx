import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import ReactImageMagnify from 'react-image-magnify';
import Image from '../../atoms/Image';
import withStyles from '../../hoc/withStyles';
import styles from './ProductDetailImage.style';

const ProductDetailImage = props => {
  const { imageName, imageUrl, zoomImageUrl, className, isZoomEnabled } = props;
  let productSectionWidth;
  if (ExecutionEnvironment.canUseDOM) {
    productSectionWidth =
      document.getElementById('productDetailsSection') &&
      document.getElementById('productDetailsSection').offsetWidth;
  }
  return (
    <div itemScope itemType="http://schema.org/ImageObject" className={className} title={imageName}>
      {isZoomEnabled ? (
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
      ) : (
        <Image src={imageUrl} alt={imageName} itemProp="contentUrl" />
      )}
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
  isZoomEnabled: PropTypes.bool,
};

ProductDetailImage.defaultProps = {
  className: '',
  imageName: '',
  isZoomEnabled: true,
};

export default withStyles(ProductDetailImage, styles);
export { ProductDetailImage as ProductDetailImageVanilla };
