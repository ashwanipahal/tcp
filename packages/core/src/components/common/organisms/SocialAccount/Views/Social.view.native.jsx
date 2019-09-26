import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { BodyCopyWithSpacing, ViewWithSpacing } from '../../../atoms/styledWrapper';
import config from './config';
import Row from '../styles/social.style.native';
import FacebookEnableIcon from '../../../../../../../mobileapp/src/assets/images/facebook.png';
import InstagramEnableIcon from '../../../../../../../mobileapp/src/assets/images/instagram.png';
import FacebookDisableIcon from '../../../../../../../mobileapp/src/assets/images/facebook_fade.png';
import InstagramDisableIcon from '../../../../../../../mobileapp/src/assets/images/instagram_fade.png';
import CloseIcon from '../../../../../../../mobileapp/src/assets/images/close.png';
import PlusIcon from '../../../../../../../mobileapp/src/assets/images/plus.png';

class Socialview extends React.PureComponent {
  static propTypes = {
    socialLoad: PropTypes.shape({}).isRequired,
    saveSocialAcc: PropTypes.shape({}).isRequired,
    getSocialAcc: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
  };

  constructor() {
    super();
    this.socialAccounts = [];
    this.pointsInformation = {};
    this.icons = {
      FacebookEnable: FacebookEnableIcon,
      InstagramEnable: InstagramEnableIcon,
      FacebookDisable: FacebookDisableIcon,
      InstagramDisable: InstagramDisableIcon,
      Connected: CloseIcon,
      Disconnected: PlusIcon,
    };
  }

  renderAccountsInformation = (accounts, saveSocialAcc, labels) => {
    return accounts.map(elem => {
      const isSocialAccount =
        config && config.SOCIAL_ACCOUNTS[elem.socialAccount.toLocaleLowerCase()];
      const socialIcon = `${isSocialAccount}${elem.isConnected ? 'Enable' : 'Disable'}`;
      const icon = `${elem.isConnected ? 'Connected' : 'Disconnected'}`;
      return (
        <ViewWithSpacing spacingStyles="margin-bottom-XL margin-left-XXS margin-right-XXS">
          <Row>
            <ImageComp source={this.icons[socialIcon]} width={50} height={50} />
            <BodyCopyWithSpacing
              fontSize="fs16"
              spacingStyles="margin-left-MED margin-right-LRG"
              text={
                elem.isConnected
                  ? `${config.SOCIAL_ACCOUNTS[elem.socialAccount]} ${
                      labels.lbl_prefrence_connected
                    }`
                  : `${labels.lbl_prefrence_connectTo} ${
                      config.SOCIAL_ACCOUNTS[elem.socialAccount]
                    }`
              }
            />
            <ImageComp source={this.icons[icon]} width={15} height={15} />
          </Row>
        </ViewWithSpacing>
      );
    });
  };

  refactorSocialDetails = accounts => {
    const accountsInfo = [];
    Object.keys(accounts).forEach(prop => {
      if (prop === 'facebook' || prop === 'instagram') {
        accountsInfo.push({
          socialAccount: config.SOCIAL_ACCOUNTS_INFO[prop],
          isConnected: accounts[prop].accessToken,
          hasUserId: accounts[prop].userId,
        });
      }
      if (prop === 'pointsAwarded') {
        this.pointsInformation = {
          activity: accounts[prop].activity,
          id: accounts[prop].id,
          points: accounts[prop].points,
        };
      }
    });
    this.socialAccounts = accountsInfo;
  };

  render() {
    const { saveSocialAcc, getSocialAcc, labels } = this.props;

    if (Object.keys(getSocialAcc).length) {
      this.refactorSocialDetails(getSocialAcc);
    }

    return (
      <View>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="extrabold"
          text={getLabelValue(labels, 'lbl_prefrence_social_account')}
        />
        <BodyCopyWithSpacing
          spacingStyles="margin-bottom-XXL margin-left-XXS margin-top-SM"
          fontSize="fs16"
          text={getLabelValue(labels, 'lbl_prefrence_social_text')}
        />
        {this.renderAccountsInformation(this.socialAccounts, saveSocialAcc, labels)}
      </View>
    );
  }
}

export default Socialview;
export { Socialview as SocialviewVanilla };
