import React from 'react';
import PropTypes from 'prop-types';
import { Video } from 'cloudinary-react';
import withStyles from '../../hoc/withStyles';
import style from './VideoPlayer.style';

const parseFileName = url => {
  const urlFragments = url.split('/');
  return urlFragments[urlFragments.length - 1].split('.')[0];
};

const VideoPlayer = props => {
  const { url, loop, autoplay, muted } = props;

  if (!url) {
    return null;
  }

  const publicId = parseFileName(url);
  let loopVideo;
  let autoplayVideo;
  let mutedVideo;

  if (loop) {
    loopVideo = 'true';
  }
  if (autoplay) {
    autoplayVideo = 'true';
  }
  if (muted) {
    mutedVideo = 'true';
  }

  return (
    <Video
      cloudName="tcp-dam-test"
      publicId={publicId}
      fallbackContent="Your browser does not support HTML5 video tags."
      {...props}
      loop={loopVideo}
      autoplay={autoplayVideo}
      muted={mutedVideo}
    />
  );
};

VideoPlayer.propTypes = {
  className: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  loop: PropTypes.bool.isRequired,
  autoplay: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
};

export default withStyles(VideoPlayer, style);
