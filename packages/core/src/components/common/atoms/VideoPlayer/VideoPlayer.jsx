import React from 'react';
import PropTypes from 'prop-types';
import logger from '@tcp/core/src/utils/loggerInstance';
import videojs from 'video.js';
import withStyles from '../../hoc/withStyles';
import style from './VideoPlayer.style';

class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(
      this.videoNode,
      {
        ...this.props,
        loop: true,
        autoplay: 'muted',
      },
      function onPlayerReady() {
        logger.info('onPlayerReady', this);
      }
    );
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <div className="video-js-container" data-vjs-player>
          <video
            ref={node => {
              this.videoNode = node;
              return true;
            }}
            className="video-js"
            data-setup='{"fluid": true}'
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
        </div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(VideoPlayer, style);
