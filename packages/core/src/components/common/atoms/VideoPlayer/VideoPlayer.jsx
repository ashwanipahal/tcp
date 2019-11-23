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

class VideoPlayer extends React.Component {
  componentDidMount() {
    const { id, autoplay, url, muted } = this.props;
    const apiConfig = getAPIConfig();
    const cloudinaryCore = cloudinary.Cloudinary.new({
      cloud_name: apiConfig.damCloudName,
    });

    const player = cloudinaryCore.videoPlayer(id || 'cld-video-player', {
      autoplay,
      muted,
    });

    player.fluid(true);

    player.source({
      publicId: parseFileName(url),
    });
  }

  render() {
    const { id, controls, muted, loop, url, className, autoplay } = this.props;

    if (!url) {
      return null;
    }

    let loopVideo;
    let mutedVideo;
    let autoplayVideo;

    if (loop) {
      loopVideo = 'true';
    }
    if (muted) {
      mutedVideo = '';
    }
    if (autoplay) {
      autoplayVideo = '';
    }

    return (
      <video
        id={id || 'cld-video-player'}
        controls={controls}
        muted={mutedVideo}
        loop={loopVideo}
        className={className}
        autoPlay={autoplayVideo}
      >
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
