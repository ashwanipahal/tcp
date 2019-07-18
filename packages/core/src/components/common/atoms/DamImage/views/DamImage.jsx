import React from 'react';
import { PropTypes } from 'prop-types';
import { withTheme } from 'styled-components';

const getBreakpointImgUrl = (type, props) => {
  const {
    theme: { breakpoints },
    path,
    imgPath,
    imgConfigs,
  } = props;

  const breakpointTypeIndex = breakpoints.keys.indexOf(type);
  const breakpoint = breakpoints.values[type];

  let config = `w_${breakpoint}`;
  if (imgConfigs[breakpointTypeIndex]) {
    config = imgConfigs[breakpointTypeIndex];
  }
  return `${path}/${config}/${imgPath}`;
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

  return (
    <picture>
      {imgConfigs[3] ? (
        <source
          media={`(min-width: ${breakpoints.values.xl}px)`}
          srcSet={getBreakpointImgUrl('xl', props)}
        />
      ) : null}

      <source
        media={`(min-width: ${breakpoints.values.lg}px)`}
        srcSet={getBreakpointImgUrl(imgConfigs[2] ? 'lg' : 'xl', props)}
      />

      <source
        media={`(min-width: ${breakpoints.values.sm}px)`}
        srcSet={getBreakpointImgUrl(imgConfigs[1] ? 'sm' : 'lg', props)}
      />

      <img
        src={getBreakpointImgUrl(imgConfigs[0] ? 'xs' : 'sm', props)}
        alt={alt}
        title={alt}
        {...other}
      />
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
