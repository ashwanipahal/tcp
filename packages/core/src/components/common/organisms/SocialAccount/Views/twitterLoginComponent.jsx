/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import {
  getSiteId,
  //   getHostName,
  getLocationOrigin,
  handleGenericKeyDown,
} from '../../../../../utils/utils.web';
import config from './config';
import { getIconPath } from '../../../../../utils';
import BodyCopy from '../../../atoms/BodyCopy';
import ImageComp from '../../../atoms/Image';
import { getAccessToken } from './twitterDynamicAbstractor';

let elem;
let saveAccountInfo;
// eslint-disable-next-line
let closeModal;

class TwitterLoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.tokenInput = null;
    this.verifierInput = null;
  }

  /**
   * @method setTokenInput This method sets the ref of the hidden input field used to store auth token
   * @param ele {Object} The DOM object of the hidden input field used to store auth token
   */

  setTokenInput = ele => {
    this.tokenInput = ele;
  };

  /**
   * @method setVerifierInput This method sets the ref of the hidden input field used to store verifier
   * @param ele {Object} The DOM object of the hidden input field used to store verifier
   */

  setVerifierInput = ele => {
    this.verifierInput = ele;
  };

  /**
   * @method openChildWindow This method opens up the child window to redirect user to twitter authentication flow
   * after fetching the auth token from the API
   */

  openChildWindow = () => {
    window.open(
      `${getLocationOrigin()}/${getSiteId()}${config.ACCOUNT_REDIRECT.TWITTER}`,
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=50,left=50,width=800,height=400'
    );
  };

  /**
   * @method createTwitterObj This method creates the twitter object with userId and access token
   * after splitting the access token to extract the user id
   */
  createTwitterObj = res => {
    // The first part before '-' is the userID
    // Hence, spliting to extract it from the accesstoken
    const splitVal = (res && res.split('-')) || [];
    return {
      accessToken: res,
      userId: splitVal[0],
    };
  };

  /**
   * @method logout This method saves the token as "" in WCS for twitter. We do not log user out from twitter.
   */

  logout = () => {
    const socialAccInfo = {
      twitter: elem[2].socialAccount,
      accessToken: '',
      isconnected: true,
      userId: '',
    };
    saveAccountInfo({ socialAccInfo });
  };

  /**
   * @method getAccessToken This is a callback method which trigger when the child window has set the auth
   * token and verifier in parent and it triggers the click event of the hidden input once it is done. This method takes the
   * Auth and the verifier and triggers the step three of integration.
   */

  getAccessToken = () => {
    getAccessToken(this.tokenInput.value, this.verifierInput.value).then(res => {
      if (res) {
        this.saveAccountInfo(this.createTwitterObj(res));
      }
    });
  };

  /**
   * @method saveAccountInfo Thsi method saves the access token of the user to the WCS.
   * @param acessToken {String} The access token which we have received from step 3 of integartion.
   */

  saveAccountInfo = payload => {
    const socialAccInfo = {
      twitter: elem[2].socialAccount,
      accessToken: payload.accessToken,
      isconnected: false,
      userId: payload.userId,
    };
    saveAccountInfo({ socialAccInfo });
    closeModal({ state: true });
  };

  /**
   * @method handleOpenCloseTwitterOnKeyPress
   * handles the keypress with tabbing focus.
   * triggers the edit method when enter key is pressed
   */
  handleOpenCloseTwitterOnKeyPress = () => {
    const twitterConnection = !elem.isConnected ? this.openChildWindow : this.logout;
    return handleGenericKeyDown(config.KEY_CODES.ENTER, twitterConnection);
  };

  render() {
    const { saveSocialAcc, loginStatus, pointModalClose } = this.props;
    saveAccountInfo = saveSocialAcc;
    elem = loginStatus;
    closeModal = pointModalClose;
    return (
      <React.Fragment>
        {elem &&
          elem.length &&
          elem.map(element => {
            return (
              <React.Fragment>
                {element.socialAccount === 'twitter' && !element.isConnected && (
                  <BodyCopy
                    className="social-accounts__align social_accounts_cross_plus-icon"
                    onClick={this.openChildWindow}
                    tabIndex="0"
                  >
                    <ImageComp
                      className="social-account-icon"
                      width={15}
                      height={15}
                      src={getIconPath('plus-icon')}
                      data-locator="facebookPlusIcon"
                    />
                  </BodyCopy>
                )}
                {element.socialAccount === 'twitter' && element.isConnected && (
                  <BodyCopy className="social-accounts__align social_accounts_cross_plus-icon">
                    <ImageComp
                      className="social-account-icon"
                      width={15}
                      height={15}
                      src={getIconPath('close-icon')}
                      data-locator="facebookCrossIcon"
                      onClick={this.logout}
                    />
                  </BodyCopy>
                )}
              </React.Fragment>
            );
          })}

        <input type="hidden" id="twitter-token" ref={this.setTokenInput} />
        <input type="hidden" id="twitter-verifer" ref={this.setVerifierInput} />
        <input type="hidden" onClick={this.getAccessToken} id="twitter-auth-tokens" />
      </React.Fragment>
    );
  }
}

TwitterLoginComponent.propTypes = {
  socialLoad: PropTypes.shape({}).isRequired,
  saveSocialAcc: PropTypes.shape({}).isRequired,
  getSocialAcc: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  pointModalClose: PropTypes.func.isRequired,
  loginStatus: PropTypes.shape({}).isRequired,
};

export default TwitterLoginComponent;
