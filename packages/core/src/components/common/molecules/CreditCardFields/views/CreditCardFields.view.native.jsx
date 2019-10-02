import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import CreditCardNumber from '../../../atoms/CreditCardNumber';
import TextBox from '../../../atoms/TextBox';
import {
  PaymentContainer,
  CardContainer,
  ExpiryContainer,
  ExpiryMonth,
  ExpiryYear,
  CardTextboxStyle,
  CvvCode,
  CvvTextboxStyle,
  HiddenExpiryWrapper,
  CVVInfo,
} from '../styles/CreditCardFields.styles.native';

/**
 *
 *
 * @class CreditCardFields
 * @extends {PureComponent}
 * @description view component to render credit card form fields.
 */
export class CreditCardFields extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    const { isEdit, selectedCard, selectedExpYear, selectedExpMonth } = props;
    if (isEdit && selectedCard) {
      const { expMonth, expYear } = selectedCard;
      this.state = {
        selectedYear: expYear,
        selectedMonth: expMonth && expMonth.trim(), // expMonth value for few cards coming with extra space. if no expMonth then default will be 1st from the options
      };
    } else {
      this.state = {
        selectedYear: selectedExpYear,
        selectedMonth: selectedExpMonth,
      };
    }
  }

  /**
   * @function render
   * @description render method to be called of component
   */
  render() {
    const {
      cardTypeImgUrl,
      isPLCCEnabled,
      cardType,
      expMonthOptionsMap,
      expYearOptionsMap,
      dto,
      updateExpiryDate,
      isEdit,
      creditCard,
      creditFieldLabels,
      cvvInfo,
      showCvv,
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
            label={creditFieldLabels.creditCardNumber}
            name="cardNumber"
            id="cardNumber"
            keyboardType="numeric"
            component={CreditCardNumber}
            dataLocator="payment-cardtextfield"
            cardTypeImgUrl={cardTypeImgUrl}
            isPLCCEnabled={isPLCCEnabled}
            cardType={cardType}
            enableSuccessCheck={false}
            isEdit={isEdit}
            val={isEdit ? dto.accountNo : ''}
            creditCard={creditCard}
            customStyle={CardTextboxStyle}
          />
        </CardContainer>
        <ExpiryContainer showCvv={showCvv}>
          <ExpiryMonth>
            <Field
              heading={creditFieldLabels.expMonth}
              component={DropDown}
              name="expMonth"
              data={expMonthOptionsMap}
              dataLocator="addEditCreditCard-expMonth"
              onValueChange={itemValue => {
                this.setState({ selectedMonth: itemValue });
                updateExpiryDate(itemValue, selectedYear);
              }}
              variation="secondary"
              selectedValue={selectedMonth || creditFieldLabels.expMonth}
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
            />
            <HiddenExpiryWrapper>
              <Field
                label=""
                component={TextBox}
                title=""
                type="hidden"
                name="expMonth"
                id="expMonth"
              />
            </HiddenExpiryWrapper>
          </ExpiryMonth>
          <ExpiryYear>
            <Field
              heading={creditFieldLabels.expYear}
              component={DropDown}
              name="expYear"
              data={expYearOptionsMap}
              dataLocator="addEditCreditCard-expYear"
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
              onValueChange={itemValue => {
                this.setState({ selectedYear: itemValue });
                updateExpiryDate(selectedMonth, itemValue);
              }}
              selectedValue={selectedYear || creditFieldLabels.expYear}
            />
            <HiddenExpiryWrapper>
              <Field
                label=""
                component={TextBox}
                title=""
                type="hidden"
                name="expYear"
                id="expYear"
              />
            </HiddenExpiryWrapper>
          </ExpiryYear>
          {showCvv && (
            <CvvCode>
              <Field
                label={creditFieldLabels.cvvCode}
                name="cvvCode"
                id="cvvCode"
                keyboardType="numeric"
                type="text"
                component={TextBox}
                dataLocator="payment-cvv"
                customStyle={CvvTextboxStyle}
              />
              <Field name="cardType" id="cardType" component={TextBox} type="hidden" />
              <CVVInfo>{cvvInfo}</CVVInfo>
            </CvvCode>
          )}
        </ExpiryContainer>
      </PaymentContainer>
    );
  }
}

CreditCardFields.propTypes = {
  creditFieldLabels: PropTypes.shape({}),
  cardTypeImgUrl: PropTypes.string,
  isPLCCEnabled: PropTypes.bool,
  cardType: PropTypes.string,
  dto: PropTypes.shape({}),
  selectedCard: PropTypes.shape({}),
  showCvv: PropTypes.bool,
};

CreditCardFields.defaultProps = {
  creditFieldLabels: {
    creditCardNumber: '',
    expMonth: '',
    expYear: '',
    cvvCode: '',
  },
  cardTypeImgUrl: '',
  cardType: '',
  isPLCCEnabled: true,
  dto: {},
  selectedCard: null,
  showCvv: true,
};

export default CreditCardFields;
