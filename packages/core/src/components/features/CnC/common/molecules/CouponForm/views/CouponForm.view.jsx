import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Button, TextBox, BodyCopy, Heading } from '@tcp/core/src/components/common/atoms';
import style from '../styles/CouponForm.style';
import ErrorMessage from '../../ErrorMessage';

class CouponForm extends React.PureComponent {
  onSignUpInputKeyPress = e => {
    const { handleSubmit } = this.props;
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      return handleSubmit();
    }
    return false;
  };

  render() {
    const {
      labels,
      pristine,
      submitting,
      dataLocators,
      fieldName,
      className,
      handleSubmit,
      error,
    } = this.props;

    return (
      <>
        <ErrorMessage error={error && error.msg} />
        <div className={className}>
          <Heading
            fontFamily="primaryFontFamily"
            variant="h6"
            className="coupon_form_heading"
            color="black"
          >
            Coupon Code
            <BodyCopy
              fontSize="fs12"
              fontFamily="secondary"
              className="coupon_need_help_link"
              component="span"
              fontWeight="semibold"
            >
              Need Help?
            </BodyCopy>
          </Heading>
          <form onSubmit={handleSubmit} className="coupon_submit_form">
            <Field
              placeholder={labels.placeholderText}
              name={fieldName}
              id={fieldName}
              type="text"
              component={TextBox}
              onKeyPress={this.onSignUpInputKeyPress}
              dataLocator={dataLocators.inputField}
              className="coupon_code_input"
            />
            <Button
              disabled={pristine || submitting}
              buttonVariation="fixed-width"
              type="submit"
              data-locator={dataLocators.submitButton}
              className="coupon_submit_button"
            >
              {labels.submitButtonLabel}
            </Button>
          </form>
        </div>
      </>
    );
  }
}

CouponForm.propTypes = {
  labels: PropTypes.shape({
    placeholderText: PropTypes.string,
    validationErrorLabel: PropTypes.string,
    termsTextLabel: PropTypes.string,
    submitButtonLabel: PropTypes.string,
  }),
  dataLocators: PropTypes.shape({
    submitButton: PropTypes.string,
    inputField: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string.isRequired,
  pristine: false,
  submitting: false,
  error: PropTypes.string,
};

CouponForm.defaultProps = {
  labels: {
    placeholderText: 'Enter Coupon Code',
    submitButtonLabel: 'Apply',
  },
  dataLocators: {
    submitButton: 'coupon_submit_btn',
    inputField: 'coupon_code',
  },
  pristine: false,
  submitting: false,
  error: '',
  fieldName: 'coupon_code',
  handleSubmit: () => {},
};

export default reduxForm({
  form: 'CouponForm',
})(withStyles(CouponForm, style));

export { CouponForm };
