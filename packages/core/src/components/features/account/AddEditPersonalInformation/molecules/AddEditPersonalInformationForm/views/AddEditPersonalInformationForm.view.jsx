import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Anchor from '../../../../../../common/atoms/Anchor/views/Anchor';
import Button from '../../../../../../common/atoms/Button';
import TextBox from '../../../../../../common/atoms/TextBox';
import SelectBox from '../../../../../../common/atoms/Select';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import withStyles from '../../../../../../common/hoc/withStyles';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import styles from '../styles/AddEditPersonalInformationForm.style';

export const AddEditPersonalInformationForm = ({
  className,
  labels,
  pristine,
  errorMessage,
  handleSubmit,
}) => {
  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      {errorMessage && (
        <Notification
          className="elem-mt-MED"
          status="error"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={labels[`lbl_changePassword_${errorMessage}`]}
        />
      )}
      <Row fullBleed>
        <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
          <Field
            placeholder="firstName"
            name="firstName"
            id="firstName"
            type="text"
            component={TextBox}
            dataLocator="addnewaddress-firstname"
          />
        </Col>
        <Col colSize={{ small: 6, medium: 4, large: 6 }}>
          <Field
            placeholder="firstName"
            name="lastName"
            id="lastName"
            component={TextBox}
            dataLocator="addnewaddress-lastname"
          />
        </Col>
      </Row>
      <Row fullBleed>
        <Col colSize={{ small: 3, medium: 2, large: 3 }}>
          <Field
            id="state"
            placeholder="state"
            // placeholder={
            //   country === 'CA' ? addressFormLabels.province : addressFormLabels.stateLbl
            // }
            name="state"
            component={SelectBox}
            // options={country === 'CA' ? CAcountriesStatesTable : UScountriesStatesTable}
            dataLocator="addnewaddress-state"
          />
        </Col>
        <Col colSize={{ small: 3, medium: 2, large: 3 }}>
          <Field
            id="state"
            placeholder="state"
            // placeholder={
            //   country === 'CA' ? addressFormLabels.province : addressFormLabels.stateLbl
            // }
            name="state"
            component={SelectBox}
            // options={country === 'CA' ? CAcountriesStatesTable : UScountriesStatesTable}
            dataLocator="addnewaddress-state"
          />
        </Col>
      </Row>
      <Row fullBleed>
        <Col colSize={{ small: 6, medium: 4, large: 6 }} ignoreGutter={{ small: true }}>
          <Field
            placeholder="email"
            name="email"
            id="email"
            component={TextBox}
            dataLocator="addnewaddress-email"
          />
        </Col>
        <Col colSize={{ small: 6, medium: 4, large: 6 }}>
          <Field
            placeholder="phoneNumber"
            name="phoneNumber"
            id="phoneNumber"
            component={TextBox}
            dataLocator="addnewaddress-phnumber"
            type="tel"
          />
        </Col>
      </Row>
      <Row fullBleed className="elem-mb-XL">
        <Col
          colSize={{ small: 4, medium: 4, large: 6 }}
          offsetLeft={{ small: 1 }}
          className="dropdown-text"
        >
          <Field
            name="primary"
            component={InputCheckbox}
            dataLocator="addnewaddress-setdefaddress"
            // disabled={isMakeDefaultDisabled}
            className="AddAddressForm__makeDefault"
          >
            Default Mailing addres
            {/* {addressFormLabels.setDefaultMsg} */}
          </Field>
        </Col>
      </Row>
      <Row fullBleed>
        <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
          <Field
            placeholder="Associate ID"
            name="associateId"
            id="associateId"
            type="text"
            component={TextBox}
            dataLocator="addnewaddress-associateId"
          />
        </Col>
      </Row>
      <BodyCopy component="div" textAlign="center" className="elem-mb-LRG elem-mt-LRG">
        <Row>
          <Col
            className="ChangePasswordForm_cancel"
            colSize={{
              large: 3,
              medium: 2,
              small: 6,
            }}
            offsetLeft={{
              large: 3,
              medium: 1,
            }}
          >
            <Anchor to="/account?id=profile" asPath="/account/profile">
              <Button
                type="button"
                buttonVariation="fixed-width"
                dataLocator="cancelBtn"
                fullWidth
                className="elem-mb-XS"
              >
                {labels.lbl_changePassword_cancelCta}
              </Button>
            </Anchor>
          </Col>
          <Col
            className="ChangePasswordForm_save"
            colSize={{
              large: 3,
              medium: 2,
              small: 6,
            }}
          >
            <Button
              fill="BLUE"
              type="submit"
              buttonVariation="fixed-width"
              dataLocator="SaveBtn"
              fullWidth
              className="elem-mb-XS"
              disabled={pristine}
            >
              {labels.lbl_changePassword_saveCta}
            </Button>
          </Col>
        </Row>
      </BodyCopy>
    </form>
  );
};

AddEditPersonalInformationForm.propTypes = {
  labels: PropTypes.shape({
    lbl_changePassword_current_password: PropTypes.string,
    lbl_changePassword_new_password: PropTypes.string,
    lbl_changePassword_confirm_password: PropTypes.string,
    lbl_changePassword_cancelCta: PropTypes.string,
    lbl_changePassword_saveCta: PropTypes.string,
  }),
  pristine: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

AddEditPersonalInformationForm.defaultProps = {
  className: '',
  labels: {
    lbl_changePassword_current_password: '',
    lbl_changePassword_new_password: '',
    lbl_changePassword_confirm_password: '',
    lbl_changePassword_cancelCta: '',
    lbl_changePassword_saveCta: '',
  },
};

const validateMethod = createValidateMethod(
  getStandardConfig(['currentPassword', 'password', 'confirmPassword'])
);

export default reduxForm({
  form: 'ChangePasswordForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(AddEditPersonalInformationForm, styles));
