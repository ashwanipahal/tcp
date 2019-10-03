import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from './FacebookLogin';
import { InstagramLoginComponent } from './InstagramLogin';
import TwitterLoginComponent from './twitterLoginComponent';
import config from './config';
import socialStyle from '../styles/social.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import Modal from '../../../molecules/Modal';
import Button from '../../../atoms/Button';
import { getLabelValue, routerPush } from '../../../../../utils';
import getLinkedSocialAccountLabel from '../utils';

const loginComponents = {
  Facebook: FacebookLogin,
  Instagram: InstagramLoginComponent,
  Twitter: TwitterLoginComponent
};

class Socialview extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    socialLoad: PropTypes.shape({}).isRequired,
    saveSocialAcc: PropTypes.shape({}).isRequired,
    getSocialAcc: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    pointModalClose: PropTypes.func.isRequired,
    setPointsModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  constructor() {
    super();
    this.socialAccounts = [];
    this.pointsInformation = {};
  }

  renderSocialLogins = (Component, saveSocialAcc) => {
    const { socialLoad, pointModalClose } = this.props;
    return (
      <Component
        socialLoad={socialLoad}
        saveSocialAcc={saveSocialAcc}
        loginStatus={this.socialAccounts}
        pointModalClose={pointModalClose}
      />
    );
  };

  renderAccountsInformation = (accounts, saveSocialAcc, labels) => {
    const { setPointsModal, className } = this.props;
    return accounts.map((elem, index) => {
      const isSocialAccount =
        config && config.SOCIAL_ACCOUNTS[elem.socialAccount.toLocaleLowerCase()];
      return (
        <li className="social-accounts__infoList" key={index.toString()}>
          <span
            data-locator={
              !elem.isConnected ? `${isSocialAccount}DisabledIcon` : `${isSocialAccount}EnabledIcon`
            }
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
          {setPointsModal && this.pointsInformation.points > 0 && (
            <Modal
              fixedWidth
              isOpen={setPointsModal}
              onRequestClose={this.onClose}
              overlayClassName="TCPModal__Overlay"
              className={`${className} TCPModal__Content`}
              maxWidth="450px"
              minHeight="520px"
            >
              <BodyCopy
                fontSize="fs22"
                fontFamily="secondary"
                textAlign="center"
                component="h3"
                fontWeight="black"
              >
                {getLabelValue(labels, 'lbl_prefrence_social_points_heading')}
              </BodyCopy>
              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                textAlign="center"
                className="social-accounts-alignment"
              >
                {getLabelValue(labels, 'lbl_prefrence_social_points_text_1')}
                <BodyCopy
                  fontSize="fs14"
                  fontFamily="secondary"
                  textAlign="center"
                  component="span"
                  className="points-theme"
                  fontWeight="black"
                >
                  {this.pointsInformation.points}
                </BodyCopy>
                {getLinkedSocialAccountLabel(this.pointsInformation.activity, labels)}
              </BodyCopy>
              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                textAlign="center"
                className="social-accounts-alignment"
              >
                {getLabelValue(labels, 'lbl_prefrence_social_points_text_3')}
              </BodyCopy>

              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                textAlign="center"
                className="social-accounts-alignment"
              >
                {getLabelValue(labels, 'lbl_prefrence_social_points_text_4')}
                <BodyCopy fontSize="fs14" fontFamily="secondary" textAlign="center">
                  {getLabelValue(labels, 'lbl_prefrence_social_points_text_5')}
                </BodyCopy>
              </BodyCopy>

              <BodyCopy
                fontSize="fs14"
                fontFamily="secondary"
                textAlign="center"
                className="social-accounts-alignment"
              >
                <Button
                  buttonVariation="fixed-width"
                  fill="BLUE"
                  type="submit"
                  className="button-style"
                  onClick={this.viewAll}
                >
                  {getLabelValue(labels, 'lbl_prefrence_social_points_modal_viewall_btn')}
                </Button>

                <Button
                  buttonVariation="fixed-width"
                  fill="WHITE"
                  type="submit"
                  className="button-style"
                  onClick={this.onClose}
                  component="div"
                >
                  {getLabelValue(labels, 'lbl_prefrence_social_points_modal_close_btn')}
                </Button>
              </BodyCopy>
            </Modal>
          )}
        </li>
      );
    });
  };

  refactorSocialDetails = accounts => {
    const accountsInfo = [];
    Object.keys(accounts).forEach(prop => {
      if (prop === 'facebook' || prop === 'instagram' || prop === 'twitter') {
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

  onClose = () => {
    const { pointModalClose } = this.props;
    pointModalClose({ state: false });
  };

  viewAll = () => {
    routerPush('/account?id=extra-points', '/account/extra-points');
  };

  render() {
    const { saveSocialAcc, getSocialAcc, className, labels } = this.props;

    if (Object.keys(getSocialAcc).length) {
      this.refactorSocialDetails(getSocialAcc);
    }

    return (
      <React.Fragment>
        <section className={className} data-selector="analytics-social-account">
          <p className="social-accounts__subTitle" data-locator="mypreference-socialaccountheader">
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
