import React from 'react';
import { ScrollView } from 'react-native';
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

const { Container, FooterTextContainer, FooterLink } = style;

class ReviewPage extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    orderHasShipping: PropTypes.bool.isRequired,
    orderHasPickUp: PropTypes.bool.isRequired,
    availableStages: PropTypes.func.isRequired,
    submitReview: PropTypes.func.isRequired,
    setCheckoutStage: PropTypes.func.isRequired,
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
      submitReview,
      availableStages,
      orderHasShipping,
      orderHasPickUp,
      setCheckoutStage,
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
            />
          </Container>
          <CheckoutCartItemList />
          <CnCTemplate
            navigation={navigation}
            btnText={nextSubmitText}
            routeToPage=""
            onPress={() => submitReview({ navigation })}
            backLinkText={backLinkBilling}
            onBackLinkPress={() => setCheckoutStage(CONSTANTS.BILLING_DEFAULT_PARAM)}
            footerBody={this.renderFooter()}
            showAccordian
          />
        </ScrollView>
      </>
    );
  }
}

export default ReviewPage;

export { ReviewPage as ReviewPageVanilla };
