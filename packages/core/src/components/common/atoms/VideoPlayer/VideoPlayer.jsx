import React from 'react';
import videojs from 'video.js';

class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
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
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={node => {
              this.videoNode = node;
              return true;
            }}
            className="video-js"
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

export default VideoPlayer;
