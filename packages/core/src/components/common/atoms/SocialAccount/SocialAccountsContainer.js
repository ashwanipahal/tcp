/** @module SocialAccountContainer
 *  @summary defaultStore value is
 * fetched from reduxStore/storeViews/storesStoreView and passed to Social Accounts Component
 *  @author Prabhjot Singh
 */
import { connectPlusStoreOperators } from 'reduxStore/util/connectPlusStoreOperators';
import { getUserOperator } from 'reduxStore/storeOperators/userOperator';
import { SocialAccounts } from './SocialAccounts';

import {getprefFormOperator}
from 'reduxStore/storeOperators/formOperators/myPrefOperator.js';

function mapStateToProps (state, ownProps, preOperator) {
  return {
    getSocialAccounts: preOperator.prefFormOperator.fetchSocialAccountsInfo,
    saveSocialAccounts: preOperator.prefFormOperator.saveSocialAccountsInfo,
    socialAccounts: preOperator.prefFormOperator.getSocialAccountsInformation(state),
    getUpdatedRewardPoint: preOperator.userOperator.getUserInfo,
  };
}

const SocialAccountsContainer = connectPlusStoreOperators({
  prefFormOperator: getprefFormOperator,
  userOperator: getUserOperator,
}, mapStateToProps)(SocialAccounts);

export { SocialAccountsContainer };
