import React from 'react';
import { PropTypes } from 'prop-types';
import { withTheme } from 'styled-components';

/*
  Based on breakpoints defined on theme, it will create the srcset according to
  the breakpoints; If user only send the Cloudinary imgPath, it add the
  configuration according to the breakpoints; For ony adding width property;
  If width found on imgConfig (cloudinary config) then it will use to create srcset;
*/

const getSrcSetConfig = props => {
  const { breakpoints, path, imgPath, imgConfig } = props;

  return breakpoints.keys.reduce(
    (config, breakpointKey, breakpointKeyIndex) => {
      const breakpointValue = breakpoints.values[breakpointKey];
      let cloudinaryImgConfig = imgConfig[breakpointKeyIndex] || '';
      let imgSize = breakpointKeyIndex === 0 && breakpointValue === 0 ? 468 : breakpointValue;
      // const breakpointWidth = imgSize;

      if (cloudinaryImgConfig) {
        imgSize = cloudinaryImgConfig.match(/w_(\d+)/);
        imgSize = imgSize && imgSize[1];
      } else {
        // +20 just to get better image quality
        cloudinaryImgConfig = `w_${imgSize + 20}`;
      }

      // const size = `(min-width: ${breakpointValue}px) ${breakpointValue + 60}px`;
      // const src = `${path}/${cloudinaryImgConfig}/${imgPath} ${breakpointWidth}w`;
      const src = `${path}/${cloudinaryImgConfig}/${imgPath}`;
      const size = `(min-width: ${breakpointValue}px) ${breakpointValue + 60}px`;
      config.srcSet.push(src);
      config.sizes.push(size);
      return config;
    },
    { srcSet: [], sizes: [] }
  );
};

const DamImage = props => {
  const {
    theme: { breakpoints },
    path,
    imgPath,
    imgConfig,
    alt,
    ...other
  } = props;

  const srcSetConfig = getSrcSetConfig({ breakpoints, path, imgPath, imgConfig });
  return (
    <picture>
      {breakpoints.keys.reverse().map((bpKey, i) => {
        const breakpointValue = breakpoints.values[bpKey];
        return (
          <source
            media={`(min-width: ${breakpointValue}px)`}
            srcSet={srcSetConfig.srcSet[breakpoints.keys.length - i - 1]}
          />
        );
      })}
      <img src={srcSetConfig.srcSet[1]} alt={alt} {...other} />
    </picture>
  );
};

DamImage.defaultProps = {
  theme: {},
  imgConfig: [],
  path: 'https://res.cloudinary.com/tcp-dam-test/image/upload',
};

DamImage.propTypes = {
  /* StyleComponent theme, will come from context */
  theme: PropTypes.shape({ breakpoints: PropTypes.object }),

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

  /* Description of the image */
  alt: PropTypes.string.isRequired,
};

export default withTheme(DamImage);
export { DamImage as DamImageVanilla };
