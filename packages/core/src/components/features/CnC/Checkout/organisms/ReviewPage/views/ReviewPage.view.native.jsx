import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import style from '../styles/ReviewPage.style.native';
import CONSTANTS from '../../../Checkout.constants';
import { BodyCopy } from '../../../../../../common/atoms';

const { Container, TextSection, FooterTextContainer, FooterLink } = style;

class ReviewPage extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    orderHasShipping: PropTypes.bool.isRequired,
    orderHasPickUp: PropTypes.bool.isRequired,
    availableStages: PropTypes.func.isRequired,
    submitReview: PropTypes.func.isRequired,
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
    } = this.props;

    const {
      header,
      backLinkBilling,
      nextSubmitText,
      pickupSectionTitle,
      shippingSectionTitle,
      billingSectionTitle,
    } = labels;

    return (
      <>
        <CheckoutProgressIndicator
          activeStage="billing"
          navigation={navigation}
          availableStages={availableStages}
        />
        <ScrollView>
          <Container>
            <CheckoutSectionTitleDisplay title={header} />
            {!!orderHasPickUp && <TextSection>{pickupSectionTitle}</TextSection>}
            {!!orderHasShipping && <TextSection>{shippingSectionTitle}</TextSection>}
            <TextSection>{billingSectionTitle}</TextSection>
          </Container>
          <CnCTemplate
            navigation={navigation}
            btnText={nextSubmitText}
            routeToPage=""
            onPress={submitReview}
            backLinkText={backLinkBilling}
            onBackLinkPress={() =>
              navigation.navigate(CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_REVIEW)
            }
            footerBody={this.renderFooter()}
          />
        </ScrollView>
      </>
    );
  }
}

export default ReviewPage;

export { ReviewPage as ReviewPageVanilla };
