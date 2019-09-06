import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';

export default class BillingPage extends React.PureComponent {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    shippingLabels: PropTypes.shape({}).isRequired,
    smsSignUpLabels: PropTypes.shape({}).isRequired,
    address: PropTypes.shape({}),
    emailSignUpLabels: PropTypes.shape({}).isRequired,
    navigation: PropTypes.shape({}).isRequired,
    availableStages: PropTypes.shape([]).isRequired,
    labels: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    address: null,
  };

  render() {
    const { navigation, availableStages, labels } = this.props;

    const { header } = labels;

    return (
      <>
        <CheckoutProgressIndicator
          activeStage="billing"
          navigation={navigation}
          availableStages={availableStages}
        />
        <ScrollView>
          <CheckoutSectionTitleDisplay title={header} />
        </ScrollView>
      </>
    );
  }
}
