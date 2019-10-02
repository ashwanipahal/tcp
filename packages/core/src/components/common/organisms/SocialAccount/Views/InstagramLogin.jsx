/**
 * @module InstagramLoginComponent
 * @description this module is used for login to instagram account.
 * It takes the user to the instagram login page in new window, which is
 * then used to login to instagram using user account. The module saves
 * the access token and calls the function to store the access token.
 * @author Ipsita Basak
 */

import React from 'react';
import PropTypes from 'prop-types';
import config from './config';
import { getSiteId, getLocationOrigin } from '../../../../../utils/utils.web';
import { getIconPath, getAPIConfig } from '../../../../../utils';
import BodyCopy from '../../../atoms/BodyCopy';
import ImageComp from '../../../atoms/Image';

let elem;
let saveAccountInfo;
let closeModal;

/**
 * @function onClickHandler This function handles the click event on plus/cross icon
 * @return undefined
 */
export const onClickHandler = () => {
  const apiConfig = getAPIConfig();
  if (elem[1].isConnected) {
    const socialAccInfo = {
      instagram: elem[1].socialAccount,
      accessToken: '',
      isconnected: true,
      userId: '',
    };
    saveAccountInfo({ socialAccInfo });
  } else {
    window.open(
      `${config.AUTH_URL.INSTAGRAM}?client_id=${
        apiConfig.instakey
      }&redirect_uri=${getLocationOrigin()}/${getSiteId()}/instagram&response_type=token`,
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=50,left=50,width=800,height=400'
    );
  }
};

/**
 * @function InstagramLoginComponent This component validates the instagram login and stores the access token
 * @param {Callback} the callback function which is calledwhen user does a succesfull sign in
 * @return CTA for connecting to instagram - The button connects/disconnects instagram
 */
const InstagramLoginComponent = props => {
  const { saveSocialAcc, loginStatus, pointModalClose } = props;
  saveAccountInfo = saveSocialAcc;
  elem = loginStatus;
  closeModal = pointModalClose;

  const onTokenCapture = () => {
    const instagramTokenField = document.getElementById('instagram-token');
    const instagramTokenVal = instagramTokenField.value;
    if (instagramTokenVal) {
      const socialAccInfo = {
        instagram: elem[1].socialAccount,
        accessToken: instagramTokenVal,
        isconnected: false,
        userId: instagramTokenVal.split('.')[0],
      };
      saveAccountInfo({ socialAccInfo });
      instagramTokenField.value = '';
      closeModal({ state: true });
    }
  };

  return (
    <React.Fragment>
      {elem &&
        elem.length &&
        elem.map(element => {
          return (
            <React.Fragment>
              {element.socialAccount === 'instagram' && !element.isConnected && (
                <BodyCopy
                  className="social-accounts__align social_accounts_cross_plus-icon"
                  onClick={onClickHandler}
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
              {element.socialAccount === 'instagram' && element.isConnected && (
                <BodyCopy className="social-accounts__align social_accounts_cross_plus-icon">
                  <ImageComp
                    className="social-account-icon"
                    width={15}
                    height={15}
                    src={getIconPath('close-icon')}
                    data-locator="facebookCrossIcon"
                    onClick={onClickHandler}
                  />
                </BodyCopy>
              )}
            </React.Fragment>
          );
        })}
      <input type="hidden" onClick={onTokenCapture} id="instagram-token" />
    </React.Fragment>
  );
};

InstagramLoginComponent.propTypes = {
  socialLoad: PropTypes.shape({}).isRequired,
  saveSocialAcc: PropTypes.shape({}).isRequired,
  getSocialAcc: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  pointModalClose: PropTypes.func.isRequired,
  loginStatus: PropTypes.shape({}).isRequired,
};

export { InstagramLoginComponent };
