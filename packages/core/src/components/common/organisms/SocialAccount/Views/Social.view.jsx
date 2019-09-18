import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from './FacebookLogin';
import config from './config';
import socialStyle from '../styles/social.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';

const loginComponents = {
  Facebook: FacebookLogin,
};

class Socialview extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    socialLoad: PropTypes.shape({}).isRequired,
    saveSocialAcc: PropTypes.shape({}).isRequired,
    getSocialAcc: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    className: '',
  };

  constructor() {
    super();
    this.socialAccounts = [];
  }

  renderSocialLogins = (Component, saveSocialAcc) => {
    const { socialLoad } = this.props;
    return (
      <Component
        socialLoad={socialLoad}
        saveSocialAcc={saveSocialAcc}
        loginStatus={this.socialAccounts}
      />
    );
  };

  renderAccountsInformation = (accounts, saveSocialAcc, labels) => {
    return accounts.map((elem, index) => {
      const isSocialAccount =
        config && config.SOCIAL_ACCOUNTS[elem.socialAccount.toLocaleLowerCase()];
      return (
        <li className="social-accounts__infoList" key={index.toString()}>
          <span
            data-locator={!elem.isConnected ? 'facebookDisabledIcon' : 'facebookEnabledIcon'}
            className={`${isSocialAccount}-icon--${
              elem.isConnected ? 'enable' : 'disable'
            } social-accounts__social-icon`}
          />
          <BodyCopy
            fontSize="fs16"
            fontFamily="secondary"
            textAlign="center"
            className="social-accounts__align"
            data-locator={elem.isConnected ? 'facebookConnectedTxt' : 'connectFacebokTxt'}
          >
            {elem.isConnected
              ? `${config.SOCIAL_ACCOUNTS[elem.socialAccount]} ${labels.lbl_prefrence_connected}`
              : `${labels.lbl_prefrence_connectTo} ${config.SOCIAL_ACCOUNTS[elem.socialAccount]}`}
          </BodyCopy>
          {this.renderSocialLogins(loginComponents[isSocialAccount], saveSocialAcc)}
        </li>
      );
    });
  };

  refactorSocialDetails = accounts => {
    const accountsInfo = [];
    Object.keys(accounts).forEach(prop => {
      if (prop === 'facebook') {
        accountsInfo.push({
          socialAccount: config.SOCIAL_ACCOUNTS_INFO[prop],
          isConnected: accounts[prop].accessToken,
          hasUserId: accounts[prop].userId,
        });
      }
    });
    this.socialAccounts = accountsInfo;
  };

  render() {
    const { saveSocialAcc, getSocialAcc, className, labels } = this.props;
    if (Object.keys(getSocialAcc).length) {
      this.refactorSocialDetails(getSocialAcc);
    }

    return (
      <React.Fragment>
        <section className={className} data-selector="analytics-social-account">
          <p className="social-accounts__subTitle" data-locator="linkAccountTxt">
            {labels.lbl_prefrence_social_text}
          </p>
          <ul>{this.renderAccountsInformation(this.socialAccounts, saveSocialAcc, labels)}</ul>
        </section>
      </React.Fragment>
    );
  }
}

export default withStyles(Socialview, socialStyle);
export { Socialview as SocialviewVanilla };
