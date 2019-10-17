import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import ReactImageMagnify from 'react-image-magnify';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { HERO_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import useBooleanState from '@tcp/core/src/hooks/useBooleanState';
import { Image, Anchor } from '../../atoms';
import withStyles from '../../hoc/withStyles';
import styles from './ProductDetailImage.style';
import { getLocator } from '../../../../utils';

// eslint-disable-next-line react/prop-types
const NonZoomImage = ({ isMobile, imageUrl, imageName, onOpenSimpleFullSize }) => {
  const [isImageLoaded, handleImageLoaded] = useBooleanState(false);
  return (
    <>
      {!isMobile ? (
        <Image
          className="full-size-desktop-image"
          src={imageUrl}
          alt={imageName}
          itemProp="contentUrl"
          data-locator={getLocator('pdp_main_image')}
          onLoad={handleImageLoaded}
        />
      ) : (
        <Anchor aria-label="view full size image" onClick={onOpenSimpleFullSize}>
          <Image
            data-locator={getLocator('pdp_main_image')}
            src={imageUrl}
            alt={imageName}
            itemProp="contentUrl"
            onLoad={handleImageLoaded}
          />
        </Anchor>
      )}
      {isImageLoaded && <RenderPerf.Measure name={HERO_VISIBLE} />}
    </>
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
  const [isImageLoaded, handleImageLoaded] = useBooleanState(false);
  let productSectionWidth;
  if (ExecutionEnvironment.canUseDOM) {
    productSectionWidth =
      document.getElementById('productDetailsSection') &&
      document.getElementById('productDetailsSection').offsetWidth;
  }
  return (
    <div itemScope itemType="http://schema.org/ImageObject" className={className} title={imageName}>
      {isZoomEnabled && !isMobile ? (
        <>
          <ReactImageMagnify
            data-locator={getLocator('pdp_main_image')}
            {...{
              enlargedImagePortalId: 'portal',
              smallImage: {
                src: imageUrl,
                isFluidWidth: true,
                alt: imageName,
                onLoad: handleImageLoaded,
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
          {isImageLoaded && <RenderPerf.Measure name={HERO_VISIBLE} />}
        </>
      ) : (
        <NonZoomImage {...{ isMobile, imageUrl, imageName, onOpenSimpleFullSize }} />
      )}
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
