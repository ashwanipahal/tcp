import React from 'react';
import PropTypes from 'prop-types';
import { FormSection, reduxForm, change } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import CheckoutFooter from '../../../molecules/CheckoutFooter';
import styles from '../styles/ReviewPage.style';
import { CHECKOUT_ROUTES } from '../../../Checkout.constants';
import utility from '../../../util/utility';
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
    orderHasPickUp: PropTypes.bool.isRequired,
    setVenmoShippingState: PropTypes.func,
    setVenmoPickupState: PropTypes.func,
    showAccordian: PropTypes.bool,
    isGuest: PropTypes.bool.isRequired,
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
  };

  static defaultProps = {
    setVenmoShippingState: () => { },
    setVenmoPickupState: () => { },
    showAccordian: true,
    isExpressCheckout: false,
    isPaymentDisabled: false,
    pageCategory: '',
  };

  componentDidMount() {
    const { setVenmoShippingState, setVenmoPickupState, reviewDidMount, isRTPSDataRequired, updateRTPS, isExpressCheckout } = this.props;
    setVenmoShippingState(true);
    setVenmoPickupState(true);
    reviewDidMount();
    if (isExpressCheckout && isRTPSDataRequired) {
      // not to consume RTPS API in case of any Non-Ecom order type
      updateRTPS({ prescreen: true, isExpressCheckoutEnabled: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { isPaymentDisabled: prevPaymentDisabled } = prevProps;
    const { isPaymentDisabled, dispatch } = this.props;
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
              />
            </div>
          )}
        </FormSection>
        <BillingSection isExpressCheckout={isExpressCheckout} />
        <CheckoutCartItemList disableProductRedirect />
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
})(withStyles(ReviewPage, styles));
export { ReviewPage as ReviewPageVanilla };
