import React from 'react';
import PropTypes from 'prop-types';
import { Field, change } from 'redux-form';
import CreditCardFields from '../../../../../../common/molecules/CreditCardFields';
import { getLabelValue } from '../../../../../../../utils';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import {
  getCreditCardExpirationOptionMap,
} from '../../../../../account/AddEditCreditCard/container/AddEditCreditCard.utils';
import {
  SaveToAccWrapper,
  DefaultPaymentWrapper
} from '../styles/AddNewCCForm.styles.native';


class AddNewCCForm extends React.PureComponent {
  static propTypes = {
    cvvInfo: PropTypes.func.isRequired,
    cvvError: PropTypes.shape({}),
    cardType: PropTypes.string,
    labels: PropTypes.shape({}),
    isGuest: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    formName: PropTypes.string.isRequired,
    cardList: PropTypes.shape({}),
    isSaveToAccountChecked: PropTypes.bool,
    isExpirationRequired: PropTypes.bool,
    billingData: PropTypes.shape({}),
    addNewCCState: PropTypes.bool,
  };

  static defaultProps = {
    cvvError: null,
    cardType: null,
    labels: {},
    isGuest: null,
    cardList: null,
    isSaveToAccountChecked: true,
    isExpirationRequired: true,
    billingData: null,
    addNewCCState: false,
  };

  constructor(props) {
    super(props);
    this.creditCardExpirationOptionMap = getCreditCardExpirationOptionMap();
  }

  getCreditLabelValues = () => {
    const { labels } = this.props;
    return {
      creditCardNumber: getLabelValue(labels, 'lbl_billing_cardNumber'),
      expMonth: getLabelValue(labels, 'lbl_billing_expMonth'),
      expYear: getLabelValue(labels, 'lbl_billing_expYear'),
      cvvCode: getLabelValue(labels, 'lbl_billing_cvvCode'),
    };
  };

  onSaveToAccountChange = (e, value) => {
    const { dispatch, formName } = this.props;
    /* istanbul ignore else */
    if (!value && dispatch) {
      dispatch(change(formName, 'defaultPayment', value));
    }
  };

  renderSaveToAccountOptions = () => {
    const { labels, cardList, isSaveToAccountChecked } = this.props;
    return (
      <>
        <SaveToAccWrapper>
          <Field
            showDefaultCheckbox={false}
            component={InputCheckbox}
            name="saveToAccount"
            onChange={this.onSaveToAccountChange}
            fontSize="fs16"
            rightText={getLabelValue(labels, 'lbl_billing_saveToAccount', 'billing', 'checkout')}
          />
        </SaveToAccWrapper>
        <DefaultPaymentWrapper>
          <Field
            showDefaultCheckbox={false}
            component={InputCheckbox}
            name="defaultPayment"
            disabled={!cardList && !isSaveToAccountChecked}
            fontSize="fs16"
            rightText={getLabelValue(labels, 'lbl_billing_defaultPayment', 'billing', 'checkout')}
          />
        </DefaultPaymentWrapper>
      </>
    );
  };

  updateExpiryDate = (month, year) => {
    const { dispatch, formName } = this.props;

    // Setting form value to take dropdown values.
    dispatch(change(formName, 'expYear', year));
    dispatch(change(formName, 'expMonth', month));
  };

  getExpData = () => {
    const { billingData, addNewCCState } = this.props;
    let expMonth; let expYear;
    if (billingData && billingData.billing && !addNewCCState) {
      ({ billing: { expMonth, expYear } } = billingData);
      return { expMonth, expYear };
    }
    return { expMonth, expYear };
  }

  render() {
    const { cvvInfo, cardType, cvvError, isGuest, isExpirationRequired } = this.props;
    const { expMonth, expYear } = this.getExpData();
    return (
      <>
        <CreditCardFields
          cvvInfo={cvvInfo}
          variation="secondary"
          cardType={cardType}
          cvvError={cvvError}
          creditFieldLabels={this.getCreditLabelValues()}
          isExpirationRequired={isExpirationRequired}
          expMonthOptionsMap={this.creditCardExpirationOptionMap.monthsMap}
          expYearOptionsMap={this.creditCardExpirationOptionMap.yearsMap}
          updateExpiryDate={this.updateExpiryDate}
          selectedExpYear={expYear}
          selectedExpMonth={expMonth}
        />
        {!isGuest && this.renderSaveToAccountOptions()}
      </>
    );
  }
}

export default AddNewCCForm;
