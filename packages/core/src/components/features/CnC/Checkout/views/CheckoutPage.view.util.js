import CHECKOUT_STAGES from '../../../../../../../web/src/pages/App.constants';
import CONSTANTS from '../Checkout.constants';

/**
 * This method returns the current checkout section
 */
export const getCurrentSection = props => {
  const { router } = props;
  const section = router.query.section || router.query.subSection;
  return section || CHECKOUT_STAGES.SHIPPING;
};

export const updateAnalyticsData = (props, prevProps) => {
  const { updateCheckoutPageData, router, pageData } = props;
  const currentSection = router.query.section || router.query.subSection;
  const { router: prevRouter } = prevProps;
  const prevCurrentSection = prevRouter.query.section || prevRouter.query.subSection;
  const { pageName } = pageData;
  if (typeof pageName === 'undefined' || currentSection !== prevCurrentSection) {
    const checkoutName = CONSTANTS.CHECKOUT;
    const pageDataUpdated = {
      pageName: `${checkoutName}:${currentSection}`,
      pageSection: checkoutName,
      pageType: checkoutName,
      pageShortName: `${checkoutName}:${currentSection}`,
      loadAnalyticsOnload: false,
    };
    updateCheckoutPageData(pageDataUpdated);
  }
};

export const getFormLoad = (pickupInitialValues, isGuest) => {
  return !!(
    isGuest ||
    (pickupInitialValues &&
      pickupInitialValues.pickUpContact &&
      pickupInitialValues.pickUpContact.firstName)
  );
};
