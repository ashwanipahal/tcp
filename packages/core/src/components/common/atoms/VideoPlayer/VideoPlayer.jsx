import React from 'react';
import PropTypes from 'prop-types';
import cloudinary from 'cloudinary-core';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getAPIConfig, convertNumToBool } from '@tcp/core/src/utils';
import styles from './VideoPlayer.style';

/**
 * This function parses file name from video url
 * @param {String} url
 */
const parseFileName = url => {
  const urlFragments = url.split('/');
  return urlFragments[urlFragments.length - 1].split('.')[0];
};

/**
 * To Generate the unique ids based on the timestap for multiple video players
 */
const getUniqueID = () => {
  return `video_${Date.now() + (Math.random() * 100000).toFixed()}`;
};

class VideoPlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      uniqueId: getUniqueID(),
    };
  }
  componentDidMount() {
    const { id, autoplay, url, muted, loop, controls } = this.props;
    const { uniqueId } = this.state;
    const apiConfig = getAPIConfig();
    const cloudinaryCore = cloudinary.Cloudinary.new({
      cloud_name: apiConfig.damCloudName,
    });

    const player = cloudinaryCore.videoPlayer(id || uniqueId, {
      autoplay: convertNumToBool(autoplay),
      muted: convertNumToBool(muted),
      loop: convertNumToBool(loop),
      controls: convertNumToBool(controls),
    });

    player.fluid(true);

    player.source({
      publicId: parseFileName(url),
    });
  }

  render() {
    const { id, url, className, dataLocator } = this.props;
    const { uniqueId } = this.state;

    if (!url) {
      return null;
    }
    return (
      <video id={id || uniqueId} className={className} dataLocator={`${dataLocator}_video`}>
        <track kind="captions" />
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  loop: PropTypes.bool.isRequired,
  autoplay: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  className: PropTypes.number.isRequired,
  controls: PropTypes.bool.isRequired,
  dataLocator: PropTypes.string,
};

VideoPlayer.defaultProps = {
  dataLocator: '',
};

export default withStyles(VideoPlayer, styles);
