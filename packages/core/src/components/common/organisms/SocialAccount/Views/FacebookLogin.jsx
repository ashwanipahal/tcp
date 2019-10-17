import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import config from './config';
import ImageComp from '../../../atoms/Image';
import { getIconPath, getAPIConfig } from '../../../../../utils';
import BodyCopy from '../../../atoms/BodyCopy';

let bodyEle;
let elem;
let saveAccountInfo;
let closeModal;

/**
 * @function openLogin This function calls the Method of login for facebook and open up the dialog window where user sign in.
 *                     When user do a suc cesfull sign then we call the callback to pass the access token to the parent.
 * @param void
 * @return void
 */
const openLogin = () => {
  /* istanbul ignore next */
  window.FB.login(
    response => {
      if (response.status === 'connected') {
        const socialAccInfo = {
          facebook: 'facebook',
          accessToken: response.authResponse.accessToken,
          userId: response.authResponse.userID,
          isconnected: false,
        };
        saveAccountInfo({ socialAccInfo });
        closeModal({ state: true });
      }
    },
    { scope: 'public_profile,email' }
  );
};

/**
 * @function facebookSDK This function puts the facebook SDK on to the DOM
 * @param void
 * @return JSX of dropping the facebook SDK.
 */
const facebookSDK = () => {
  /* istanbul ignore next */
  window.onload = () => {
    window.FB.getLoginStatus(res => {
      if (res.authResponse && res.authResponse.accessToken && !elem.isConnected) {
        const socialAccInfo = {
          accessToken: res.authResponse.accessToken,
          userId: res.authResponse.userID,
        };
        saveAccountInfo(elem.socialAccount, socialAccInfo, false);
      }
    });
  };

  /* istanbul ignore next */
  const autoLogin = () => {
    if (window.FB && elem[0].isConnected) {
      openLogin();
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
      })(document, 'script', 'facebook-jssdk', bodyEle)}
    </script>
  );
};

const logoutUser = () => {
  /* istanbul ignore next */

  closeModal({ state: false });
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
  saveAccountInfo({ socialAccInfo });
};

const loginUser = element => {
  /* istanbul ignore next */
  if (element.isConnected) {
    logoutUser();
  } else {
    openLogin();
  }
};

const FacebookLoginComponent = props => {
  /*eslint-disable */
  //Destruction with global variables of the file is giving me error that i need to decalre them again. Hence assigning values this way
  bodyEle = document.getElementsByTagName('body')[0];
  saveAccountInfo = props.saveSocialAcc;
  elem = props.loginStatus;
  closeModal = props.pointModalClose;

  return (
    <React.Fragment>
      {elem &&
        elem.length &&
        elem.map(element => {
          {
            element.socialAccount === 'facebook' &&
            !element.isConnected &&
            (props.urlParams.socialAccount === 'facebook' && props.urlParams.id === 'my-preference')
              ? loginUser(element)
              : '';
          }

          return (
            <React.Fragment>
              {element.socialAccount === 'facebook' && !element.isConnected && (
                <BodyCopy
                  className="social-accounts__align social_accounts_cross_plus-icon"
                  onClick={() => loginUser(element)}
                  tabIndex="0"
                >
                  {ReactDOM.createPortal(facebookSDK(), bodyEle)}
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
};

FacebookLoginComponent.propTypes = {
  children: PropTypes.element,
  elem: PropTypes.shape({
    isConnected: PropTypes.bool,
  }),
  saveAccountInfo: PropTypes.func.isRequired,
};

export default FacebookLoginComponent;
