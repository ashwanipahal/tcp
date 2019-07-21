import React from 'react';
import { reduxForm } from 'redux-form';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import AddressFields from '../../../molecule/AddressFields';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';
import styles from '../styles/AddressForm.style';

// @flow
type Props = {
  handleSubmit: () => {},
  className: string,
  isEdit?: boolean,
  pristine: any,
  backToAddressBookClick: any,
  labels: {},
};

const AddressForm = ({
  className,
  handleSubmit,
  backToAddressBookClick,
  labels,
  pristine,
  isEdit,
  ...otherProps
}: Props) => {
  return (
    <form name="AddressForm" className={className} onSubmit={handleSubmit} noValidate>
      <AddressFields formName="AddressForm" {...otherProps} />
      <Row fullBleed className="AddAddressForm__ctaContainer">
        <Col
          className="AddAddressForm__cancel"
          colSize={{ small: 4, medium: 3, large: 3 }}
          offsetLeft={{ small: 1, medium: 1, large: 6 }}
        >
          <Button
            onClick={backToAddressBookClick}
            buttonVariation="fixed-width"
            type="button"
            data-locator="addnewaddress-cancel"
          >
            {labels.acc_lbl_cancel_cta}
          </Button>
        </Col>
        <Col
          className="AddAddressForm__submit"
          colSize={{ small: 4, medium: 3, large: 3 }}
          offsetLeft={{ small: 1 }}
        >
          <Button
            fill="BLUE"
            disabled={pristine}
            type="submit"
            buttonVariation="fixed-width"
            data-locator="addnewaddress-addaddress"
          >
            {isEdit ? labels.acc_lbl_update_address_cta : labels.acc_lbl_add_address_cta}
          </Button>
        </Col>
      </Row>
    </form>
  );
};

AddressForm.defaultProps = {
  isEdit: false,
};

const validateMethod = createValidateMethod(AddressFields.addressValidationConfig);

export default reduxForm({
  form: 'AddressForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(AddressForm, styles));
