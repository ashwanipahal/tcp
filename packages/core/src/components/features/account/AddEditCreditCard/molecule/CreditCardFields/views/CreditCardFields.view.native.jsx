import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import { getCreditCardExpirationOptionMap } from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.utils';
import TextBox from '../../../../../../common/atoms/TextBox';
import {
  PaymentContainer,
  CardContainer,
  ExpiryContainer,
} from '../styles/CreditCardFields.native.style';
import { white } from 'ansi-colors';

export class CreditCardFields extends React.PureComponent<Props> {
  handleComponentChange(item) {}

  render() {
    const {
      labels,
      cardTypeImgUrl,
      isExpirationRequired,
      isPLCCEnabled,
      cardType,
      expMonthOptionsMap,
      expYearOptionsMap,
      className,
    } = this.props;
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
            label="Card #"
            component={TextBox}
            title="CreditCardFields"
            name="recaptchaToken"
            id="recaptchaToken"
            data-locator="gift-card-recaptchcb"
            className="visibility-recaptcha"
          />
        </CardContainer>
        <ExpiryContainer>
          <DropDown
            data={getCreditCardExpirationOptionMap().monthsMap}
            onValueChange={itemValue => {
              this.handleComponentChange(itemValue);
            }}
            variation="secondary"
            dropDownStyle={{ ...dropDownStyle }}
            itemStyle={{ ...itemStyle }}
          />
          <DropDown
            data={getCreditCardExpirationOptionMap().yearsMap}
            onValueChange={itemValue => {
              this.handleComponentChange(itemValue);
            }}
            variation="secondary"
            dropDownStyle={{ ...dropDownStyle }}
            itemStyle={{ ...itemStyle }}
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
  expMonthOptionsMap: PropTypes.shape([]).isRequired,
  expYearOptionsMap: PropTypes.shape([]).isRequired,
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
