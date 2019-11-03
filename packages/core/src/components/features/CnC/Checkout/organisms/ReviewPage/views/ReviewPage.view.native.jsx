import React from 'react';
import { ScrollView } from 'react-native';
import { reduxForm, change } from 'redux-form';
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
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isPaymentDisabled: false,
    isExpressCheckout: false,
  };

  componentDidMount() {
    const { reviewDidMount } = this.props;
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
              />
            )}
            {!!orderHasShipping && (
              <ShippingReviewSection
                onEdit={() => {
                  setCheckoutStage(CONSTANTS.SHIPPING_DEFAULT_PARAM);
                }}
              />
            )}

            <BillingSection
              onEdit={() => {
                setCheckoutStage(CONSTANTS.BILLING_DEFAULT_PARAM);
              }}
              isExpressCheckout={isExpressCheckout}
            />
          </Container>
          <CheckoutCartItemList />
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
  ...getStandardConfig(['cvvCode']),
});

export default reduxForm({
  form: formName, // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(ReviewPage);

export { ReviewPage as ReviewPageVanilla };
