import React from 'react';
import { ScrollView } from 'react-native';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';
import GiftCardsContainer from '../../GiftCardsSection';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import style from '../styles/BillingPage.style.native';

const { Container } = style;

class BillingPage extends React.PureComponent {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    shippingLabels: PropTypes.shape({}).isRequired,
    smsSignUpLabels: PropTypes.shape({}).isRequired,
    address: PropTypes.shape({}),
    emailSignUpLabels: PropTypes.shape({}).isRequired,
    navigation: PropTypes.shape({}).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitBilling: PropTypes.func.isRequired,
    availableStages: PropTypes.shape([]).isRequired,
    labels: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    address: null,
  };

  render() {
    const { navigation, availableStages, labels, handleSubmit, submitBilling } = this.props;

    const { header } = labels;

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
            <GiftCardsContainer />
          </Container>
          <CnCTemplate
            navigation={navigation}
            btnText="NEXT:REVIEW"
            routeToPage=""
            onPress={handleSubmit(submitBilling)}
          />
        </ScrollView>
      </>
    );
  }
}

export default reduxForm({
  form: 'checkoutBilling',
  destroyOnUnmount: false,
})(BillingPage);

export { BillingPage as BillingPageVanilla };
