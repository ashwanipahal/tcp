import React from 'react';
import { PropTypes } from 'prop-types';
import { withTheme } from 'styled-components';

/*
  Based on breakpoints defined on theme, it will create the srcset according to
  the breakpoints; If user only send the Cloudinary imgPath, it add the
  configuration according to the breakpoints; For ony adding width property;
  If width found on imgConfigs (cloudinary config) then it will use to create srcset;
*/

const getSrcSetConfig = props => {
  const { breakpoints, path, imgPath, imgConfigs } = props;

  return breakpoints.keys
    .map((breakpointKey, breakpointKeyIndex) => {
      const breakpointValue = breakpoints.values[breakpointKey];
      let cloudinaryImgConfig = imgConfigs[breakpointKeyIndex] || '';

      if (!cloudinaryImgConfig) {
        cloudinaryImgConfig = breakpointValue ? `w_${breakpointValue}` : null;
      }

      return cloudinaryImgConfig
        ? { url: `${path}/${cloudinaryImgConfig}/${imgPath}`, size: breakpointValue }
        : null;
    })
    .filter(val => val);
};

const DamImage = props => {
  const {
    theme: { breakpoints },
    path,
    imgPath,
    imgConfigs,
    alt,
    ...other
  } = props;

  const srcSetConfigs = getSrcSetConfig({ breakpoints, path, imgPath, imgConfigs });
  return (
    <picture>
      {srcSetConfigs
        .slice(0)
        .reverse()
        .map(config => {
          const { url, size } = config;
          return size ? <source media={`(min-width: ${size}px)`} srcSet={url} key={url} /> : null;
        })}
      <img src={srcSetConfigs[0].url} alt={alt} title={alt} {...other} />
    </picture>
  );
};

DamImage.defaultProps = {
  theme: {},
  imgConfigs: [],
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
  imgConfigs: PropTypes.arrayOf(PropTypes.string),

  /* Description of the image */
  alt: PropTypes.string.isRequired,
};

export default withTheme(DamImage);
export { DamImage as DamImageVanilla };
