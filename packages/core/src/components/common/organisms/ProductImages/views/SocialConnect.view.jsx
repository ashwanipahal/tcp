import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath } from '@tcp/core/src/utils';
import { Image, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/ProductImages.style';

class SocialConnect extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,

    isFbEnabled: PropTypes.bool,

    isPtEnabled: PropTypes.bool,

    // isInEnabled: PropTypes.bool,

    isTwEnabled: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);

    this.handleTwShare = this.handleTwShare.bind(this);
    this.handlePtShare = this.handlePtShare.bind(this);
    this.handleFbShare = this.handleFbShare.bind(this);
    this.handleInShare = this.handleInShare.bind(this);
  }

  handleTwShare = () => {
    const shareUrl = window.location.href;
    const url = `//twitter.com/share?text=&url=${encodeURIComponent(shareUrl)}&hashtags=`;

    window.open(url);
  };

  handlePtShare = () => {
    const shareUrl = window.location.href;
    const url = `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}`;

    window.open(url);
  };

  handleFbShare = () => {
    const shareUrl = window.location.href;
    const url = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`;

    window.open(url);
  };

  handleInShare = () => {};

  render() {
    const { isFbEnabled, isPtEnabled, isTwEnabled, className } = this.props;

    return (
      <span className={`${className} social-connect-sub-wrapper`}>
        {isTwEnabled && (
          <Anchor
            url="http://instagram.com/childrensplace"
            target="_blank"
            onClick={this.handleTwShare}
            className="icon-twitter"
            title="Twitter"
          >
            <Image
              alt="twitter"
              className="twitter"
              src={getIconPath('twitter-icon')}
              data-locator="twitter-icon"
            />
          </Anchor>
        )}

        {isFbEnabled && (
          <Anchor
            url="https://www.facebook.com/childrensplace"
            target="_blank"
            onClick={this.handleFbShare}
            className="icon-fcbk"
            title="Facebook"
          >
            <Image
              alt="Facebook"
              className="facebook"
              src={getIconPath('facebook-icon')}
              data-locator="facebook-icon"
            />
          </Anchor>
        )}
        {isPtEnabled && (
          <Anchor
            url="http://www.pinterest.com/childrensplace"
            target="_blank"
            onClick={this.handlePtShare}
            className="icon-pinterest"
            title="Pinterest"
          >
            <Image
              alt="pinterest"
              className="pinterest"
              src={getIconPath('pinterest-icon')}
              data-locator="pinterest-icon"
            />
          </Anchor>
        )}
      </span>
    );
  }
}

SocialConnect.defaultProps = {
  className: '',
  isTwEnabled: false,
  isFbEnabled: false,
  isPtEnabled: false,
  // isInEnabled:false,
};

export default withStyles(SocialConnect, styles);
// export { SocialConnect as ProductImagesVanilla };
