import CHECKOUT_STAGES from '../../../../../../../web/src/pages/App.constants';

/**
 * This method returns the current checkout section
 */
export const getCurrentSection = props => {
  const { router } = props;
  const section = router.query.section || router.query.subSection;
  return section || CHECKOUT_STAGES.SHIPPING;
};

export const updateAnalyticsData = (props, prevProps) => {
  const { updateCheckoutPageData, router } = props;
  const currentSection = router.query.section || router.query.subSection;
  const { router: prevRouter } = prevProps;
  const prevCurrentSection = prevRouter.query.section || prevRouter.query.subSection;

  if (currentSection !== prevCurrentSection) {
    const pageData = {
      pageName: `checkout:${currentSection}`,
      pageSection: 'checkout',
      pageType: 'checkout',
      pageShortName: `checkout:${currentSection}`,
      loadAnalyticsOnload: false,
    };
    updateCheckoutPageData(pageData);
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
