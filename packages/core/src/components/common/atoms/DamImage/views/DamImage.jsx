import React, { forwardRef } from 'react';
import { PropTypes } from 'prop-types';
import { withTheme } from 'styled-components';
import {
  configureInternalNavigationFromCMSUrl,
  getAPIConfig,
  getBrand,
  getVideoUrl,
} from '@tcp/core/src/utils';
import Anchor from '../../Anchor';
import VideoPlayer from '../../VideoPlayer';
import LazyLoadImage from '../../LazyImage';

const getImgData = props => {
  const { imgData, imgConfigs, imgPathSplitter } = props;
  let { basePath } = props;
  let imgPath;
  const propImageConfig = [];
  /* eslint-disable camelcase */
  const { crop_m, crop_t, crop_d, url } = imgData;
  propImageConfig[0] = crop_m || imgConfigs[0];
  propImageConfig[1] = crop_t || imgConfigs[1];
  propImageConfig[2] = crop_d || imgConfigs[2];
  /* eslint-enable camelcase */

  if (/^http/.test(url)) {
    const [imgDataBasePath, imgDataPath] = url.split(imgPathSplitter);
    basePath = `${imgDataBasePath}${imgPathSplitter}`;
    imgPath = imgDataPath;
  } else {
    imgPath = url;
  }
  imgPath = imgPath && imgPath.replace(/^\//, '');
  return { basePath, imgPath, imgConfigs: propImageConfig };
};

const getBreakpointImgUrl = (type, props) => {
  const { breakpoints, isProductImage, itemBrand } = props;

  const { basePath, imgPath, imgConfigs } = getImgData(props);

  const breakpointTypeIndex = breakpoints.keys.indexOf(type);
  const breakpoint = breakpoints.values[breakpoints.keys[breakpointTypeIndex + 1]];

  let config = type === 'lg' ? `w_${breakpoints.maxWidth}` : `w_${breakpoint}`;
  if (imgConfigs[breakpointTypeIndex]) {
    config = imgConfigs[breakpointTypeIndex];
  }

  let brandName = getBrand();
  if (itemBrand) {
    brandName = itemBrand;
  }

  const brandId = brandName && brandName.toUpperCase();
  const apiConfigObj = getAPIConfig();
  let assetHost = apiConfigObj[`assetHost${brandId}`];
  const productAssetPath = apiConfigObj[`productAssetPath${brandId}`];

  const isVideoUrl = getVideoUrl(imgPath);
  if (isVideoUrl) {
    assetHost = assetHost.replace('/image/', '/video/');
  }

  return isProductImage
    ? `${assetHost}/${config}/${productAssetPath}/${imgPath}`
    : `${basePath}/${config}/${imgPath}`;
};

const RenderVideo = videoProps => {
  const { video, image } = videoProps;
  const { autoplay, controls, url: src } = video;

  const options = {
    autoplay,
    controls,
    sources: [
      {
        src,
        type: 'video/mp4',
      },
    ],
    image,
  };

  return <VideoPlayer {...options} />;
};

const RenderImage = forwardRef((imgProps, ref) => {
  const {
    breakpoints,
    imgConfigs,
    imgData,
    basePath,
    imgPathSplitter,
    lazyLoad,
    link,
    itemBrand,
    showPlaceHolder,
    isProductImage,
    ...other
  } = imgProps;

  const { alt, url } = imgData;

  let isVideoUrl = null;
  let videoDataOptions = {};

  if (url && isProductImage) {
    isVideoUrl = getVideoUrl(url);
    if (isVideoUrl) {
      videoDataOptions = {
        autoplay: false,
        controls: true,
        loop: false,
        muted: true,
        inline: true,
        url: getBreakpointImgUrl('xs', imgProps),
      };
    }
  }
  return isVideoUrl ? (
    <RenderVideo video={videoDataOptions} />
  ) : (
    <picture>
      <source
        media={`(min-width: ${breakpoints.values.lg}px)`}
        data-srcset={getBreakpointImgUrl('lg', imgProps)}
      />

      <source
        media={`(min-width: ${breakpoints.values.sm}px)`}
        data-srcset={getBreakpointImgUrl('sm', imgProps)}
      />

      {lazyLoad ? (
        <LazyLoadImage
          forwardedRef={ref}
          src={getBreakpointImgUrl('xs', imgProps)}
          alt={alt}
          {...other}
          showPlaceHolder={showPlaceHolder}
        />
      ) : (
        <img
          onError={e => {
            e.target.onerror = null;
            e.target.classList.add('error');
          }}
          ref={ref}
          src={getBreakpointImgUrl('xs', imgProps)}
          alt={alt}
          {...other}
        />
      )}
    </picture>
  );
});

const DamImage = props => {
  const {
    theme: { breakpoints },
    imgConfigs,
    imgData,
    basePath,
    imgPathSplitter,
    lazyLoad,
    link,
    dataLocator,
    forwardedRef,
    itemBrand,
    showPlaceHolder,
    videoData,
    isProductImage,
    ...other
  } = props;

  if (videoData) {
    return <RenderVideo video={videoData} image={imgData} />;
  }

  const imgProps = {
    breakpoints,
    imgConfigs,
    imgData,
    basePath,
    imgPathSplitter,
    lazyLoad,
    link,
    itemBrand,
    showPlaceHolder,
    isProductImage,
    ...other,
  };

  if (!link) {
    return <RenderImage {...imgProps} ref={forwardedRef} />;
  }

  const { url: ctaUrl, target, title, actualUrl, className: ctaClassName } = link;

  let to = actualUrl;
  if (!actualUrl) {
    to = configureInternalNavigationFromCMSUrl(ctaUrl);
  }

  return (
    <Anchor
      className={`${ctaClassName} ${showPlaceHolder ? 'full-width' : ''}`}
      to={to}
      asPath={ctaUrl}
      target={target}
      title={title}
      dataLocator={`${dataLocator}_image-link`}
    >
      <RenderImage {...imgProps} ref={forwardedRef} />
    </Anchor>
  );
};

DamImage.defaultProps = {
  lazyLoad: true,
  theme: {},
  imgConfigs: [],
  imgData: {
    crop_d: '',
    crop_t: '',
    crop_m: '',
  },
  basePath: 'https://test1.theplace.com/image/upload',
  imgPathSplitter: '/upload',
  link: null,
  dataLocator: '',
  dataLocatorLink: '',
  forwardedRef: null,
  itemBrand: '',
  showPlaceHolder: true,
  videoData: null,
  isProductImage: false,
};

DamImage.propTypes = {
  /* Load the image laziliy or not */
  lazyLoad: PropTypes.bool,
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
      'c_crop,g_face:center,q_auto:best,w_1200',
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
  videoData: PropTypes.shape({
    video: PropTypes.shape({}),
    image: PropTypes.shape({}),
  }),

  /* String which will be used to split the URL */
  imgPathSplitter: PropTypes.string,
  dataLocator: PropTypes.string,
  dataLocatorLink: PropTypes.string,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.string,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    actualUrl: PropTypes.string,
    className: PropTypes.string,
  }),
  forwardedRef: PropTypes.shape({ current: PropTypes.any }),
  itemBrand: PropTypes.string,
  showPlaceHolder: PropTypes.bool,
  isProductImage: PropTypes.bool,
};

export default withTheme(DamImage);
export { DamImage as DamImageVanilla };
