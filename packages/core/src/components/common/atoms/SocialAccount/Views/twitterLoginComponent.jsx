import React from 'react';
import {getSiteId, getHostName, getLocationOrigin, handleGenericKeyDown} from 'util/utility.js';
import {getApiHelper} from 'service/WebAPIServiceAbstractors/apiHelper.js';
import {getTwitterAbstractor} from 'service/twitterServiceAbstractor.js';
import { config } from 'util/config/config.js';
import {setLocalStorage, getLocalStorage} from 'util/localStorageManagement';

export class  TwitterLoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.apiHelper = getApiHelper(getSiteId(), getHostName());
        this.twitterAbstractor = getTwitterAbstractor(this.apiHelper);
        this.tokenInput = null;
        this.verifierInput = null;
    }

    /**
     * @method setTokenInput This method sets the ref of the hidden input field used to store auth token 
     * @param ele {Object} The DOM object of the hidden input field used to store auth token
     */

    setTokenInput = ele => {
        this.tokenInput = ele;
    }

    /**
     * @method setVerifierInput This method sets the ref of the hidden input field used to store verifier 
     * @param ele {Object} The DOM object of the hidden input field used to store verifier
     */

    setVerifierInput = ele => {
        this.verifierInput = ele;
    }

    /**
     * @method openChildWindow This method opens up the child window to redirect user to twitter authentication flow
     * after fetching the auth token from the API
     */

    openChildWindow = () => {
        window.open(`${getLocationOrigin()}/${getSiteId()}${config.ACCOUNT_REDIRECT.TWITTER}`,
        '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=50,left=50,width=800,height=400');
    }

    /**
     * @method createTwitterObj This method creates the twitter object with userId and access token
     * after splitting the access token to extract the user id
     */
    createTwitterObj = (res) => {
        //The first part before '-' is the userID 
        //Hence, spliting to extract it from the accesstoken 
        const splitVal = res && res.split('-') || [];
        const twitterObj = {
            accessToken: res,
            userId: splitVal[0]
        };
        return twitterObj;
    }

    /**
     * @method logout This method saves the token as "" in WCS for twitter. We do not log user out from twitter. 
     */

    logout = () => {
        const props = this.props;
        props.saveAccountInfo(props.elem.socialAccount, {
            accessToken: '',
            userId: ''
        }, true);
    }

    /**
     * @method getAccessToken This is a callback method which trigger when the child window has set the auth
     * token and verifier in parent and it triggers the click event of the hidden input once it is done. This method takes the 
     * Auth and the verifier and triggers the step three of integration.
     */

    getAccessToken = () => {
        this.twitterAbstractor.getAccessToken(this.tokenInput.value,
            this.verifierInput.value).then(res => {
                if(res) {
                    this.saveAccountInfo(this.createTwitterObj(res));
                }
        });
    }

    /**
     * @method saveAccountInfo Thsi method saves the access token of the user to the WCS.
     * @param acessToken {String} The access token which we have received from step 3 of integartion.
     */

    saveAccountInfo = acessToken => {
        const props = this.props;
        props.saveAccountInfo(props.elem.socialAccount,acessToken,false);
    }
    
    /**
    * @method handleOpenCloseTwitterOnKeyPress
    * handles the keypress with tabbing focus. 
    * triggers the edit method when enter key is pressed
    */
    handleOpenCloseTwitterOnKeyPress = () => {
    const props = this.props;
    const twitterConnection = !props.elem.isConnected ? this.openChildWindow: this.logout;
    return handleGenericKeyDown(event, config.KEY_CODES.ENTER, twitterConnection);
  }

    render () {
        const props = this.props;

        let twitterTokenVal = getLocalStorage('twitterToken');
        let twitterVerifierVal = getLocalStorage('twitterVerifer');
        if(twitterTokenVal && twitterVerifierVal) {
            this.twitterAbstractor.getAccessToken(twitterTokenVal,
                twitterVerifierVal).then(res => {
                    if(res) {
                        this.saveAccountInfo(this.createTwitterObj(res));
                    }
            });
            setLocalStorage({key: 'twitterToken', value: ''});
            setLocalStorage({key: 'twitterVerifer', value: ''});
        }
        /** If auto-open for twitter is set, the login modal will open
        /* After that, the localStorage needs to be reset to ''
        /* so that it doesn't trigger the login modal again
        **/
        if(getLocalStorage('auto-open') === config.SOCIAL_ACCOUNTS.twitter) {
            this.openChildWindow();
            setLocalStorage({key: 'auto-open', value: ''});
        }
        return (
            <React.Fragment>
                <div className='social-accounts__CTA' tabIndex="0" onClick={!props.elem.isConnected? this.openChildWindow: this.logout} onKeyDown={this.handleOpenCloseTwitterOnKeyPress}>
                    {props.children}
                </div>
                <input type='hidden' id='twitter-token' ref={this.setTokenInput}/>
                <input type='hidden' id='twitter-verifer' ref={this.setVerifierInput}/>
                <input type='hidden' onClick={this.getAccessToken} id='twitter-auth-tokens' />
            </React.Fragment>
            
        );
    }
}