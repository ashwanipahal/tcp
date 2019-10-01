import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import ReactImageMagnify from 'react-image-magnify';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { Image, Anchor } from '../../atoms';
import withStyles from '../../hoc/withStyles';
import styles from './ProductDetailImage.style';
import { getLocator } from '../../../../utils';

const getNonZoomImage = (isMobile, imageUrl, imageName, onOpenSimpleFullSize) => {
  return !isMobile ? (
    <Image
      className="full-size-desktop-image"
      src={imageUrl}
      alt={imageName}
      itemProp="contentUrl"
      data-locator={getLocator('pdp_main_image')}
    />
  ) : (
    <Anchor aria-label="view full size image" onClick={onOpenSimpleFullSize}>
      <Image
        data-locator={getLocator('pdp_main_image')}
        src={imageUrl}
        alt={imageName}
        itemProp="contentUrl"
      />
    </Anchor>
  );
};

const ProductDetailImage = props => {
  const {
    imageName,
    imageUrl,
    zoomImageUrl,
    className,
    isZoomEnabled,
    onOpenSimpleFullSize,
    isMobile,
  } = props;

  let productSectionWidth;
  if (ExecutionEnvironment.canUseDOM) {
    productSectionWidth =
      document.getElementById('productDetailsSection') &&
      document.getElementById('productDetailsSection').offsetWidth;
  }
  return (
    <div itemScope itemType="http://schema.org/ImageObject" className={className} title={imageName}>
      {isZoomEnabled && !isMobile ? (
        <ReactImageMagnify
          data-locator={getLocator('pdp_main_image')}
          {...{
            enlargedImagePortalId: 'portal',
            smallImage: {
              src: imageUrl,
              isFluidWidth: true,
              alt: imageName,
            },
            enlargedImageContainerDimensions: {
              width: productSectionWidth || '100%',
              height: '100%',
            },
            largeImage: {
              src: zoomImageUrl,
              width: 900,
              height: 900,
              alt: imageName,
            },
            enlargedImageContainerClassName: 'enlarged-image-wrapper',
            isActivatedOnTouch: false,
          }}
        />
      ) : (
        getNonZoomImage(isMobile, imageUrl, imageName, onOpenSimpleFullSize)
      )}
      <RenderPerf.Measure name="render_product_photo" />
    </div>
  );
};

ProductDetailImage.propTypes = {
  imageName: PropTypes.string,

  /** the image url */
  imageUrl: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,

  /** zoom image url */
  zoomImageUrl: PropTypes.string.isRequired,

  className: PropTypes.string,
  isZoomEnabled: PropTypes.bool,
  onOpenSimpleFullSize: PropTypes.func,
};

ProductDetailImage.defaultProps = {
  className: '',
  imageName: '',
  isZoomEnabled: true,
  onOpenSimpleFullSize: () => {},
};

export default withStyles(ProductDetailImage, styles);
export { ProductDetailImage as ProductDetailImageVanilla };
