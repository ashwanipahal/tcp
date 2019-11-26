import React from 'react';
import PropTypes from 'prop-types';
import cloudinary from 'cloudinary-core';
import cloudinaryVideoPlayer from 'cloudinary-video-player'; // eslint-disable-line
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getAPIConfig } from '@tcp/core/src/utils';
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
/**
 * To convert from string to number.
 * @param {*} val
 */
const convertNumToBool = val => {
  return !!parseInt(val, 10);
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
    const { id, url, className } = this.props;
    const { uniqueId } = this.state;

    if (!url) {
      return null;
    }
    return (
      <video id={id || uniqueId} className={className}>
        <track
          src="/static/captions/captions_en.vtt"
          kind="captions"
          srcLang="en"
          label="english_captions"
        />
        <track
          src="/static/captions/captions_fr.vtt"
          kind="captions"
          srcLang="fr"
          label="french_captions"
        />
        <track
          src="/static/captions/captions_es.vtt"
          kind="captions"
          srcLang="es"
          label="spanish_captions"
        />
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
};

export default withStyles(VideoPlayer, styles);
