import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
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
    const { expMonthOptionsMap, expYearOptionsMap, isEdit, selectedCard } = props;
    if (isEdit && selectedCard) {
      const { expMonth, expYear } = selectedCard;
      this.state = {
        selectedYear: expYear,
        selectedMonth: expMonth,
      };
    } else {
      this.state = {
        selectedYear: expYearOptionsMap[1].label,
        selectedMonth: expMonthOptionsMap[0].label,
      };
    }
  }

  render() {
    const {
      labels,
      cardTypeImgUrl,
      isPLCCEnabled,
      cardType,
      expMonthOptionsMap,
      expYearOptionsMap,
      dto,
      updateExpiryDate,
      isEdit,
      creditCard,
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
            label={labels.paymentGC.lbl_payment_cardNumber}
            name="cardNumber"
            id="cardNumber"
            component={CreditCardNumber}
            dataLocator="payment-cardtextfield"
            cardTypeImgUrl={cardTypeImgUrl}
            isPLCCEnabled={isPLCCEnabled}
            cardType={cardType}
            className="field"
            enableSuccessCheck={false}
            isEdit={isEdit}
            val={isEdit ? dto.accountNo : ''}
            creditCard={creditCard}
          />
        </CardContainer>
        <ExpiryContainer>
          <Field
            component={DropDown}
            data={expMonthOptionsMap}
            dataLocator="addEditCreditCard-expMonth1"
            onValueChange={itemValue => {
              this.setState({ selectedMonth: itemValue });
              updateExpiryDate(itemValue, selectedYear);
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
              updateExpiryDate(selectedMonth, itemValue);
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
  cardTypeImgUrl: PropTypes.string,
  isPLCCEnabled: PropTypes.bool,
  cardType: PropTypes.string,
  dto: PropTypes.shape({}),
  selectedCard: PropTypes.shape({}),
};

CreditCardFields.defaultProps = {
  labels: {},
  cardTypeImgUrl: '',
  cardType: '',
  isPLCCEnabled: true,
  dto: {},
  selectedCard: {},
};

export default CreditCardFields;
