import React from 'react';
import { PropTypes } from 'prop-types';
import { withTheme } from 'styled-components';

/*
  Based on imgSizes passed on props, it will create the srcset accordingly;
  If user only send the Cloudinary imgPath, it add the configuration according to the imgSizes;
  If width found on imgConfigs (Cloudinary config) then it will use to create srcset;
*/

const getSrcSetConfig = props => {
  const { imgSizes, path, imgPath, imgConfigs, imgQualityPlus } = props;

  return imgSizes.map((imgSize, i) => {
    let cloudinaryImgConfig = imgConfigs[i] || '';

    if (!cloudinaryImgConfig) {
      cloudinaryImgConfig = `w_${imgSize + imgQualityPlus}`;
    }

    return { url: `${path}/${cloudinaryImgConfig}/${imgPath}`, imgSize };
  });
};

const DamImage = props => {
  const { theme, imgQualityPlus, imgSizes, path, imgPath, imgConfigs, alt, ...other } = props;

  const srcSetConfigs = getSrcSetConfig(props);
  return (
    <picture>
      {srcSetConfigs.map(config => {
        const { url, imgSize } = config;
        return <source media={`(max-width: ${imgSize}px)`} srcSet={url} key={url} />;
      })}
      <img src={srcSetConfigs[srcSetConfigs.length - 1].url} alt={alt} {...other} />
    </picture>
  );
};

DamImage.defaultProps = {
  theme: {},
  imgConfigs: [],
  imgSizes: [468, 768, 1024],
  imgQualityPlus: 20,
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
    The configuration should be passed according to the imgSizes props; Based on
    that the configuration will be added.
    [
      'c_crop,g_face:center,q_auto:best,w_1024',
      'c_crop,g_face:center,q_auto:best,w_768',
      'c_crop,g_face:center,q_auto:best,w_468',
    ]
  */
  imgConfigs: PropTypes.arrayOf(PropTypes.string),

  /* Based on this configuration the picture source elements will be created. */
  imgSizes: PropTypes.arrayOf(PropTypes.number),

  /* Following pixel will be added on the default imageSizes props */
  imgQualityPlus: PropTypes.number,

  /* Description of the image */
  alt: PropTypes.string.isRequired,
};

export default withTheme(DamImage);
export { DamImage as DamImageVanilla };
