import React from 'react';
import { ScrollView } from 'react-native';
import { reduxForm, change, FormSection } from 'redux-form';
import PropTypes from 'prop-types';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import PickUpReviewSectionContainer from '../organisms/PickUpReviewSection';
import style from '../styles/ReviewPage.style.native';
import CONSTANTS from '../../../Checkout.constants';
import { BodyCopy } from '../../../../../../common/atoms';
import BillingSection from '../organisms/BillingSection';
import ShippingReviewSection from '../organisms/ShippingReviewSection';
import CheckoutCartItemList from '../organisms/CheckoutCartItemList';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import ContactFormFields from '../../../molecules/ContactFormFields';

const { Container, FooterTextContainer, FooterLink } = style;
const formName = 'expressReviewPage';

class ReviewPage extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    orderHasShipping: PropTypes.bool.isRequired,
    orderHasPickUp: PropTypes.bool.isRequired,
    availableStages: PropTypes.func.isRequired,
    reviewDidMount: PropTypes.func.isRequired,
    submitReview: PropTypes.func.isRequired,
    setCheckoutStage: PropTypes.func.isRequired,
    isPaymentDisabled: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    isExpressCheckout: PropTypes.bool,
    bagLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    shipmentMethods: PropTypes.func.isRequired,
    selectedShipmentId: PropTypes.func.isRequired,
    setVenmoShippingState: PropTypes.func,
    setVenmoPickupState: PropTypes.func,
  };

  static defaultProps = {
    setVenmoShippingState: () => {},
    setVenmoPickupState: () => {},
    isPaymentDisabled: false,
    isExpressCheckout: false,
  };

  componentDidMount() {
    const { reviewDidMount, setVenmoShippingState, setVenmoPickupState } = this.props;
    setVenmoShippingState(true);
    setVenmoPickupState(true);
    reviewDidMount();
  }

  componentDidUpdate(prevProps) {
    const { isPaymentDisabled: prevPaymentDisabled } = prevProps;
    const { isPaymentDisabled, dispatch } = this.props;
    if (prevPaymentDisabled !== isPaymentDisabled) {
      dispatch(change(formName, 'cvvCode', null));
    }
  }

  /**
   * @function reviewFormSubmit
   * @description returns form submit data
   *
   */
  reviewFormSubmit = data => {
    const { submitReview, isExpressCheckout, navigation } = this.props;
    const { cvvCode } = data;

    if (isExpressCheckout && cvvCode) {
      const formDataSubmission = {
        formData: {
          billing: {
            cvv: cvvCode,
          },
        },
        navigation,
      };
      submitReview(formDataSubmission);
    } else {
      submitReview({ navigation });
    }
  };

  renderFooter = () => {
    const {
      labels: {
        applyConditionPreText,
        applyConditionTermsText,
        applyConditionAndText,
        applyConditionPolicyText,
      },
    } = this.props;

    return (
      <FooterTextContainer>
        <BodyCopy mobilefontFamily={['secondary']} fontSize="fs12" text={applyConditionPreText} />
        <FooterLink>{applyConditionTermsText}</FooterLink>
        <BodyCopy mobilefontFamily={['secondary']} fontSize="fs12" text={applyConditionAndText} />
        <FooterLink>{applyConditionPolicyText}</FooterLink>
      </FooterTextContainer>
    );
  };

  render() {
    const {
      navigation,
      labels,
      availableStages,
      orderHasShipping,
      orderHasPickUp,
      setCheckoutStage,
      handleSubmit,
      isExpressCheckout,
      shipmentMethods,
      dispatch,
      selectedShipmentId,
      bagLoading,
    } = this.props;
    const { header, backLinkBilling, nextSubmitText } = labels;

    return (
      <>
        <CheckoutProgressIndicator
          activeStage="review"
          navigation={navigation}
          availableStages={availableStages}
          setCheckoutStage={setCheckoutStage}
        />
        <ScrollView>
          <Container>
            <CheckoutSectionTitleDisplay title={header} />
            {!!orderHasPickUp && (
              <PickUpReviewSectionContainer
                onEdit={() => {
                  setCheckoutStage(CONSTANTS.PICKUP_DEFAULT_PARAM);
                }}
                isExpressCheckout={isExpressCheckout}
                bagLoading={bagLoading}
              />
            )}

            {!!orderHasShipping && (
              <FormSection name="expressReviewShippingSection">
                <ShippingReviewSection
                  onEdit={() => {
                    setCheckoutStage(CONSTANTS.SHIPPING_DEFAULT_PARAM);
                  }}
                  isExpressCheckout={isExpressCheckout}
                  shipmentMethods={shipmentMethods}
                  dispatch={dispatch}
                  formName={formName}
                  formSection="expressReviewShippingSection"
                  selectedShipmentId={selectedShipmentId}
                  bagLoading={bagLoading}
                />
              </FormSection>
            )}

            <BillingSection
              onEdit={() => {
                setCheckoutStage(CONSTANTS.BILLING_DEFAULT_PARAM);
              }}
              isExpressCheckout={isExpressCheckout}
              bagLoading={bagLoading}
            />
          </Container>
          <CheckoutCartItemList bagLoading={bagLoading} />
          <CnCTemplate
            isReviewPage
            navigation={navigation}
            btnText={nextSubmitText}
            routeToPage=""
            onPress={handleSubmit(this.reviewFormSubmit)}
            backLinkText={backLinkBilling}
            onBackLinkPress={() => setCheckoutStage(CONSTANTS.BILLING_DEFAULT_PARAM)}
            footerBody={this.renderFooter()}
            showAccordian
            pageCategory="review"
          />
        </ScrollView>
      </>
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
})(ReviewPage);

export { ReviewPage as ReviewPageVanilla };
