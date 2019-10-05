import React from 'react';
import { Field, change } from 'redux-form';
import PropTypes from 'prop-types';
import PaymentMethodTypes from '../../../atoms/PaymentMethodTypes';
import { FieldWrapper, PaymentMethodsWrapper } from '../styles/PaymentMethods.style.native';

export const onPaymentMethodChange = ({ id, dispatch, formName }) => {
  dispatch(change(formName, 'paymentMethodId', id));
};

const PaymentMethods = ({ paymentMethods, selectedPaymentId, dispatch, formName }) => {
  return (
    <PaymentMethodsWrapper>
      <FieldWrapper>
        {paymentMethods &&
          paymentMethods.length > 0 &&
          paymentMethods.map((option, index) => {
            const { id, displayName } = option;
            const title = displayName;
            return (
              <>
                <Field
                  component={PaymentMethodTypes}
                  id={id}
                  selectedPaymentId={selectedPaymentId}
                  index={index}
                  name="paymentMethodId"
                  title={title}
                  onPress={() => onPaymentMethodChange({ id, dispatch, formName })}
                />
              </>
            );
          })}
      </FieldWrapper>
    </PaymentMethodsWrapper>
  );
};

PaymentMethods.propTypes = {
  paymentMethods: PropTypes.shape([]),
  selectedPaymentId: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
};
PaymentMethods.defaultProps = {
  paymentMethods: null,
  selectedPaymentId: null,
};

export default PaymentMethods;
