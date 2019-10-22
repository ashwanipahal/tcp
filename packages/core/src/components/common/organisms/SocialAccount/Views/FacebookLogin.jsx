import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import config from './config';
import ImageComp from '../../../atoms/Image';
import { getIconPath, getAPIConfig } from '../../../../../utils';
import BodyCopy from '../../../atoms/BodyCopy';

export class FacebookLoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.bodyEle = null;
    this.elem = null;
    this.saveAccountInfo = null;
    this.closeModal = null;
  }

  componentDidMount() {
    const { urlParams } = this.props;
    if (urlParams.socialAccount === 'facebook' && urlParams.id === 'my-preference') {
      this.openLogin();
    }
  }

  /**
   * @function facebookSDK This function puts the facebook SDK on to the DOM
   * @param void
   * @return JSX of dropping the facebook SDK.
   */
  facebookSDK = () => {
    /* istanbul ignore next */
    window.onload = () => {
      window.FB.getLoginStatus(res => {
        if (res.authResponse && res.authResponse.accessToken && !this.elem.isConnected) {
          const socialAccInfo = {
            accessToken: res.authResponse.accessToken,
            userId: res.authResponse.userID,
          };
          this.saveAccountInfo(this.elem.socialAccount, socialAccInfo, false);
        }
      });
    };

    /* istanbul ignore next */
    const autoLogin = () => {
      if (window.FB && this.elem[0].isConnected) {
        this.openLogin();
      }
    };

    /* istanbul ignore next */
    window.fbAsyncInit = () => {
      const apiConfig = getAPIConfig();
      window.FB.init({
        appId: apiConfig.fbkey,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1',
        status: true,
        cookie: true,
      });
    };
    /* istanbul ignore next */
    return (
      /*eslint-disable */
      <script>
        {(function(d, s, id, body) {
          const fjs = d.createElement(s);
          fjs.id = 'facebook';
          body.appendChild(fjs);
          if (d.getElementById(id)) {
            return;
          }
          const js = d.createElement(s);
          js.id = id;
          js.onload = autoLogin;
          js.src = config.SOCIAL_SDK.facebook;
          fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk', this.bodyEle)}
      </script>
    );
  };

  logoutUser = () => {
    /* istanbul ignore next */

    this.closeModal({ state: false });
    try {
      window.FB.logout();
    } catch (ex) {
      console.log(`expection ${ex}`);
    }
    const socialAccInfo = {
      facebook: 'facebook',
      accessToken: '',
      userId: '',
      isconnected: true,
    };
    this.saveAccountInfo({ socialAccInfo });
  };

  loginUser = element => {
    /* istanbul ignore next */
    if (element.isConnected) {
      this.logoutUser();
    } else {
      this.openLogin();
    }
  };

  render() {
    const { saveSocialAcc, loginStatus, pointModalClose } = this.props;

    this.bodyEle = document.getElementsByTagName('body')[0];
    this.saveAccountInfo = saveSocialAcc;
    this.elem = loginStatus;
    this.closeModal = pointModalClose;

    return (
      <React.Fragment>
        {this.elem &&
          this.elem.length &&
          this.elem.map(element => {
            return (
              <React.Fragment>
                {element.socialAccount === 'facebook' && !element.isConnected && (
                  <BodyCopy
                    className="social-accounts__align social_accounts_cross_plus-icon"
                    onClick={() => this.loginUser(element)}
                    tabIndex="0"
                  >
                    {ReactDOM.createPortal(this.facebookSDK(), this.bodyEle)}
                    <ImageComp
                      className="social-account-icon"
                      width={15}
                      height={15}
                      src={getIconPath('plus-icon')}
                      data-locator="facebookPlusIcon"
                    />
                  </BodyCopy>
                )}
                {element.socialAccount === 'facebook' && element.isConnected && (
                  <BodyCopy
                    className="social-accounts__align social_accounts_cross_plus-icon"
                    onClick={logoutUser}
                  >
                    <ImageComp
                      className="social-account-icon"
                      width={15}
                      height={15}
                      src={getIconPath('close-icon')}
                      data-locator="facebookCrossIcon"
                    />
                  </BodyCopy>
                )}
              </React.Fragment>
            );
          })}
      </React.Fragment>
    );
  }
}

FacebookLoginComponent.propTypes = {
  children: PropTypes.element,
  elem: PropTypes.shape({
    isConnected: PropTypes.bool,
  }),
  urlParams: PropTypes.shape({
    socialAccount: PropTypes.string,
    id: PropTypes.string,
  }),
  saveAccountInfo: PropTypes.func.isRequired,
};

FacebookLoginComponent.defaultProps = {
  urlParams: {
    socialAccount: '',
  },
};

export default FacebookLoginComponent;
