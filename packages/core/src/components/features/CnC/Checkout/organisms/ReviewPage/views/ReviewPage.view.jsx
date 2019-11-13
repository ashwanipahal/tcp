import React from 'react';
import PropTypes from 'prop-types';
import { FormSection, reduxForm, change } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import CheckoutFooter from '../../../molecules/CheckoutFooter';
import styles from '../styles/ReviewPage.style';
import { CHECKOUT_ROUTES } from '../../../Checkout.constants';
import utility, { scrollToFirstError } from '../../../util/utility';
import { Anchor } from '../../../../../../common/atoms';
import PickUpReviewSectionContainer from '../organisms/PickUpReviewSection';
import ShippingReviewSection from '../organisms/ShippingReviewSection';
import BillingSection from '../organisms/BillingSection';
import CheckoutCartItemList from '../organisms/CheckoutCartItemList';
import CheckoutOrderInfo from '../../../molecules/CheckoutOrderInfoMobile';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import ContactFormFields from '../../../molecules/ContactFormFields';

const formName = 'expressReviewPage';

class ReviewPage extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    labels: PropTypes.shape({}).isRequired,
    reviewDidMount: PropTypes.func.isRequired,
    reviewFormSubmit: PropTypes.func.isRequired,
    orderHasShipping: PropTypes.bool.isRequired,
    isRegisteredUserCallDone: PropTypes.bool.isRequired,
    orderHasPickUp: PropTypes.bool.isRequired,
    setVenmoShippingState: PropTypes.func,
    setVenmoPickupState: PropTypes.func,
    showAccordian: PropTypes.bool,
    isGuest: PropTypes.bool.isRequired,
    checkoutRoutingDone: PropTypes.bool.isRequired,
    isExpressCheckout: PropTypes.bool,
    shipmentMethods: PropTypes.shape({}).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pickUpContactPerson: PropTypes.shape({}).isRequired,
    pickUpContactAlternate: PropTypes.shape({}).isRequired,
    ServerErrors: PropTypes.node.isRequired,
    isPaymentDisabled: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    pageCategory: PropTypes.string,
    checkoutServerError: PropTypes.shape({}).isRequired,
    clearCheckoutServerError: PropTypes.func.isRequired,
    bagLoading: PropTypes.bool,
  };

  static defaultProps = {
    setVenmoShippingState: () => {},
    setVenmoPickupState: () => {},
    showAccordian: true,
    isExpressCheckout: false,
    isPaymentDisabled: false,
    pageCategory: '',
    bagLoading: false,
  };

  componentDidMount() {
    const { setVenmoShippingState, setVenmoPickupState, reviewDidMount } = this.props;
    setVenmoShippingState(true);
    setVenmoPickupState(true);
    reviewDidMount();
  }

  componentDidUpdate(prevProps) {
    const {
      isPaymentDisabled: prevPaymentDisabled,
      isRegisteredUserCallDone: prevIsRegisteredUserCallDone,
    } = prevProps;
    const { isPaymentDisabled, dispatch, reviewDidMount, isRegisteredUserCallDone } = this.props;
    if (prevIsRegisteredUserCallDone !== isRegisteredUserCallDone && isRegisteredUserCallDone) {
      reviewDidMount();
    }
    if (prevPaymentDisabled !== isPaymentDisabled) {
      dispatch(change(formName, 'cvvCode', null));
    }
  }

  componentWillUnmount() {
    const { clearCheckoutServerError, checkoutServerError } = this.props;

    if (checkoutServerError) {
      clearCheckoutServerError({});
    }
  }

  handleDefaultLinkClick = e => {
    e.preventDefault();
  };

  render() {
    const {
      className,
      labels,
      orderHasPickUp,
      orderHasShipping,
      isGuest,
      showAccordian,
      isExpressCheckout,
      shipmentMethods,
      handleSubmit,
      ServerErrors,
      pageCategory,
      reviewFormSubmit,
      checkoutRoutingDone,
      bagLoading,
    } = this.props;
    const {
      header,
      backLinkBilling,
      nextSubmitText,
      applyConditionPreText,
      applyConditionTermsText,
      applyConditionAndText,
      applyConditionPolicyText,
      ariaLabelBackLink,
      ariaLabelSubmitOrderButton,
    } = labels;

    const expressReviewShippingSection = 'expressReviewShippingSection';
    if (!checkoutRoutingDone) {
      return <div>Loading....</div>;
    }
    return (
      <form name={formName} className={className} onSubmit={handleSubmit(reviewFormSubmit)}>
        <CheckoutSectionTitleDisplay title={header} dataLocator="review-title" />
        {ServerErrors && <ServerErrors />}
        {!!orderHasPickUp && (
          <div className="review-pickup">
            <PickUpReviewSectionContainer
              isExpressCheckout={isExpressCheckout}
              onEdit={() => {
                utility.routeToPage(CHECKOUT_ROUTES.pickupPage);
              }}
              bagLoading={bagLoading}
            />
          </div>
        )}
        <FormSection name={expressReviewShippingSection}>
          {!!orderHasShipping && (
            <div className="review-shipping">
              <ShippingReviewSection
                isExpressCheckout={isExpressCheckout}
                shipmentMethods={shipmentMethods}
                formName={formName}
                formSection={expressReviewShippingSection}
                onEdit={() => {
                  utility.routeToPage(CHECKOUT_ROUTES.shippingPage);
                }}
                bagLoading={bagLoading}
              />
            </div>
          )}
        </FormSection>
        <BillingSection isExpressCheckout={isExpressCheckout} bagLoading={bagLoading} />
        <CheckoutCartItemList disableProductRedirect bagLoading={bagLoading} />
        <CheckoutOrderInfo
          showAccordian={showAccordian}
          isGuest={isGuest}
          fullPageInfo
          pageCategory={pageCategory}
        />
        <CheckoutFooter
          hideBackLink
          ariaLabelBackLink={ariaLabelBackLink}
          ariaLabelNextButton={ariaLabelSubmitOrderButton}
          backLinkHandler={() => utility.routeToPage(CHECKOUT_ROUTES.billingPage)}
          nextButtonText={nextSubmitText}
          backLinkText={backLinkBilling}
          footerBody={[
            applyConditionPreText,
            <Anchor
              underline
              to="/#"
              dataLocator="termAndConditionText"
              onClick={this.handleDefaultLinkClick}
            >
              {applyConditionTermsText}
            </Anchor>,
            applyConditionAndText,
            <Anchor
              underline
              to="/#"
              dataLocator="PrivacyText"
              onClick={this.handleDefaultLinkClick}
            >
              {applyConditionPolicyText}
            </Anchor>,
          ]}
        />
      </form>
    );
  }
}

const validateMethod = createValidateMethod({
  pickUpAlternateExpress: ContactFormFields.ContactValidationConfig,
  ...getStandardConfig(['cvvCode']),
});

export default reduxForm({
  form: formName, // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
  onSubmitFail: errors => scrollToFirstError(errors),
})(withStyles(ReviewPage, styles));
export { ReviewPage as ReviewPageVanilla };
