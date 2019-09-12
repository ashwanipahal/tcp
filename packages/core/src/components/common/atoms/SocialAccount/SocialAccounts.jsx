/**
 * @module SocialAccounts - 
 * @description Social Account module renders the views of 
 * social accounts connected or not connected to the profile 
 * This component does the API call after monuting for the 
 * information about the accounts connectivity
 * @author Prabhjot Singh
 */
/*eslint-disable */
import React from 'react';
import {PropTypes} from 'prop-types';
import {config} from 'util/config/config.js';
import {SocialAccountsEditView} from './SocialAccountsEditView';
import {SocialAccountsReadView} from './SocialAccountsReadView';
import {ModalHeaderDisplayContainer} from
  'views/components/modal/ModalHeaderDisplayContainer.jsx';
import {Modal} from 'views/components/modal/Modal.jsx';
import {FeedbackModalComponent} from 'views/components/socialAccounts/FeedbackModal.jsx';
import { isMobileAppIABPage, scrollToClassInQueryString, removeBrierleyUserPointsFromCache } from 'util/utility';

// eslint-disable-next-line
if (DESKTOP) {
  require('./_d.social-accounts.scss');
} else { /* istanbul ignore next */
  require('./_m.social-accounts.scss');
}

/**
 * @class SocialAccounts 
 * @description this class renders the social accounts infor
 * @param {string} view - The view param is responsible for the
 * rendering the respective view of social accounts
 */

export class SocialAccounts extends React.PureComponent {
  static propTypes = {
    getSocialAccounts: PropTypes.func,
    saveSocialAccounts: PropTypes.func,
    socialAccounts: PropTypes.shape({
      socialAccount: PropTypes.string,
      isConnected: PropTypes.bool,
      hasUserId: PropTypes.bool,
    }),
    view: PropTypes.string,
    getUpdatedRewardPoint: PropTypes.func,
  }

  constructor () {
    super();
    this.socialAccounts = [];
    this.state = {
      isModalOpen: false,
      currSocialAcc: '',
      points: ''
    };
  }

  componentDidMount () {
    this.props.getSocialAccounts();
    //Scroll to the first element with the class name
    //in the query string with param 'scrollTo'
    scrollToClassInQueryString();
  }

/**
 * @method saveAccountToken 
 * @description this method is responsible for AJAX call for sending token
 * of the respective social account connected. 
 * @param {string} accountName this param is the social account name 
 * @param {string} token this param is the token received from the respective 
 * social account when the use logins 
 */
  saveAccountInfo = (accountName, token, disconnecting) => {
    this.props.saveSocialAccounts(accountName, token).then(res => {
      //Extracting the points that are fetched from bariely
      let temp = res.pointsAwarded;
      let points = temp && temp.points;
      //Since generic message for points is to be displayed in case of error
      //Only in case of 0 the modal is not to be shown
      //Hence, 0 or valid points values should be stored as it is
      if(points !== 0 && !points) {
        points = '';
      }
      /**
       * If the user is connecting to social accounts then he will get point.
       *  Calling get registered user info get get the updated Loyalty points.
       */
      if (!disconnecting && points) {
        /**
         * Bursting the cache of user points.
         */
        removeBrierleyUserPointsFromCache();
        /**
         * We need to burst the cache of user points when the user is connecting to the social account. The cache will
         * be bursted only if the user is getting the points to connect. Sending the param as true in getUpdatedRewardPoint
         * function will burst the cache.
         */
        this.props.getUpdatedRewardPoint(true);
      }
      this.setState({
          isModalOpen: !disconnecting,//The dailouge should appear only when the user connects to the social account. Not while disconnecting.
          currSocialAcc: accountName,
          points: points
      });
    })
  }

/**
* @method refactorSocialDetails - this methods refactors and creates 
* a new array with the required information to render the view of 
* Social accounts
* @param {object} accounts param contains the information of social 
* accounts with connected or disconnected boolean value
*/

/**
 * Refactored object keys:
 * @property {string} accountIcon - account icon name is dependent on the connectivity
 * of the social accounts. connect and disconnected will be enabled and 
 * disabled respectively. 
 * @property {string} CTAIcon icon name represents the action to be triggered
 * connected and disconnected accounts will receive CTA as cross-icon and 
 * plus-icon respectively
 * @property {string} CTALabel this label is for the aria-label attribute of 
 * the button, for accessebility.
 * @property {string} infoText the property is the information text displayed 
 * for the social accounts connectivity state  
 */
  refactorSocialDetails = (accounts) => {
    const accountsInfo = [];
    for (const prop in accounts) {
/**
 * if condition @description -
 * In edit view its needed to render every social account no matter
 * if its connected or not. 
 * In read view its needed to render only the connected accounts
 * So, the conditions are in a way that it creates array different for read
 * and edit view  
 */
      if (accounts.hasOwnProperty(prop) &&
          config.SOCIAL_ACCOUNTS[prop] &&
          !(this.props.view === config.VIEW_MODE.read && !accounts[prop].accessToken)) {
        accountsInfo.push({
          socialAccount: config.SOCIAL_ACCOUNTS[prop],
          isConnected: accounts[prop].accessToken,
          hasUserId: accounts[prop].userId
        });
      }
    }
    this.socialAccounts = accountsInfo;
  }
  /**
   * @method toggelModalState This function toggles the state of the modal.
   */
  toggelModalState = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render () {
    const {
        view,
        socialAccounts
    } = this.props;
    const triggerClass = isMobileAppIABPage() ? 'in-app' : '';

    if(Object.keys(socialAccounts).length) {
      this.refactorSocialDetails(socialAccounts);
    }
    return (
        <React.Fragment>
            {view === config.VIEW_MODE.edit &&
            <SocialAccountsEditView
                accounts={this.socialAccounts}
                saveAccountInfo={this.saveAccountInfo}
            />}
            {view === config.VIEW_MODE.read &&
            <SocialAccountsReadView
                accounts={this.socialAccounts}
            />}
            {/** The backend will return 0 points in case the user has already earned points for this activity*/}
            {this.state.isModalOpen && this.state.points !== 0 && (
              <Modal className="overlay-container"
              isOpen
              overlayClassName={`react-overlay overlay-center overlay-coupon-detail feedback-modal ${triggerClass}`}
              >
                  <ModalHeaderDisplayContainer
                    onCloseClick={this.toggelModalState}
                    title="Congratulations!"
                  />
                  <FeedbackModalComponent currSocialAcc={this.state.currSocialAcc}
                  points={this.state.points} 
                  closeModal={this.toggelModalState}/>
              </Modal>
            )}
        </React.Fragment>
    );
  }
}
