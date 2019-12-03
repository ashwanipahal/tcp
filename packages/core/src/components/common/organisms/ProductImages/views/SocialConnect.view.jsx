import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath } from '@tcp/core/src/utils';
import { Image, Anchor } from '@tcp/core/src/components/common/atoms';
import ClickTracker from '@tcp/web/src/components/common/atoms/ClickTracker';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/ProductImages.style';
import { openWindow } from '../../../../../utils/utils.web';

class SocialConnect extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isFacebookEnabled: PropTypes.bool,
    isPinterestEnabled: PropTypes.bool,
    isTwitterEnabled: PropTypes.bool,
    accessibilityLabels: PropTypes.shape({}),
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

    openWindow(url);
  };

  handlePinterestShare = () => {
    const shareUrl = window.location.href;
    const url = `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}`;

    openWindow(url);
  };

  handleFacebookShare = () => {
    const shareUrl = window.location.href;
    const url = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`;

    openWindow(url);
  };

  render() {
    const {
      isFacebookEnabled,
      isPinterestEnabled,
      isTwitterEnabled,
      className,
      accessibilityLabels,
    } = this.props;

    return (
      <span className={`${className} social-connect-sub-wrapper`}>
        {isTwitterEnabled && (
          <ClickTracker clickData={{ customEvents: ['event84'], socialNetwork: 'twitter' }}>
            <Anchor
              url="http://twitter.com/childrensplace"
              target="_blank"
              onClick={this.handleTwitterShare}
              className="icon-twitter"
              title="Twitter"
              rel="noopener"
            >
              <Image
                alt={accessibilityLabels.lbl_img_alt_twitter}
                className="twitter"
                src={getIconPath('twitter-icon')}
                data-locator="twitter-icon"
              />
            </Anchor>
          </ClickTracker>
        )}

        {isFacebookEnabled && (
          <ClickTracker clickData={{ customEvents: ['event84'], socialNetwork: 'facebook' }}>
            <Anchor
              url="https://www.facebook.com/childrensplace"
              target="_blank"
              onClick={this.handleFacebookShare}
              className="icon-facebook"
              title="Facebook"
            >
              <Image
                alt={accessibilityLabels.lbl_img_alt_facebook}
                className="facebook"
                src={getIconPath('facebook-icon')}
                data-locator="facebook-icon"
              />
            </Anchor>
          </ClickTracker>
        )}
        {isPinterestEnabled && (
          <ClickTracker clickData={{ customEvents: ['event84'], socialNetwork: 'pinterest' }}>
            <Anchor
              url="http://www.pinterest.com/childrensplace"
              target="_blank"
              onClick={this.handlePinterestShare}
              className="icon-pinterest"
              title="Pinterest"
            >
              <Image
                alt={accessibilityLabels.lbl_img_alt_pinterest}
                className="pinterest"
                src={getIconPath('pinterest-icon')}
                data-locator="pinterest-icon"
              />
            </Anchor>
          </ClickTracker>
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
  accessibilityLabels: {},
};

export default withStyles(SocialConnect, styles);
