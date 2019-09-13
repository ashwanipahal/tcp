/*eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import { config } from '../Views/config';
// import {setLocalStorage, getLocalStorage} from 'util/localStorageManagement';

let bodyEle;
let elem;
let saveAccountInfo;
let children;

/**
 * @function openLogin This function calls the Method of login for facebook and open up the dialog window where user sign in.
 *                     When user do a suc cesfull sign then we call the callback to pass the access token to the parent.
 * @param void
 * @return void
 */
const openLogin = () => {
  /* istanbul ignore next */
  window.FB.login(
    function(response) {
      if (response.status === 'connected') {
        const socialAccInfo = {
          facebook: 'facebook',
          accessToken: response.authResponse.accessToken,
          userId: response.authResponse.userID,
          isconnected: false,
        };
        saveAccountInfo({ socialAccInfo });
      } else {
        // The person is not logged into this app or we are unable to tell.
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
  window.onload = function() {
    window.FB.getLoginStatus(function(res) {
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
  window.fbAsyncInit = function() {
    window.FB.init({
      appId: config.CLIENT_SECRET_KEY.facebook,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.1',
      status: true,
      cookie: true,
    });
  };
  return (
    <script>
      {(function(d, s, id, body) {
        let js;
        let fjs = d.createElement(s);
        fjs.id = 'facebook';
        body.appendChild(fjs);
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.onload = autoLogin;
        js.src = config.SOCIAL_SDK.facebook;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk', bodyEle)}
    </script>
  );
};

const autoLogin = () => {
  /** If auto-open for facebook is set, the login modal will open
  /* After that, the localStorage needs to be reset to ''
  /* so that it doesn't trigger the login modal again
  **/
  if (window.FB) {
    openLogin();
    //Trigger login modal if not already connected
    // if (!elem.isConnected) {
    //     openLogin();
    // }
    //setLocalStorage({key: 'auto-open', value: ''});
  }
};

const logoutUser = () => {
  /* istanbul ignore next */
  try {
    window.FB.logout();
  } catch (ex) {
    console.log(`expection ${ex}`);
  }
  /* istanbul ignore next */
  // saveAccountInfo(elem.socialAccount, {
  //     accessToken: '',
  //     userId: ''
  // },true)
};

export const loginUser = () => {
  /* istanbul ignore next */
  openLogin();
  // if (elem.isConnected) {
  //   logoutUser();
  // } else {
  //   openLogin();
  // }
};

const FacebookLoginComponent = props => {
  bodyEle = document.getElementsByTagName('body')[0];
  //Destruction with global variables of the file is giving me error that i need to decalre them again. Hence assigning values this way
  saveAccountInfo = props.saveSocialAcc;

  return (
    <div className="social-accounts__CTA" onClick={loginUser} tabIndex="0">
      {/* istanbul ignore next */
      ReactDOM.createPortal(facebookSDK(), bodyEle)}
      click here
    </div>
  );
};

FacebookLoginComponent.propTypes = {
  children: PropTypes.element,
  elem: PropTypes.shape({
    isConnected: PropTypes.bool,
  }),
  saveAccountInfo: PropTypes.func.isRequired,
};

export { FacebookLoginComponent };
