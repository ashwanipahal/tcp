import React from 'react';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import { getScreenWidth, convertNumToBool, cropVideoUrl } from '@tcp/core/src/utils';

class VideoPlayer extends React.Component {
  render() {
    const {
      videoHeight: height,
      videoWidth: width,
      url,
      poster,
      muted,
      loop,
      autoplay,
      controls,
      updateVideoUrl,
    } = this.props;
    const autoPlayOption = autoplay ? convertNumToBool(autoplay) : false;
    const muteOption = muted ? convertNumToBool(muted) : false;
    const controlsOption = controls ? convertNumToBool(controls) : false;
    const loopOption = loop ? convertNumToBool(loop) : false;
    return (
      <Video
        source={{ uri: updateVideoUrl ? cropVideoUrl(url) : url }}
        ref={ref => {
          this.player = ref;
        }}
        onBuffer={this.onBuffer}
        onError={this.videoError}
        style={{
          height,
          width,
        }}
        paused={!autoPlayOption}
        poster={poster}
        repeat={loopOption}
        resizeMode="cover"
        posterResizeMode="contain"
        muted={muteOption}
        controls={controlsOption}
        data-setup='{"fluid": true}'
      />
    );
  }
}

VideoPlayer.propTypes = {
  videoWidth: PropTypes.number,
  videoHeight: PropTypes.number,
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
  muted: PropTypes.string,
  loop: PropTypes.string,
  autoplay: PropTypes.string,
  controls: PropTypes.string,
  updateVideoUrl: PropTypes.bool,
};

VideoPlayer.defaultProps = {
  poster: '',
  videoWidth: getScreenWidth(),
  videoHeight: 400,
  muted: '1',
  loop: '1',
  autoplay: '1',
  controls: '1',
  updateVideoUrl: true,
};

export default VideoPlayer;
