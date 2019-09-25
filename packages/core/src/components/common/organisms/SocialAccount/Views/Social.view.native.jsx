import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import config from './config';
import Row from '../styles/social.style.native';
import facebookEnableIcon from '../../../../../../../mobileapp/src/assets/images/facebook.png';
import instagramEnableIcon from '../../../../../../../mobileapp/src/assets/images/instagram.png';
import facebookDisableIcon from '../../../../../../../mobileapp/src/assets/images/facebook_fade.png';
import instagramDisableIcon from '../../../../../../../mobileapp/src/assets/images/instagram_fade.png';
import closeIcon from '../../../../../../../mobileapp/src/assets/images/close.png';

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
  }

  renderAccountsInformation = (accounts, saveSocialAcc, labels) => {
    return accounts.map((elem, index) => {
      const isSocialAccount =
        config && config.SOCIAL_ACCOUNTS[elem.socialAccount.toLocaleLowerCase()];
      return (
        <View>
          <Row />
        </View>
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
      <View>{this.renderAccountsInformation(this.socialAccounts, saveSocialAcc, labels)}</View>
    );
  }
}

export default Socialview;
export { Socialview as SocialviewVanilla };
