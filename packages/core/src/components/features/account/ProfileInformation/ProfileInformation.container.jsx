import { connect } from 'react-redux';
import ProfileInformation from './ProfileInformation.view';
import {} from '../LoginPage/container/LoginPage.selectors';

const mapStateToProps = state => {
  const isCountryUs = sitesAndCountriesStoreView.isRewardsEnabled(state);
  return {
    personalInformation: userStoreView.getUserContactInfo(state),
    airMilesAccount: userStoreView.getAirmilesDetails(state).accountNumber,
    rewardsAccountNumber: isCountryUs ? rewardsStoreView.getRewardsAccountNumber(state) : null,
    defaultStore: storesStoreView.getDefaultStore(state),
    onEditDefaultStore: () =>
      window.location.assign(
        '/shop/AjaxStoreLocatorDisplayView?catalogId=10551&langId=-1&storeId=10151'
      ),
    childrenBirthdays: userStoreView.getChildren(state),
    isCanada: sitesAndCountriesStoreView.getIsCanada(state),
    isMobile: routingInfoStoreView.getIsMobile(state),
    mailingAddress: addressesStoreView.getMailingAddress(state),
    isAddressVerifyModalOpen: addressesStoreView.isVerifyAddressModalOpen(state),
    userBirthday: userStoreView.getUserBirthday(state),
    userSurvey: userStoreView.getAnswersList(state),
    profileCompletion: userStoreView.getProfileCompletion(state),
    percentageIncrement: {
      percentageMailingAddress: generalStoreView.getPercentageMailingAddress(state),
      percentageUserSurvey: generalStoreView.getPercentageUserSurvey(state),
      percentageUserBirthday: generalStoreView.getPercentageUserBirthday(state),
      percentageFavStore: generalStoreView.getPercentageFavStore(state),
    },
    isUsSite: sitesAndCountriesStoreView.isUsSite(state),
  };
};

export default connect(mapStateToProps)(ProfileInformation);
