import React from 'react';
import { PropTypes } from 'prop-types';
import { withTheme } from 'styled-components';

const getImgData = props => {
  const { imgData, imgConfigs, imgPathSplitter } = props;
  let { basePath } = props;
  let imgPath;

  /* eslint-disable camelcase */
  const { crop_m, crop_t, crop_d, url } = imgData;
  imgConfigs[0] = crop_m || imgConfigs[0];
  imgConfigs[1] = crop_t || imgConfigs[1];
  imgConfigs[2] = crop_d || imgConfigs[2];
  /* eslint-enable camelcase */

  if (/^http/.test(url)) {
    const [imgDataBasePath, imgDataPath] = url.split(imgPathSplitter);
    basePath = `${imgDataBasePath}${imgPathSplitter}`;
    imgPath = imgDataPath;
  } else {
    imgPath = url;
  }
  imgPath = imgPath && imgPath.replace(/^\//, '');
  return { basePath, imgPath, imgConfigs };
};

const getBreakpointImgUrl = (type, props) => {
  const {
    theme: { breakpoints },
  } = props;

  const { basePath, imgPath, imgConfigs } = getImgData(props);

  const breakpointTypeIndex = breakpoints.keys.indexOf(type);
  const breakpoint = breakpoints.values[breakpoints.keys[breakpointTypeIndex + 1]];

  let config = type === 'lg' ? `w_${breakpoints.maxWidth}` : `w_${breakpoint}`;
  if (imgConfigs[breakpointTypeIndex]) {
    config = imgConfigs[breakpointTypeIndex];
  }
  return `${basePath}/${config}/${imgPath}`;
};

const DamImage = props => {
  const {
    theme: { breakpoints },
    imgConfigs,
    imgData,
    basePath,
    imgPathSplitter,
    ...other
  } = props;

  const { alt = '' } = imgData;

  return (
    <picture>
      <source
        media={`(min-width: ${breakpoints.values.lg}px)`}
        srcSet={getBreakpointImgUrl('lg', props)}
      />

      <source
        media={`(min-width: ${breakpoints.values.sm}px)`}
        srcSet={getBreakpointImgUrl('sm', props)}
      />

      <img src={getBreakpointImgUrl('xs', props)} alt={alt} {...other} />
    </picture>
  );
};

DamImage.defaultProps = {
  theme: {},
  imgConfigs: [],
  imgData: {
    crop_d: '',
    crop_t: '',
    crop_m: '',
  },
  basePath: 'https://res.cloudinary.com/tcp-dam-test/image/upload',
  imgPathSplitter: '/upload',
};

DamImage.propTypes = {
  /* StyleComponent theme, will come from context */
  theme: PropTypes.shape({ breakpoints: PropTypes.object }),

  /* Image path of the Cloudinary  */
  basePath: PropTypes.string,

  /*
    Configuration of the cloudinary image for the responsive images;
    The configuration should be passed as a mobile first approach;
    For instance in following, First element is mobile(default) and
    then further breakpoints
    [
      'c_crop,g_face:center,q_auto:best,w_768',
      'c_crop,g_face:center,q_auto:best,w_1024',
      'c_crop,g_face:center,q_auto:best,w_1440',
    ]
  */
  imgConfigs: PropTypes.arrayOf(PropTypes.string),

  /* Image Data from CMS */
  imgData: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    crop_d: PropTypes.string,
    crop_t: PropTypes.string,
    crop_m: PropTypes.string,
  }),

  /* String which will be used to split the URL */
  imgPathSplitter: PropTypes.string,
};

export default withTheme(DamImage);
export { DamImage as DamImageVanilla };
