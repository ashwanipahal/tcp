import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, change } from 'redux-form';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import AddNewCCForm from '../../AddNewCCForm';
import cvvInfo from '../../../molecules/CVVInfo';
import PaymentMethods from '../../../../common/molecules/PaymentMethods';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import CONSTANTS from '../../../Checkout.constants';
import { getLabelValue } from '../../../../../../../utils';

class GuestBillingForm extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    shippingAddress: PropTypes.shape({}),
    cvvCodeRichText: PropTypes.string,
    cardType: PropTypes.string,
    syncErrorsObj: PropTypes.shape({}),
    labels: PropTypes.shape({}),
    paymentMethodId: PropTypes.string,
  };

  static defaultProps = {
    shippingAddress: null,
    cvvCodeRichText: '',
    cardType: null,
    syncErrorsObj: null,
    labels: {},
    paymentMethodId: null,
  };

  componentDidUpdate(prevProp) {
    const { cardType: prevCardType } = prevProp;
    const { cardType, dispatch } = this.props;
    /* istanbul ignore else */
    if (prevCardType !== cardType) {
      dispatch(change('checkoutBilling', 'cardType', cardType));
    }
  }

  render() {
    const { cvvCodeRichText, cardType, syncErrorsObj, labels, paymentMethodId } = this.props;
    let cvvError;
    if (syncErrorsObj) {
      cvvError = syncErrorsObj.syncError.cvvCode;
    }

    return (
      <form name="checkoutBilling">
        <BodyCopy
          fontFamily="primary"
          fontSize="fs28"
          fontWeight="regular"
          data-locator="billing-details"
          className="elem-mb-XS elem-mt-MED"
        >
          {getLabelValue(labels, 'lbl_billing_paymentMethodTitle')}
        </BodyCopy>
        <PaymentMethods labels={labels} />
        <div className="elem-mt-LRG">
          {paymentMethodId === CONSTANTS.PAYMENT_METHOD_CREDIT_CARD ? (
            <AddNewCCForm
              cvvInfo={cvvInfo({ cvvCodeRichText })}
              cardType={cardType}
              cvvError={cvvError}
              labels={labels}
            />
          ) : null}
        </div>
      </form>
    );
  }
}

const validateMethod = createValidateMethod({
  ...getStandardConfig(['cardNumber', 'cvvCode', 'expYear', 'expMonth']),
});
export default reduxForm({
  form: 'checkoutBilling', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(GuestBillingForm);
export { GuestBillingForm as GuestBillingFormVanilla };
