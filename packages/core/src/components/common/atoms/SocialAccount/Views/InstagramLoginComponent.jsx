/*eslint-disable */
/**
 * @module InstagramLoginComponent
 * @description this module is used for login to instagram account.
 * It takes the user to the instagram login page in new window, which is
 * then used to login to instagram using user account. The module saves
 * the access token and calls the function to store the access token.
 * @author Ipsita Basak
 */

import { PropTypes } from 'prop-types';
import React from 'react';
import { config } from 'util/config/config.js';
import { getLocationOrigin, getSiteId, handleGenericKeyDown, getHostName } from 'util/utility.js';
import {getApiHelper} from 'service/WebAPIServiceAbstractors/apiHelper.js';
import {getInstagramAbstractor} from 'service/instagramServiceAbstractor.js';
import {setLocalStorage, getLocalStorage} from 'util/localStorageManagement';

let elem;
let saveAccountInfo;
const redirectUrl = `${getLocationOrigin()}/${getSiteId()}/instagram`;
/**
 * @function onClickHandler This function handles the click event on plus/cross icon
 * @return undefined
 */
const onClickHandler = () => {
    if (elem.isConnected) {
        saveAccountInfo(elem.socialAccount, {
            accessToken: '',
            userId: ''
        },true)
    } else {
        openInstagramLoginWindow();
    }
};

/**
 * @function openInstagramLoginWindow This function opens the instagram login modal
 * @return undefined
 */
const openInstagramLoginWindow = () => {
    window.open(`${config.AUTH_URL.INSTAGRAM}?client_id=${config.CLIENT_SECRET_KEY.instagram}&redirect_uri=${redirectUrl}&response_type=code`,
        '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=50,left=50,width=800,height=400');
};
/**
 * @function InstagramLoginComponent This component validates the instagram login and stores the access token
 * @param {Callback} the callback function which is calledwhen user does a succesfull sign in 
 * @return CTA for connecting to instagram - The button connects/disconnects instagram
 */
export class InstagramLoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.apiHelper = getApiHelper(getSiteId(), getHostName());
        this.instagramAbstractor = getInstagramAbstractor(this.apiHelper);
    }

    /**
 * @method handleOnKeyPress
 * handles the keypress with tabbing focus. 
 * triggers the edit method when enter key is pressed
 */
handleOnKeyPress = () => {
    return handleGenericKeyDown(event, config.KEY_CODES.ENTER, onClickHandler);
}

/**
 * @function requestAccessToken This function captures the instagram code explicitly passed from the child window.
 * After the value is fetched from the instagram-token textfield.
 * After the value is fetched from the textfield,
 * the request to generate access token and userId to save the instagram token is called.
 * This saves the token value to the backend and clears the field after that.
 * @param none
 * @return none
**/

requestAccessToken = () => {
    const instagramTokenField = document.getElementById('instagram-token');
    const instagramTokenVal = instagramTokenField.value;
    if(instagramTokenVal) {
        this.instagramAbstractor.getAuthInfo(instagramTokenVal, redirectUrl).then(res => {
            saveAccountInfo(elem.socialAccount, res, false);
        });
        instagramTokenField.value = '';
    }
}
  render () {
    const props = this.props;
    elem = props.elem;
    saveAccountInfo = props.saveAccountInfo;
    let instagramLocalStorageVal = getLocalStorage('instagramToken');
    /** If auto-open for instagram is set, the login modal will open
    /* After that, the localStorage needs to be reset to ''
    /* so that it doesn't trigger the login modal again
    **/
    if(getLocalStorage('auto-open') === config.SOCIAL_ACCOUNTS.instagram) {
        openInstagramLoginWindow();
        setLocalStorage({key: 'auto-open', value: ''});
    }
    if(instagramLocalStorageVal) {
        this.instagramAbstractor.getAuthInfo(instagramLocalStorageVal, redirectUrl).then(res => {
            if(res) {
                saveAccountInfo(elem.socialAccount, res, false);
            }
        });
        setLocalStorage({key: 'instagramToken', value: ''});
    }
    return(
        <React.Fragment>
            <div className='social-accounts__CTA' tabIndex="0" onClick={onClickHandler} onKeyDown={this.handleOnKeyPress} >{props.children}</div>
            <input type='hidden' onClick={this.requestAccessToken} id='instagram-token' />
         </React.Fragment>
    );
  }
};

InstagramLoginComponent.propTypes = {
    elem: PropTypes.shape({
        isConnected: PropTypes.bool
    })
};
