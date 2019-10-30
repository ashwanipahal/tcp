/**
 * @module InstagramLoginPage
 * @description This file is the redirect dummy page after instagram login.
 * The task of this page is to extract the access token and pass it back
 * to the parent window.
 * @author Sachin
 */

import { canUseDOM } from '../../../../../utils/utils.web';

/**
 * @method bindEvent
 * @description this method extracts the access token from the URL
 * and posts the extracted value to the parent.
 * @returns undefined
 */

export const bindEvent = () => {
  if (canUseDOM()) {
    window.onload = () => {
      const urlSplitArr = window.location.href.split('code=');
      const parentTextField = window.opener.document.getElementById('instagram-token');
      // urlSplitArr[1] should contain the access token,
      // set this value on the parent window input field
      if (parentTextField) {
        if (urlSplitArr[1]) {
          const splitArray = urlSplitArr[1];
          parentTextField.value = splitArray;
        } else {
          parentTextField.value = '';
        }
        parentTextField.click();
        window.close();
      }
    };
  }
};

export const InstagramLoginPage = () => {
  bindEvent();
  return null;
};

export default InstagramLoginPage;
