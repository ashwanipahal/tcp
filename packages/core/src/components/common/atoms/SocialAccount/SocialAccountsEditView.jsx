/**
 * @module SocialAccountsEditView this method renders the view 
 * of social account information. CTA are responsible for connecting
 * and disconnecting the respective social account
 * 
 */

import React from 'react';
import {PropTypes} from 'prop-types';
import {config} from 'util/config/config.js';
import {labels} from 'util/labels/labels.js';
import {FacebookLoginComponent} from './logins/facebookLoginComponent';
import {PinterestLogin} from './logins/pinterestLogin.jsx';
import {InstagramLoginComponent} from './logins/InstagramLoginComponent';
import {TwitterLoginComponent} from './logins/twitterLoginComponent';

const loginComponents = {
    Pinterest: PinterestLogin,
    Facebook: FacebookLoginComponent,
    Instagram: InstagramLoginComponent,
    Twitter: TwitterLoginComponent,
};

/**
 * @method renderSocialLogins 
 * @description this method creates react element manually
 * this manual creation is done because of the dynamic mapping of social
 * accounts
 * @param {string} component this param is the social account component name 
 * @param {object} elem this object is the individual object which we get from the 
 * array of social accounts information 
 * @param {function} saveAccountInfo this method we get from the parent component
 * the method is reponsible for sending the login token of the respective social
 * account 
 */
const renderSocialLogins = (Component, elem, saveAccountInfo) => {
    return (<Component elem={elem} saveAccountInfo={saveAccountInfo}>
                <button
                    aria-label={
                        elem.isConnected
                        ? `Click to disconnect from ${elem.socialAccount}`
                        : `Click to connect to ${elem.socialAccount}`
                    }                    
                    type="button">
                    <span className={
                        elem.isConnected
                        ? 'cross-icon'
                        : 'plus-icon'}
                        data-analytics={labels.SOCIAL_ACCOUNTS[elem.socialAccount]}/>
                </button>
            </Component>);
};

/**
 * @method renderAccountsInformation - this method is responsible 
 * for rendering the list of information received about the social 
 * accounts connectivity
 * @param {array} accounts the array of social account information
 * to be rendered in the list
 * @returns {Element} returns the list items of information of social 
 * accounts 
 */

const renderAccountsInformation = (accounts, saveAccountInfo) => {
    return accounts.map((elem, index) => {
      const isSocialAccount = config.SOCIAL_ACCOUNTS[elem.socialAccount];
      return (
          <li
              className="social-accounts__infoList"
              key={index.toString()}>
              <span className={
                  `${isSocialAccount}-icon--${elem.isConnected ? 'enable' : 'disable'} social-accounts__social-icon`} />
              <span className="social-accounts__infoText">
                  {elem.isConnected
                  ? `${labels.SOCIAL_ACCOUNTS[elem.socialAccount]} Connected`
                  : `Connect to ${labels.SOCIAL_ACCOUNTS[elem.socialAccount]}`}
              </span>
              {loginComponents[labels.SOCIAL_ACCOUNTS[elem.socialAccount]] && renderSocialLogins(loginComponents[labels.SOCIAL_ACCOUNTS[elem.socialAccount]], elem, saveAccountInfo)}
          </li>
      );
    });
  };

/**
*   @method SocialAccountsEditView this method renders the main 
* view of social accounts edit view
* @param {Object} props - information it get from the parent component to
* render the component
*/

const SocialAccountsEditView = (props) => {
    const {
        accounts,
        saveAccountInfo
    } = props;
    return (
        <section className="social-accounts" data-selector="analytics-social-account">
            <h3 className="social-accounts__title">
                Social Accounts
            </h3>
            <p className="social-accounts__subTitle">
                Link your social accounts to earn extra points!
            </p>
            <ul>
                {accounts.length > 0 && renderAccountsInformation(accounts, saveAccountInfo)}
            </ul>
        </section>
    );
  };

SocialAccountsEditView.propTypes = {
  accounts: PropTypes.arrayOf(Object),
  saveAccountInfo: PropTypes.func
};

export {SocialAccountsEditView, renderSocialLogins};
