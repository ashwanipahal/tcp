import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath } from '@tcp/core/src/utils';
import { Image, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/ProductImages.style';

class SocialConnect extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isFacebookEnabled: PropTypes.bool,
    isPinterestEnabled: PropTypes.bool,
    isTwitterEnabled: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);

    this.handleTwitterShare = this.handleTwitterShare.bind(this);
    this.handlePinterestShare = this.handlePinterestShare.bind(this);
    this.handleFacebookShare = this.handleFacebookShare.bind(this);
  }

  handleTwitterShare = () => {
    const shareUrl = window.location.href;
    const url = `//twitter.com/share?text=&url=${encodeURIComponent(shareUrl)}&hashtags=`;

    window.open(url);
  };

  handlePinterestShare = () => {
    const shareUrl = window.location.href;
    const url = `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}`;

    window.open(url);
  };

  handleFacebookShare = () => {
    const shareUrl = window.location.href;
    const url = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`;

    window.open(url);
  };

  render() {
    const { isFacebookEnabled, isPinterestEnabled, isTwitterEnabled, className } = this.props;

    return (
      <span className={`${className} social-connect-sub-wrapper`}>
        {isTwitterEnabled && (
          <Anchor
            url="http://instagram.com/childrensplace"
            target="_blank"
            onClick={this.handleTwitterShare}
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

        {isFacebookEnabled && (
          <Anchor
            url="https://www.facebook.com/childrensplace"
            target="_blank"
            onClick={this.handleFacebookShare}
            className="icon-facebook"
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
        {isPinterestEnabled && (
          <Anchor
            url="http://www.pinterest.com/childrensplace"
            target="_blank"
            onClick={this.handlePinterestShare}
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
  isTwitterEnabled: true,
  isFacebookEnabled: true,
  isPinterestEnabled: true,
};

export default withStyles(SocialConnect, styles);
