import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useImageLoadedState from '@tcp/web/src/hooks/useImageLoadedState';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { HERO_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import { BodyCopy, Anchor, DamImage } from '../../../../../../common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CategoryPromoImages.style';
import config from '../config';

const ImageComponent = ({
  image,
  link,
  className,
  titleClass,
  linkClass,
  imgDataConfig,
  imgRef,
}) => {
  return (
    <div className={`${className} image-tile-desktop`}>
      <Anchor>
        <DamImage
          forwardedRef={imgRef}
          imgConfigs={imgDataConfig}
          imgData={image}
          link={{
            ...link,
          }}
        />
      </Anchor>
      <div>
        <BodyCopy
          fontSize={['fs14', 'fs24', 'fs24']}
          fontWeight="semibold"
          fontFamily="secondary"
          color="gray.900"
          textAlign="center"
          className={titleClass}
        >
          {link.title}
        </BodyCopy>
        <Anchor to={link.url} asPath={link.url} className={linkClass}>
          <BodyCopy
            fontSize={['fs12', 'fs22', 'fs22']}
            fontFamily="secondary"
            color="gray.900"
            textAlign="center"
          >
            {link.text ? `${link.text} > ` : ''}
          </BodyCopy>
        </Anchor>
      </div>
    </div>
  );
};

/**
 * Specialized variation to use for the category promo image that needs
 * a UX timer for performance tracking
 */
function HeroImageComponent(props) {
  const imgRef = useRef();
  const imageLoaded = useImageLoadedState(imgRef);
  return (
    <>
      <ImageComponent {...props} imgRef={imgRef} />
      {imageLoaded && <RenderPerf.Measure name={HERO_VISIBLE} />}
    </>
  );
}

const CategoryPromoImages = ({ className, categoryPromoImages }) => {
  const combinedCategoryImages = [];
  const tabMobileCombinedCategoryImages = [];
  if (Object.keys(categoryPromoImages).length) {
    Object.keys(categoryPromoImages).forEach(contentId => {
      tabMobileCombinedCategoryImages.push(
        categoryPromoImages[contentId].imageGrid.map(imageGrid => {
          const { image, link } = imageGrid;
          return (
            <ImageComponent
              titleClass="image-title-2-up"
              linkClass="image-link-2-up"
              className="image-tile-desktop-2-up"
              image={image}
              key={image.image}
              link={link}
              imgDataConfig={config.IMG_DATA_2.imgConfig}
            />
          );
        })
      );

      if (categoryPromoImages[contentId].images === '4') {
        combinedCategoryImages.push(
          <div className="image-variant-wrapper">
            {categoryPromoImages[contentId].imageGrid.map(imageGrid => {
              const { image, link } = imageGrid;
              return (
                <ImageComponent
                  key={`${link.text}`}
                  image={image}
                  link={link}
                  titleClass="image-title-4-up"
                  linkClass="image-link-4-up"
                  className="image-tile-desktop-4-up"
                  imgDataConfig={config.IMG_DATA_4.imgConfig}
                />
              );
            })}
          </div>
        );
      } else if (categoryPromoImages[contentId].images === '6') {
        combinedCategoryImages.push(
          <div className="image-variant-wrapper">
            {categoryPromoImages[contentId].imageGrid.map(imageGrid => {
              const { image, link } = imageGrid;
              return (
                <ImageComponent
                  titleClass="image-title-3-up"
                  linkClass="image-link-3-up"
                  image={image}
                  link={link}
                  className="image-tile-desktop-3-up"
                  imgDataConfig={config.IMG_DATA_6.imgConfig}
                />
              );
            })}
          </div>
        );
      } else if (categoryPromoImages[contentId].images === '2') {
        combinedCategoryImages.push(
          <div className="image-variant-wrapper">
            {categoryPromoImages[contentId].imageGrid.map(imageGrid => {
              const { image, link } = imageGrid;
              return (
                <ImageComponent
                  titleClass="image-title-2-up"
                  linkClass="image-link-2-up"
                  className="image-tile-desktop-2-up"
                  image={image}
                  link={link}
                  imgDataConfig={config.IMG_DATA_2.imgConfig}
                />
              );
            })}
          </div>
        );
      } else if (categoryPromoImages[contentId].images === '1') {
        combinedCategoryImages.push(
          <div className="image-variant-wrapper">
            {categoryPromoImages[contentId].imageGrid.map(imageGrid => {
              const { image, link } = imageGrid;
              return (
                <HeroImageComponent
                  titleClass="image-title-fullBleed"
                  linkClass="image-link-fullBleed"
                  className="image-tile-full-bleed"
                  image={image}
                  link={link}
                  imgDataConfig={config.IMG_DATA_1.imgConfig}
                />
              );
            })}
          </div>
        );
      }
    });
  }

  return (
    <div className={className}>
      <div className="image-variant-wrapper clp-desktop-view">{combinedCategoryImages}</div>
      <div className="image-variant-wrapper clp-mobile-tab-view">
        {tabMobileCombinedCategoryImages}
      </div>
    </div>
  );
};

CategoryPromoImages.propTypes = {
  className: PropTypes.string.isRequired,
  categoryPromoImages: PropTypes.string.isRequired,
};

ImageComponent.propTypes = {
  className: PropTypes.string.isRequired,
  titleClass: PropTypes.string.isRequired,
  linkClass: PropTypes.string.isRequired,
  image: PropTypes.shape({}).isRequired,
  link: PropTypes.shape({}).isRequired,
  imgDataConfig: PropTypes.shape([]).isRequired,
  imgRef: PropTypes.shape({ current: PropTypes.any }),
};

ImageComponent.defaultProps = {
  imgRef: null,
};

export default withStyles(CategoryPromoImages, styles);

export { CategoryPromoImages as CategoryPromoImagesVanilla };
