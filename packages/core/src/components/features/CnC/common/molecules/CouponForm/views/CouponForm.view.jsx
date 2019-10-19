import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Button, TextBox, BodyCopy, Heading } from '@tcp/core/src/components/common/atoms';
import { keyboard } from '../../../../../../../../../web/src/constants/constants';
import style from '../styles/CouponForm.style';
import ErrorMessage from '../../ErrorMessage';

class CouponForm extends React.PureComponent {
  state = { touched: false };

  renderTextBox = ({ input, ...otherParams }) => {
    // eslint-disable-next-line
    input = { ...input, value: input.value.toUpperCase() };
    return <TextBox input={input} {...otherParams} />;
  };

  toggleTouched = () => {
    const { touched } = this.state;
    this.setState({ touched: !touched });
  };

  handleKeyDown = (event, callback) => {
    const { KEY_ENTER, KEY_SPACE } = keyboard;
    const { which } = event;
    if (which === KEY_ENTER || which === KEY_SPACE) {
      callback();
    }
  };

  handleSubmit = e => {
    const { handleSubmit } = this.props;
    const { touched } = this.state;

    if (touched) {
      this.toggleTouched();
    }
    return handleSubmit(e);
  };

  render() {
    const {
      labels,
      dataLocators,
      fieldName,
      className,
      error,
      isFetching,
      onNeedHelpTextClick,
      idPrefix,
    } = this.props;
    const { touched } = this.state;
    return (
      <div className={className}>
        {!touched && <ErrorMessage className="coupon_error_message" error={error && error.msg} />}
        <div className="coupon_form_container">
          <Heading
            fontFamily="primaryFontFamily"
            component="h2"
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
              tabIndex="0"
              onClick={onNeedHelpTextClick}
              role="button"
              onKeyDown={e => this.handleKeyDown(e, onNeedHelpTextClick)}
            >
              {labels.couponNeedHelpText}
            </BodyCopy>
          </Heading>
          <form onSubmit={this.handleSubmit} className="coupon_submit_form">
            <Field
              placeholder={labels.placeholderText}
              name={fieldName}
              id={`${fieldName}-id-${idPrefix}`}
              type="text"
              onChange={!touched && this.toggleTouched}
              component={this.renderTextBox}
              dataLocator={dataLocators.inputField}
              className="coupon_code_input"
            />
            <Button
              disabled={isFetching}
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
  error: PropTypes.string,
  idPrefix: PropTypes.string,
  onNeedHelpTextClick: PropTypes.func,
  isFetching: PropTypes.isRequired,
};

CouponForm.defaultProps = {
  labels: {
    placeholderText: 'Enter Coupon Code',
    submitButtonLabel: 'Apply',
    couponCodeHeader: 'COUPON CODE',
    couponNeedHelpText: 'Need Help?',
  },
  dataLocators: {
    submitButton: 'coupon_submit_btn',
    inputField: 'coupon_code',
  },
  error: '',
  fieldName: 'couponCode',
  handleSubmit: () => {},
  onNeedHelpTextClick: () => {},
  idPrefix: '',
};

export const onSubmitSuccess = (result, dispatch, { reset }) => reset();

export default reduxForm({
  form: 'CouponForm',
  onSubmitSuccess,
})(withStyles(CouponForm, style));

export { CouponForm };
