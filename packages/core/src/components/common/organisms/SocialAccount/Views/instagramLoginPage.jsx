// eslint-disable
/**
 * @module InstagramLoginPage
 * @description This file is the redirect dummy page after instagram login.
 * The task of this page is to extract the access token and pass it back
 * to the parent window.
 * @author Harnoor Bandesh & Ipsita Basak
 */


/* eslint-disable */
import React from 'react';
import {getSiteId, getLocationOrigin, canUseDOM} from '../../../../../utils/utils.web';
import config  from '../../../organisms/SocialAccount/Views/config';

/**
 * @method bindEvent
 * @description this method extracts the access token from the URL
 * and posts the extracted value to the parent.
 * @returns undefined
 */
const InstagramLoginPage = () => {
    bindEvent();
    return null;
},
bindEvent = () => {
    debugger;
  if(canUseDOM()) {
    debugger;
         window.onload = function() {
            let urlSplitArr = window.location.href.split('#access_token='),
                parentTextField = window.opener.document.getElementById('instagram-token');
            //urlSplitArr[1] should contain the access token, 
            //set this value on the parent window input field
            if(parentTextField) {
                if(urlSplitArr[1]) {
                    parentTextField.value = urlSplitArr[1];
                } else {
                    parentTextField.value = '';
                }
               parentTextField.click();
               window.close();
            }
        }
    }
};

export  default InstagramLoginPage
