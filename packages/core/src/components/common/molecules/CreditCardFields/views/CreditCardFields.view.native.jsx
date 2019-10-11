import React from 'react';
import { Platform } from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import CustomIcon from '../../../atoms/Icon';
import { ICON_NAME } from '../../../atoms/Icon/Icon.constants';
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
  StyledImageWrapper,
  StyledLabel,
} from '../styles/CreditCardFields.styles.native';
import Select from '../../../atoms/Select';

/**
 *
 *
 * @class CreditCardFields
 * @extends {PureComponent}
 * @description view component to render credit card form fields.
 */
export class CreditCardFields extends React.PureComponent<Props> {
  componentWillMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
  }

  /**
   * @function scanCard
   * @description on click on camera icon scan card will call
   */
  scanCard = async () => {
    const { updateCardDetails, creditFieldLabels } = this.props;
    const config = {
      hideCardIOLogo: true,
      requireCVV: true,
      requireExpiry: true,
      scanInstructions: creditFieldLabels.cameraText,
    };
    const card = await CardIOModule.scanCard(config);
    if (card) {
      updateCardDetails(card.cardNumber, card.expiryMonth, card.expiryYear, card.cvv);
    }
  };

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
      isEdit,
      creditCard,
      creditFieldLabels,
      cvvInfo,
      showCvv,
      cameraIcon,
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
            cameraIcon={cameraIcon}
          />
          {cameraIcon && cardType == null && (
            <StyledImageWrapper onPress={this.scanCard}>
              <CustomIcon
                name={ICON_NAME.camera}
                size="fs25"
                color="gray.900"
                dataLocator="pdp_fast_shipping_icon"
              />
            </StyledImageWrapper>
          )}
        </CardContainer>
        <ExpiryContainer showCvv={showCvv}>
          <ExpiryMonth>
            <Field
              heading={creditFieldLabels.expMonth}
              component={Select}
              name="expMonth"
              id="expMonth"
              options={expMonthOptionsMap}
              dataLocator="addEditCreditCard-expMonth"
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
            />
          </ExpiryMonth>
          <ExpiryYear>
            <Field
              heading={creditFieldLabels.expYear}
              component={Select}
              name="expYear"
              id="expYear"
              options={expYearOptionsMap}
              dataLocator="addEditCreditCard-expYear"
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
            />
          </ExpiryYear>
          {showCvv && (
            <CvvCode>
              <StyledLabel>{creditFieldLabels.cvvCode}</StyledLabel>
              <Field
                label=""
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
  cameraIcon: PropTypes.bool,
};

CreditCardFields.defaultProps = {
  creditFieldLabels: {
    creditCardNumber: '',
    expMonth: '',
    expYear: '',
    cvvCode: '',
    cameraText: '',
  },
  cardTypeImgUrl: '',
  cardType: '',
  isPLCCEnabled: true,
  dto: {},
  selectedCard: null,
  showCvv: true,
  cameraIcon: false,
};

export default CreditCardFields;
export { CreditCardFields as CreditCardFieldsVanilla };
