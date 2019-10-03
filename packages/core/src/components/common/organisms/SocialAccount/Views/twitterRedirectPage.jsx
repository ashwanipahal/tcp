/**
 * @module TwitterRedirectPage
 * @description This file is the redirect page after twitter login. We open up a child window and lands the user to the
 * authnetication page of twitter. Once the user allows the access to the application twitter directed us to the redirect URL
 * in the same window. The task of this page is to extract the access token and pass it back
 * to the parent window.
 * @author Harnoor Bandesh
 */

/* eslint-disable */
import React from 'react';
import { canUseDOM, getUrlParameter, getSiteId, getLocationOrigin, getHostName } from '../../../../../utils/utils.web';

const TwitterRedirectPage = () => {
    bindEvent();
    return (
        <React.Fragment>
            {null}
        </React.Fragment>
    );
};
/**
 * @method makeAuthCall This method makes the authentication call for getting the auth token for the user. 
 * This is step one of the integration.
 */
const makeAuthCall = () => {
    let apiHelper = getApiHelper(getSiteId(), getHostName());

    getTwitterAbstractor(apiHelper).getAuthToken().then(res => {
        window.location = `${config.AUTH_URL.TWITTER}?oauth_token=${res}`;
    });
};

/**
 * @method bindEvent This method binds the event on laod of the window. thsi method fetches the access token and verifier 
 * form the URL and sets it to the hidden input of the parent and calls the click of the hidden input in parent which saves 
 * makes the call for access token.
 */
const bindEvent = () => {
  if(canUseDOM()) {
      alert('hello twitter')
      debugger;
    window.addEventListener("load", () => {
        let token = getUrlParameter('oauth_token'),
        verifier = getUrlParameter('oauth_verifier'),
        denied = getUrlParameter('denied'),
        stage = getUrlParameter('stage');
        //If twitter authentication is successful and the page is loaded second time
        if(token && verifier) {
            let parentWindow = window.opener, parentWindowDocument,
                parentTextTokenField = null, parentTextVerifierField, parentSetTokenField;
            //Look for document and other fields only when parentWindow is defined
            //In case of mobile app redirection, window.opener is null
            if(parentWindow) {
                parentWindowDocument = window.opener.document;
                parentTextTokenField = parentWindowDocument.getElementById('twitter-token');
                parentTextVerifierField = parentWindowDocument.getElementById('twitter-verifer');
                parentSetTokenField = parentWindowDocument.getElementById('twitter-auth-tokens');
            }
            //Check for dom elements where value is to be set, if not found, set in localstorage
            if(parentTextTokenField) {
                parentTextTokenField.value = token || '';
                parentTextVerifierField.value = verifier || '';
                parentSetTokenField.click();
                window.close();
            }
        } 
        //If the twitter authorization is denied
        else if(denied) {
            //If the opener document is available and has twitter token field, it is not IAB
            //In this case, close the window else redirect to preference
            if(window.opener.document.getElementById('twitter-token')) {
                window.close();
            } else {
                window.location = `${getLocationOrigin()}/${getSiteId()}${config.ACCOUNT_REDIRECT.PREFERENCE}`;
            }
        }
        //If the query string is passed from the child window to request auth token
        else if(stage) {
            makeAuthCall();
        }
    });
  }
};

export default TwitterRedirectPage  
