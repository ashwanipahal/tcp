import React from 'react';
import PropTypes from 'prop-types';
import CnCTemplate from '../../common/organism/CnCTemplate';
import ShippingForm from '../organisms/ShippingForm';
import { getSiteId } from '../../../../../utils/utils.web';

export default class ShippingPage extends React.PureComponent {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    isOrderUpdateChecked: PropTypes.bool,
    shippingLabels: PropTypes.shape({}).isRequired,
    smsSignUpLabels: PropTypes.shape({}).isRequired,
    addressPhoneNo: PropTypes.number,
  };

  static defaultProps = {
    isOrderUpdateChecked: false,
    addressPhoneNo: null,
  };

  renderLeftSection = () => {
    const {
      addressLabels,
      isOrderUpdateChecked,
      shippingLabels,
      smsSignUpLabels,
      addressPhoneNo,
    } = this.props;
    return (
      <ShippingForm
        addressLabels={addressLabels}
        isOrderUpdateChecked={isOrderUpdateChecked}
        shippingLabels={shippingLabels}
        smsSignUpLabels={smsSignUpLabels}
        initialValues={{ address: { country: getSiteId() && getSiteId().toUpperCase() } }}
        addressPhoneNo={addressPhoneNo}
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
