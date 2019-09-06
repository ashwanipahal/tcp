import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import createValidateMethod from '../../../../../../../../../utils/formValidation/createValidateMethod';
import styles from '../styles/BillingPaymentForm.style';
import AddressFields from '../../../../../../../../common/molecules/AddressFields';
import PaymentMethods from '../../../../../../common/molecules/PaymentMethods';
import AddressDropdown from '../../../../../../../account/AddEditCreditCard/molecule/AddressDropdown';
import Address from '../../../../../../../../common/molecules/Address';
import Row from '../../../../../../../../common/atoms/Row';
import Col from '../../../../../../../../common/atoms/Col';
import Button from '../../../../../../../../common/atoms/Button';

const formName = 'checkoutBilling';
export class BillingPaymentForm extends React.PureComponent {
  getAddressOptions = () => {
    const { cardsList } = this.props;
    const lbltitle = 'a';
    let addressOptions = cardsList.map(address => ({
      value: address.addressId,
      title: `${address.firstName} ${address.lastName} ${
        address.primary === 'true' ? '(Default)' : ''
      }`,
      content: (
        <Address
          address={address}
          showCountry={false}
          showPhone={false}
          isDefault={address.primary === 'true'}
        />
      ),
    }));

    addressOptions = addressOptions.push({
      value: '',
      title: lbltitle,
      content: (
        <Button fullWidth buttonVariation="variable-width" fill="BLUE">
          {lbltitle}
        </Button>
      ),
    });

    return addressOptions;
  };

  render() {
    const { className, handleSubmit } = this.props;

    return (
      <>
        <BodyCopy
          fontFamily="primary"
          fontSize="fs28"
          fontWeight="regular"
          data-locator="billing-details"
          className="elem-mb-XS elem-mt-MED"
        >
          {'Payment Method'}
        </BodyCopy>
        <PaymentMethods />

        <Row fullBleed className="elem-mb-XL">
          <Col
            colSize={{
              large: 6,
              small: 6,
              medium: 4,
            }}
            className="creditCardForm__addressBook"
          >
            <Field
              selectListTitle="Select from card on file"
              name="onFileAddressKey"
              id="onFileAddressKey"
              component={AddressDropdown}
              dataLocator="payment-billingaddressdd"
              options={this.getAddressOptions()}
            />
          </Col>
        </Row>
        <form name={formName} className={className} onSubmit={handleSubmit} />
      </>
    );
  }
}

BillingPaymentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  cardsList: PropTypes.shape({}).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

BillingPaymentForm.defaultProps = {
  className: '',
};

const validateMethod = createValidateMethod({
  card: AddressFields.addressValidationConfig,
});

export default reduxForm({
  form: formName, // a unique identifier for this form
  ...validateMethod,
  destroyOnUnmount: false,
})(withStyles(BillingPaymentForm, styles));
