import endpoints from '../../../common/externalEndpoints';
import internalEndpoints from '../../../common/internalEndpoints';
/**
 * @function ctaRedirect  to get the route to CTA url based on activityModalAction
 * @param    {Object} activeActivity The activity details of waysToEarn
 * @returns  {Object} cta to and cta path for anchor
 */
const ctaRedirect = activeActivity => {
  switch (activeActivity.activityModalAction) {
    case 'rewardPlaceApp':
      return { to: endpoints.appDownloadPage, path: endpoints.appDownloadPage };
    case 'userAboutYourselfSurvey':
      return {
        to: `${internalEndpoints.profilePage.link}&survey=true`,
        path: `${internalEndpoints.profilePage.path}/?survey=true`,
      };
    case 'userFavoriteStore':
      return { to: internalEndpoints.profilePage.link, path: internalEndpoints.profilePage.path };
    case 'userMailing':
      return {
        to: internalEndpoints.mailingAddressPage.link,
        path: internalEndpoints.mailingAddressPage.path,
      };
    case 'myPreference':
      return {
        to: `${internalEndpoints.myPreferencesPage.link}&socialAccount=${
          activeActivity.activityModalSocialAccount
        }`,
        path: `${internalEndpoints.myPreferencesPage.path}/socialAccount=${
          activeActivity.activityModalSocialAccount
        }`,
      };
    case 'birthdaySavings':
      return {
        to: internalEndpoints.birthdaySavingsPage.link,
        path: internalEndpoints.birthdaySavingsPage.path,
      };
    case 'userBirthday':
      return {
        to: internalEndpoints.editProfileInformationPage.link,
        path: internalEndpoints.editProfileInformationPage.path,
      };
    case 'orders':
      return { to: internalEndpoints.myOrderPage.link, path: internalEndpoints.myOrderPage.path };
    default:
      return { to: internalEndpoints.profilePage.link, path: internalEndpoints.profilePage.path };
  }
};

export default ctaRedirect;
