import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import TextBox from '../../../../../../common/atoms/TextBox';
import {
  PaymentContainer,
  CardContainer,
  ExpiryContainer,
} from '../styles/CreditCardFields.native.style';

export class CreditCardFields extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    const { expMonthOptionsMap, expYearOptionsMap } = props;
    this.state = {
      selectedYear: expYearOptionsMap[0].labels,
      selectedMonth: expMonthOptionsMap[0].label,
    };
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
            component={TextBox}
            enableSuccessCheck={false}
            name="cardNumber"
            id="cardNumber"
            dataLocator="addEditCreditCard-cardtextfield"
            className="field"
          />
        </CardContainer>
        <ExpiryContainer>
          <Field
            label={labels.paymentGC.lbl_payment_cardNumber}
            name="expMonth"
            id="expMonth"
            component={TextBox}
            dataLocator="addEditCreditCard-expMonth"
            className="field"
            {...dropDownStyle}
          />

          <Field
            name="expYear"
            id="expYear"
            component={TextBox}
            dataLocator="addEditCreditCard-expYear"
            className="field"
            {...dropDownStyle}
          />
          {/*
          <Field
            name="expMonth"
            id="expMonth"
            component={DropDown}
            data={expMonthOptionsMap}
            dataLocator="addEditCreditCard-expMonth1"
            onValueChange={itemValue => {
              this.setState({ selectedMonth: itemValue });
            }}
            variation="secondary"
            selectedValue={selectedMonth}
            dropDownStyle={{ ...dropDownStyle }}
            itemStyle={{ ...itemStyle }}
          />

          <Field
            name="expYear"
            id="expYear"
            component={DropDown}
            data={expYearOptionsMap}
            dataLocator="addEditCreditCard-expYear1"
            variation="secondary"
            dropDownStyle={{ ...dropDownStyle }}
            itemStyle={{ ...itemStyle }}
            onValueChange={itemValue => {
              this.setState({ selectedYear: itemValue });
            }}
            selectedValue={selectedYear}
          /> */}
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
};

CreditCardFields.defaultProps = {
  labels: {},
  isExpirationRequired: true,
  cardTypeImgUrl: '',
  cardType: '',
  isPLCCEnabled: true,
  className: '',
};

export default CreditCardFields;
