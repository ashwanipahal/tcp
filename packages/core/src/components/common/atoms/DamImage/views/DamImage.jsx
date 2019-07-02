import React from 'react';
import { PropTypes } from 'prop-types';
import { withTheme } from 'styled-components';

import withStyles from '../../../hoc/withStyles';
import styles from '../DamImage.style';
import Image from '../../Image';

function DamImage(props) {
  const {
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

  return <Image srcSet={srcSetConfig.srcSet.join(',')} {...other} />;
}

DamImage.defaultProps = {
  theme: {},
  imgConfig: [],
  path: 'https://res.cloudinary.com/tcp-dam-test/image/upload',
};

DamImage.propTypes = {
  /* StyleComponent theme, will come from context */
  theme: PropTypes.shape({}),

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
};

export default withStyles(withTheme(DamImage), styles);
export { DamImage as DamImageVanilla };
