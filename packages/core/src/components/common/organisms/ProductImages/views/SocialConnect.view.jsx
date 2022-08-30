import { Anchor, Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath, getLabelValue } from '@tcp/core/src/utils';
import ClickTracker from '@tcp/web/src/components/common/atoms/ClickTracker';
import PropTypes from 'prop-types';
import React from 'react';
import { openWindow } from '../../../../../utils/utils.web';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/ProductImages.style';

class SocialConnect extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isFacebookEnabled: PropTypes.bool,
    isPinterestEnabled: PropTypes.bool,
    isTwitterEnabled: PropTypes.bool,
    accessibilityLabels: PropTypes.shape({}),
    ratingsProductId: PropTypes.string.isRequired,
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
      ratingsProductId,
    } = this.props;

    return (
      <ul className={`${className} social-connect-sub-wrapper`}>
        <li>
          {isTwitterEnabled && (
            <ClickTracker
              clickData={{
                customEvents: ['event84'],
                productId: ratingsProductId,
                socialNetwork: 'twitter',
              }}
            >
              <Anchor
                url="http://twitter.com/childrensplace"
                target="_blank"
                onClick={this.handleTwitterShare}
                className="icon-twitter"
                title="Twitter"
                rel="noopener"
              >
                <Image
                  alt={getLabelValue(accessibilityLabels, 'lbl_social_twitter')}
                  className="twitter"
                  src={getIconPath('twitter-icon')}
                  data-locator="twitter-icon"
                />
              </Anchor>
            </ClickTracker>
          )}
        </li>

        <li>
          {isFacebookEnabled && (
            <ClickTracker
              clickData={{
                customEvents: ['event84'],
                productId: ratingsProductId,
                socialNetwork: 'facebook',
              }}
            >
              <Anchor
                url="https://www.facebook.com/childrensplace"
                target="_blank"
                onClick={this.handleFacebookShare}
                className="icon-facebook"
                title="Facebook"
              >
                <Image
                  alt={getLabelValue(accessibilityLabels, 'lbl_social_facebook')}
                  className="facebook"
                  src={getIconPath('facebook-icon')}
                  data-locator="facebook-icon"
                />
              </Anchor>
            </ClickTracker>
          )}
        </li>

        <li>
          {isPinterestEnabled && (
            <ClickTracker
              clickData={{
                customEvents: ['event84'],
                productId: ratingsProductId,
                socialNetwork: 'pinterest',
              }}
            >
              <Anchor
                url="http://www.pinterest.com/childrensplace"
                target="_blank"
                onClick={this.handlePinterestShare}
                className="icon-pinterest"
                title="Pinterest"
              >
                <Image
                  alt={getLabelValue(accessibilityLabels, 'lbl_social_pinterest')}
                  className="pinterest"
                  src={getIconPath('pinterest-icon')}
                  data-locator="pinterest-icon"
                />
              </Anchor>
            </ClickTracker>
          )}
        </li>
      </ul>
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
