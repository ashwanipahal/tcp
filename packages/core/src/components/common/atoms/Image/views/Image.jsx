import React from 'react';
import { PropTypes } from 'prop-types';
import { withTheme } from 'styled-components';

import withStyles from '../../../hoc/withStyles';
import styles from '../Image.style';

const Image = ({
  className,
  src,
  srcset,
  sizes,
  placeholderSrc,
  alt,
  inheritedStyles,
  ref,
  ...other
}) => (
  <img
    className={className}
    src={src}
    srcSet={srcset || null}
    sizes={sizes || null}
    alt={alt}
    ref={ref}
    {...other}
    onError={
      placeholderSrc
        ? event => {
            // eslint-disable-next-line no-param-reassign
            event.target.src = placeholderSrc;
          }
        : null
    }
  />
);

Image.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
  placeholderSrc: PropTypes.string,
  alt: PropTypes.string.isRequired,
  inheritedStyles: PropTypes.string,
  ref: PropTypes.func,
};

Image.defaultProps = {
  srcset: '',
  sizes: '',
  placeholderSrc: '',
  inheritedStyles: '',
  ref: () => {},
};

export default withStyles(Image, styles);
export { Image as ImageVanilla };

function CloudinaryImageVanilla(props) {
  const {
    // eslint-disable-next-line
    theme: { breakpoints },
    path,
    imgPath,
    imgConfig,
    ...other
  } = props;

  const srcSetConfig = breakpoints.keys.reduce(
    (config, breakpointKey, breakpointKeyIndex) => {
      const breakpointValue = breakpoints.values[breakpointKey];
      let cloudinaryImgConfig = imgConfig[breakpointKeyIndex] || '';
      let imgSize = breakpointKeyIndex === 0 && breakpointValue === 0 ? 468 : breakpointValue;

      if (cloudinaryImgConfig) {
        imgSize = cloudinaryImgConfig.match(/w_(\d+)/);
        imgSize = imgSize && imgSize[1];
      } else {
        cloudinaryImgConfig = `w_${imgSize}`;
      }

      const src = `${path}/${cloudinaryImgConfig}/${imgPath} ${imgSize}w`;
      const size = `(min-width: ${breakpointValue}px) ${breakpointValue + 60}px`;
      config.srcSet.push(src);
      config.sizes.push(size);
      return config;
    },
    { srcSet: [], sizes: [] }
  );

  return (
    <Image srcSet={srcSetConfig.srcSet.join(',')} sizes={srcSetConfig.sizes.join(',')} {...other} />
  );
}

CloudinaryImageVanilla.defaultProps = {
  imgConfig: [],
  // imgConfigPresent: null,
  path: 'https://res.cloudinary.com/tcp-dam-test/image/upload',
};

CloudinaryImageVanilla.propTypes = {
  /* Image path which will be appended after the cloudinary configuration */
  imgPath: PropTypes.string.isRequired,

  /* Image path of the Cloudinary  */
  path: PropTypes.string,

  /*
    Configuration of the cloudinary image for the responsive images;
    The configuration should be passed as a mobile first approach;
    For instance in following, First element is mobile(default) and
    then further breakpoints
    [
      'c_crop,g_face:center,q_auto:best,w_468',
      'c_crop,g_face:center,q_auto:best,w_768',
      'c_crop,g_face:center,q_auto:best,w_1024',
    ]
  */
  imgConfig: PropTypes.arrayOf(PropTypes.string),

  // /*
  //   Named cloudinary transformation presents; Should be passed as mobile first approach;
  //   For Instance in following,
  //   [
  //     'crop_m',
  //     'crop_t',
  //     'crop_d',
  //   ]
  // */
  // imgConfigPresent: PropTypes.Array,
};

const CloudinaryImage = withTheme(CloudinaryImageVanilla);
CloudinaryImage.defaultProps = CloudinaryImageVanilla.defaultProps;
export { CloudinaryImage };
