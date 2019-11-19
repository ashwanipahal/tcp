import React from 'react';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import { getScreenWidth } from '@tcp/core/src/utils';

class VideoPlayer extends React.Component {
  render() {
    const { videoHeight: height, videoWidth: width, url, poster } = this.props;

    return (
      <Video
        source={{ uri: url }}
        ref={ref => {
          this.player = ref;
        }}
        onBuffer={this.onBuffer}
        onError={this.videoError}
        style={{
          height,
          width,
        }}
        poster={poster}
        repeat
        resizeMode="cover"
        posterResizeMode="contain"
        muted
        controls
      />
    );
  }
}

VideoPlayer.propTypes = {
  videoWidth: PropTypes.number,
  videoHeight: PropTypes.number,
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
};

VideoPlayer.defaultProps = {
  poster: '',
  videoWidth: getScreenWidth(),
  videoHeight: 400,
};

export default VideoPlayer;
