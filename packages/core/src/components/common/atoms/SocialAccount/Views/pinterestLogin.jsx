/**
 * @module PinterestLogin
 * @description this module is used for login to pinterest account.
 * It drops a sdk to the body of application on mounting, which is
 * then used to login whenever user invokes login
 * @author Prabhjot Singh
 */

import React from "react";
import ReactDOM from "react-dom";
import { PropTypes } from "prop-types";
import { ServiceResponseError } from "service/ServiceResponseError";
import { config } from "util/config/config.js";

/**
 * @method pinterestScript
 * @description this method drops the sdk to the body of
 * the application
 * @returns script of the pinterest sdk
 */
const pinterestScript = () => {
    return (
       /* istanbul ignore next */
        <script>
            {(function (document, scr, id) {
              let js;
              let scrElement = document.getElementsByTagName(scr)[0];
              if (document.getElementById(id)) {
/** this condition checks if script tag with pinterest-jssdk id already exist */
                return;
              }
              js = document.createElement(scr);
              js.id = id;
              js.src = config.SOCIAL_SDK.pinterest;
              scrElement.parentNode.insertBefore(js, scrElement);
            })(document, "script", "pinterest-jssdk")}
            {
/** this method initiatest the sdk droped with the respective app id*/
          (window.pAsyncInit = function () {
            window.PDK.init({
              appId: config.CLIENT_SECRET_KEY.pinterest,
              cookie: true
            });
          })
        }
        </script>
    );
  };
  /**
   * @method openPinterest
   * @description this method invokes the login API of pinterest
   * which then invokes the saveAccountInfo method from the parent
   * @param {function} saveAccountInfo this method takes account name
   * and the token as parameters. This method is invoked when the pinterest
   * login is success
   */
const openPinterest = props => {
    /* istanbul ignore next */
    window.PDK.login(
/** 
 * scope: here the scope params are used by pinterest for privacy policy
 * When the user succesfully logins to the pinterest. Then user is asked 
 * for privacy policy to allow or not
 */
      {
        scope: "read_relationships,read_public"
      },
      response => {
        if (!response || response.error) {
          throw new ServiceResponseError(response.error);
        } else {
          props.saveAccountInfo(
            props.elem.socialAccount,
            window.PDK.getSession().accessToken,
            false
          );
        }
      }
    );
  };

  /**
   * @method logoutPinterest
   * @description This method revokes the acces of the user and clears the token in WCS
   */

const logoutPinterest = props => {
    try{
      window.PDK.logout();
    } catch(ex) {
      console.log(`expection: ${ex}`);
    }
    props.saveAccountInfo(props.elem.socialAccount, "",true);
  };
  /**
   * @method loginPinterest
   * @description this  method is invoked
   * on successful Login and then we make
   * ajax call from inside it to save social account info
   */

const loginPinterest = (props) => {
    return props.elem.isConnected
      ? logoutPinterest(props)
      : openPinterest(props);
}

/**
 * @method PinterestLogin
 * @param {object} props this object contains the respective information
 * for the component to get rendered
 * @returns returns the component
 */
export const PinterestLogin = props => {
  const { children } = props;
  return (
      <div
      className="social-accounts__CTA"
      onClick={() => {
        loginPinterest(props);
      }}
      tabIndex="0"
    >
          {/* istanbul ignore next */
      ReactDOM.createPortal(pinterestScript(), document.body)}
          {children}
      </div>
  );
};

PinterestLogin.propTypes = {
  children: PropTypes.element
};
