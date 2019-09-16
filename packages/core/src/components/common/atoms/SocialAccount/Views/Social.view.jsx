import React from 'react';
import { FacebookLoginComponent } from './facebookLoginComponent';
import { config } from './config';
import socialStyle from '../styles/social.style';
import withStyles from '../../../hoc/withStyles';

const loginComponents = {
  Facebook: FacebookLoginComponent,
};

export class Socialview extends React.PureComponent {
  constructor() {
    super();
    this.socialAccounts = [];
    this.state = {
      isModalOpen: false,
      currSocialAcc: '',
      points: '',
    };
  }

  renderSocialLogins = (Component, saveSocialAcc, loginStatus) => {
    const { socialLoad } = this.props;
    return (
      <Component
        socialLoad={socialLoad}
        saveSocialAcc={saveSocialAcc}
        loginStatus={this.socialAccounts}
      />
    );
  };

  renderAccountsInformation = (accounts, saveSocialAcc) => {
    return accounts.map((elem, index) => {
      const isSocialAccount = config.SOCIAL_ACCOUNTS[elem.socialAccount.toLocaleLowerCase()];
      return (
        <li className="social-accounts__infoList" key={index.toString()}>
          <span
            className={`${isSocialAccount}-icon--${
              elem.isConnected ? 'enable' : 'disable'
            } social-accounts__social-icon`}
          />
          <span className="social-accounts__infoText">
            {elem.isConnected
              ? `${config.SOCIAL_ACCOUNTS[elem.socialAccount]} Connected`
              : `Connect to ${config.SOCIAL_ACCOUNTS[elem.socialAccount]}`}
          </span>
          {this.renderSocialLogins(loginComponents[isSocialAccount], saveSocialAcc)}
        </li>
      );
    });
  };

  refactorSocialDetails = accounts => {
    debugger;
    const accountsInfo = [];
    for (const prop in accounts) {
      /**
       * if condition @description -
       * In edit view its needed to render every social account no matter
       * if its connected or not.
       * In read view its needed to render only the connected accounts
       * So, the conditions are in a way that it creates array different for read
       * and edit view
       */
      if (prop === 'facebook') {
        accountsInfo.push({
          socialAccount: config.SOCIAL_ACCOUNTS_INFO[prop],
          isConnected: accounts[prop].accessToken,
          hasUserId: accounts[prop].userId,
        });
      }
    }
    console.log('accountsInfo----------------------', accountsInfo);
    this.socialAccounts = accountsInfo;
  };

  render() {
    const { saveSocialAcc, socialLoad, getSocialLoad, view, className } = this.props;
    if (Object.keys(getSocialLoad).length) {
      this.refactorSocialDetails(getSocialLoad);
    }

    return (
      <React.Fragment>
        <section className={className} data-selector="analytics-social-account">
          <h3 className="social-accounts__title">Social Accounts</h3>
          <p className="social-accounts__subTitle">
            Link your social accounts to earn extra points!
          </p>
          <ul>
            {this.renderAccountsInformation(this.socialAccounts, saveSocialAcc)}
            {/* <FacebookLoginComponent socialAccounts={this.socialAccounts} saveSocialAcc={saveSocialAcc} /> */}
          </ul>
        </section>
      </React.Fragment>
    );
  }
}

export default withStyles(Socialview, socialStyle);
export { Socialview as SocialviewVanilla };
