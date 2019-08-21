import React from 'react';
import PropTypes from 'prop-types';
import CnCTemplate from '../../common/organism/CnCTemplate';
import ShippingForm from '../organisms/ShippingForm';

export default class ShippingPage extends React.PureComponent {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    isOrderUpdateChecked: PropTypes.bool,
    shippingLabels: PropTypes.shape({}).isRequired,
    smsSignUpLabels: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    isOrderUpdateChecked: false,
  };

  renderLeftSection = () => {
    const { addressLabels, isOrderUpdateChecked, shippingLabels, smsSignUpLabels } = this.props;
    return (
      <ShippingForm
        addressLabels={addressLabels}
        isOrderUpdateChecked={isOrderUpdateChecked}
        shippingLabels={shippingLabels}
        smsSignUpLabels={smsSignUpLabels}
      />
    );
  };

  render() {
    return (
      <CnCTemplate
        header={() => {
          return null;
        }}
        leftSection={this.renderLeftSection}
      />
    );
  }
}
