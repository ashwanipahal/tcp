import React from 'react';
import PropTypes from 'prop-types';
import { Field, change } from 'redux-form';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import CreditCardNumber from '../../CreditCardNumber';
import {
  PaymentContainer,
  CardContainer,
  ExpiryContainer,
} from '../styles/CreditCardFields.native.style';

export class CreditCardFields extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    const { expMonthOptionsMap, expYearOptionsMap, dispatch } = props;
    this.state = {
      selectedYear: expYearOptionsMap[1].label,
      selectedMonth: expMonthOptionsMap[0].label,
    };
    // Setting form value to take initial dropdown values.
    dispatch(change('addEditCreditCard', 'expYear', expYearOptionsMap[1].id));
    dispatch(change('addEditCreditCard', 'expMonth', expMonthOptionsMap[0].id));
  }

  render() {
    const {
      labels,
      cardTypeImgUrl,
      isExpirationRequired,
      isPLCCEnabled,
      cardType,
      className,
      expMonthOptionsMap,
      expYearOptionsMap,
      dto,
      dispatch,
    } = this.props;
    const { selectedMonth, selectedYear } = this.state;
    const dropDownStyle = {
      height: 40,
      border: 1,
      width: 100,
      marginRight: 15,
    };
    const itemStyle = {
      height: 40,
      width: 100,
    };
    return (
      <PaymentContainer>
        <CardContainer>
          <Field
            label={(dto && dto.accountNo) || labels.paymentGC.lbl_payment_cardNumber}
            name="cardNumber"
            id="cardNumber"
            component={CreditCardNumber}
            dataLocator="payment-cardtextfield"
            cardTypeImgUrl={cardTypeImgUrl}
            isPLCCEnabled={isPLCCEnabled}
            cardType={cardType}
            className="field"
            enableSuccessCheck={false}
          />
        </CardContainer>
        <ExpiryContainer>
          <Field
            component={DropDown}
            data={expMonthOptionsMap}
            dataLocator="addEditCreditCard-expMonth1"
            onValueChange={itemValue => {
              this.setState({ selectedMonth: itemValue });
              dispatch(change('addEditCreditCard', 'expMonth', itemValue));
            }}
            variation="secondary"
            selectedValue={selectedMonth}
            dropDownStyle={{ ...dropDownStyle }}
            itemStyle={{ ...itemStyle }}
          />

          <Field
            component={DropDown}
            data={expYearOptionsMap}
            dataLocator="addEditCreditCard-expYear1"
            variation="secondary"
            dropDownStyle={{ ...dropDownStyle }}
            itemStyle={{ ...itemStyle }}
            onValueChange={itemValue => {
              this.setState({ selectedYear: itemValue });
              dispatch(change('addEditCreditCard', 'expYear', itemValue));
            }}
            selectedValue={selectedYear}
          />
        </ExpiryContainer>
      </PaymentContainer>
    );
  }
}

CreditCardFields.propTypes = {
  labels: PropTypes.shape({
    lbl_payment_cardNumber: '',
    lbl_payment_expMonth: '',
    lbl_payment_expYear: '',
  }),
  isExpirationRequired: PropTypes.bool,
  cardTypeImgUrl: PropTypes.string,
  isPLCCEnabled: PropTypes.bool,
  cardType: PropTypes.string,
  className: PropTypes.string,
  dto: PropTypes.shape({}),
};

CreditCardFields.defaultProps = {
  labels: {},
  isExpirationRequired: true,
  cardTypeImgUrl: '',
  cardType: '',
  isPLCCEnabled: true,
  className: '',
  dto: {},
};

export default CreditCardFields;
