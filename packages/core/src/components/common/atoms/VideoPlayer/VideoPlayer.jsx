/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import cloudinary from 'cloudinary-core';
import cloudinaryVideoPlayer from 'cloudinary-video-player'; // eslint-disable-line
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getAPIConfig, convertNumToBool, cropVideoUrl } from '@tcp/core/src/utils';
import styles from './VideoPlayer.style';

/**
 * To Generate the unique ids based on the timestap for multiple video players
 */
const getUniqueID = () => {
  return `video_${Date.now() + (Math.random() * 100000).toFixed()}`;
};

/**
 * To Render the video element
 * cloudinary handles the url by default so when updateVideoUrl is passed as false then url should
 * not contain the base url and it should not have any version
 * example url when updateVideoUrl is false - ecom/assets/content/gym/video/Gymboree_CircleOpen_500_20191029
 * no need to pass the video extension as this is handled by cloudinary itself.
 */
class VideoPlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      uniqueId: getUniqueID(),
    };
  }

  componentDidMount() {
    const { autoplay, url, muted, loop, controls } = this.props;
    const { uniqueId } = this.state;
    const apiConfig = getAPIConfig();
    const cloudinaryCore = cloudinary.Cloudinary.new({
      cloud_name: apiConfig.damCloudName,
    });

    const player = cloudinaryCore.videoPlayer(uniqueId, {
      autoplay: convertNumToBool(autoplay),
      muted: convertNumToBool(muted),
      loop: convertNumToBool(loop),
      controls: convertNumToBool(controls),
    });
    player.fluid(true);

    player.source({
      publicId: cropVideoUrl(url),
    });
  }

  render() {
    const { url, className, dataLocator } = this.props;
    const { uniqueId } = this.state;

    if (!url) {
      return null;
    }
    return (
      <video
        id={uniqueId}
        className={`${className} cld-video-player`}
        data-locator={`${dataLocator}_video`}
      >
        <track kind="captions" />
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  loop: PropTypes.string,
  autoplay: PropTypes.string,
  muted: PropTypes.string,
  className: PropTypes.string,
  controls: PropTypes.string,
  dataLocator: PropTypes.string,
};

VideoPlayer.defaultProps = {
  dataLocator: '',
  loop: '0',
  autoplay: '1',
  muted: '0',
  className: '',
  controls: '1',
};

export default withStyles(VideoPlayer, styles);
