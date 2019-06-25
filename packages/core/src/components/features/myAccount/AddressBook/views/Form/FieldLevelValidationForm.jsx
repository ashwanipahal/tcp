// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextBox from '../../../../../common/atoms/TextBox';
import Row from '../../../../../common/atoms/Row';
import Col from '../../../../../common/atoms/Col';
import Button from '../../../../../common/atoms/Button';
import { required, maxLength15 } from '../../../../../common/hoc/formsValidation/FormValidation';

type Props = {
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting?: any,
};
const AddressValidationForm = ({ handleSubmit, pristine, reset, submitting }: Props): Node => (
  // const { handleSubmit, pristine, reset, submitting } = props;
  <form onSubmit={handleSubmit}>
    <Row>
      <Col colSize={{ small: 1, medium: 1, large: 6 }}>
        <Field
          placeholder="First Name"
          name="First-Name"
          type="text"
          component={TextBox}
          label="First-Nam"
          validate={[required, maxLength15]}
        />
        {/* <Field floatingLabel="float" label="Username" ype="text" placeholder="First Name" component={TextBox} validate={[ required, maxLength15 ]} /> */}
      </Col>
      <Col colSize={{ small: 1, medium: 1, large: 6 }}>
        <Field
          placeholder="Last Name"
          name="Last-Name"
          component={TextBox}
          validate={[required, maxLength15]}
        />
      </Col>
    </Row>
    <br />
    <Row>
      <Col colSize={{ small: 1, medium: 1, large: 6 }}>
        <Field
          placeholder="Address Line 1"
          component={TextBox}
          name="address-1"
          validate={[required]}
        />
      </Col>
      <Col colSize={{ small: 1, medium: 1, large: 6 }}>
        <Field
          placeholder="Address Line 2( Optional )"
          name="address-2"
          component={TextBox}
          validate={[required]}
        />
      </Col>
    </Row>
    <br />
    <Row>
      <Col colSize={{ small: 1, medium: 1, large: 6 }}>
        <Field placeholder="City" name="city" component={TextBox} validate={[required]} />
      </Col>
      <Col colSize={{ small: 1, medium: 1, large: 3 }}>
        <select>
          <option value="" disabled>
            dfdfdf fdfs fdsfs
          </option>
        </select>
      </Col>
      <Col colSize={{ small: 1, medium: 1, large: 3 }}>
        <Field placeholder="Zip" name="zip" component={TextBox} validate={[required]} />
      </Col>
    </Row>
    <br />
    <Row>
      <Col colSize={{ small: 1, medium: 1, large: 6 }}>
        <select>
          <option value="">dfdfdf fdfs fdsfs</option>
        </select>
      </Col>
      <Col colSize={{ small: 1, medium: 1, large: 6 }}>
        <Field
          placeholder="phone number"
          name="phone-number"
          component={TextBox}
          validate={[required]}
        />
      </Col>
    </Row>
    <br />
    <Row>
      <Col colSize={{ small: 1, medium: 1, large: 12 }}>
        <Field name="employed" id="employed" component={TextBox} type="checkbox" />
        Set as default shipping addres
      </Col>
    </Row>
    <br />
    <Row>
      <Col colSize={{ small: 1, medium: 1, large: 3 }}>
        <Button
          buttonVariation="fixed-width"
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Cancel
        </Button>
      </Col>
      <Col colSize={{ small: 1, medium: 1, large: 3 }}>
        <Button text="BLUE" disabled={submitting} buttonVariation="fixed-width">
          Add Address
        </Button>
      </Col>
    </Row>
  </form>
);
AddressValidationForm.defaultProps = {
  submitting: true,
};

export default reduxForm({
  form: 'AddressValidationForm', // a unique identifier for this form
})(AddressValidationForm);
