import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import TextBox from '../../../../../../common/atoms/TextBox';
import { Button, BodyCopy } from '../../../../../../common/atoms';
// import Modal from '../../../../../../common/molecules/Modal';
import ErrorMessage from '../../ErrorMessage';
import {
  InputField,
  Header,
  FlexRow,
  ApplyButton,
  ApplyButtonText,
  FormContainer,
  CouponFormContainer,
  NeedHelpText,
} from '../styles/CouponForm.style.native';

export class CouponForm extends React.PureComponent<Props, State> {
  renderTextBox = ({ input, ...otherParams }) => {
    // eslint-disable-next-line
    input = { ...input, value: input.value.toUpperCase() };
    return <TextBox input={input} {...otherParams} />;
  };

  render() {
    const {
      handleSubmit,
      labels,
      fieldName,
      dataLocators,
      error,
      isFetching,
      onNeedHelpTextClick,
    } = this.props;
    return (
      <CouponFormContainer>
        <ErrorMessage error={error && error.msg} />
        <FormContainer>
          <Header>
            <BodyCopy
              fontSize="fs16"
              fontFamily="secondary"
              component="span"
              fontWeight="semibold"
              text={labels.couponCodeHeader}
            />
            <BodyCopy
              onPress={onNeedHelpTextClick}
              style={NeedHelpText}
              fontSize="fs12"
              fontFamily="secondary"
              component="span"
              fontWeight="semibold"
              text={labels.couponNeedHelpText}
            />
          </Header>
          <FlexRow>
            <InputField>
              <Field
                name={fieldName}
                id={fieldName}
                label={labels.placeholderText}
                type="text"
                component={this.renderTextBox}
                dataLocator={dataLocators.inputField}
              />
            </InputField>
            <Button
              fill="WHITE"
              type="submit"
              external
              onPress={handleSubmit}
              buttonVariation="variable-width"
              customStyle={ApplyButton}
              text={labels.submitButtonLabel}
              style={ApplyButtonText}
              disabled={isFetching}
              data-locator={dataLocators.submitButton}
            />
          </FlexRow>
        </FormContainer>
      </CouponFormContainer>
    );
  }
}

CouponForm.propTypes = {
  labels: PropTypes.shape({
    placeholderText: PropTypes.string.isRequired,
    submitButtonLabel: PropTypes.string.isRequired,
    couponCodeHeader: PropTypes.string.isRequired,
    couponNeedHelpText: PropTypes.string.isRequired,
    couponHelpText: PropTypes.string.isRequired,
  }),
  dataLocators: PropTypes.shape({
    submitButton: PropTypes.string,
    inputField: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string.isRequired,
  error: PropTypes.string,
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
};

export default reduxForm({
  form: 'CouponForm', // a unique identifier for this form
})(CouponForm);

export { CouponForm as CouponFormVanilla };
