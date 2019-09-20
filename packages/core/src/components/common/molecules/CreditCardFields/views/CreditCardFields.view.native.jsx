import React from 'react';
import PropTypes from 'prop-types';
import { Field, View } from 'redux-form';
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
  CvvTextboxStyle
} from '../styles/CreditCardFields.styles.native';

export class CreditCardFields extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    const { isEdit, selectedCard } = props;
    if (isEdit && selectedCard) {
      const { expMonth, expYear } = selectedCard;
      this.state = {
        selectedYear: expYear,
        selectedMonth: expMonth && expMonth.trim(), // expMonth value for few cards coming with extra space. if no expMonth then default will be 1st from the options
      };
    } else {
      this.state = {
        selectedYear: null,
        selectedMonth: null,
      };
    }
  }

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
      cvvInfo: CVVInfo
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
        <ExpiryContainer>
          <ExpiryMonth>
            {/* <BodyCopy
              mobilefontFamily="secondary"
              fontSize="fs10"
              fontWeight="black"
              text={selectedMonth ? creditFieldLabels.expMonth : ''}
            /> */}
            <Field
              heading={creditFieldLabels.expMonth}
              name="expMonth"
              id="expMonth"
              component={DropDown}
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
          </ExpiryMonth>
          <ExpiryYear>
            {/* <BodyCopy
              mobilefontFamily="secondary"
              fontSize="fs10"
              fontWeight="black"
              text={selectedYear ? creditFieldLabels.expYear : ''}
            /> */}
            <Field
              heading={creditFieldLabels.expYear}
              name="expYear"
              id="expYear"
              component={DropDown}
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
          </ExpiryYear>
          <CvvCode>
            <Field
              label={creditFieldLabels.cvvCode}
              name="cvvCode"
              id="cvvCode"
              type="text"
              component={TextBox}
              dataLocator="payment-cvv"
              customStyle={CvvTextboxStyle}
            />
            <Field name="cardType" id="cardType" component={TextBox} type="hidden" />
            {/* <CVVInfo /> */}
          </CvvCode>
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
};

export default CreditCardFields;
