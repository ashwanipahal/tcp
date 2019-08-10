import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Button, TextBox, BodyCopy, Heading } from '@tcp/core/src/components/common/atoms';
import style from '../styles/CouponForm.style';
import ErrorMessage from '../../ErrorMessage';

class CouponForm extends React.PureComponent {
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
      <div className={className}>
        <ErrorMessage error={error && error.msg} />
        <div className="coupon_form_container">
          <Heading
            fontFamily="primaryFontFamily"
            variant="h6"
            className="coupon_form_heading"
            color="black"
          >
            {labels.couponCodeHeader}
            <BodyCopy
              fontSize="fs12"
              fontFamily="secondary"
              className="coupon_need_help_link"
              component="span"
              fontWeight="semibold"
            >
              {labels.couponNeedHelpText}
            </BodyCopy>
          </Heading>
          <form onSubmit={handleSubmit} className="coupon_submit_form">
            <Field
              placeholder={labels.placeholderText}
              name={fieldName}
              id={fieldName}
              type="text"
              component={TextBox}
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
      </div>
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
    couponCodeHeader: 'Coupon Code',
    couponNeedHelpText: 'Need Help?',
  },
  dataLocators: {
    submitButton: 'coupon_submit_btn',
    inputField: 'coupon_code',
  },
  pristine: false,
  submitting: false,
  error: '',
  fieldName: 'couponCode',
  handleSubmit: () => {},
};

export default reduxForm({
  form: 'CouponForm',
})(withStyles(CouponForm, style));

export { CouponForm };
