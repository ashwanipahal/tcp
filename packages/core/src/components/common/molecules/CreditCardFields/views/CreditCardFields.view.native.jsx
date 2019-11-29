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

  /* eslint-disable-next-line */
  UNSAFE_componentWillMount() {
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
      this.setState(
        { selectedMonth: card.expiryMonth.toString(), selectedYear: card.expiryYear.toString() },
        () => {
          updateCardDetails(card.cardNumber, card.expiryMonth, card.expiryYear, card.cvv);
        }
      );
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
      updateExpiryDate,
      isEdit,
      creditCard,
      creditFieldLabels,
      cvvInfo,
      showCvv,
      cameraIcon,
      onCardFocus,
      isExpirationRequired,
    } = this.props;
    const { selectedMonth, selectedYear } = this.state;

    return (
      <PaymentContainer>
        <CardContainer>
          <Field
            label={creditFieldLabels.creditCardNumber}
            name="cardNumber"
            id="cardNumber"
            keyboardType="numeric"
            component={CreditCardNumber}
            dataLocator="cardNbrTxtBox"
            cardTypeImgUrl={cardTypeImgUrl}
            isPLCCEnabled={isPLCCEnabled}
            cardType={cardType}
            enableSuccessCheck={false}
            isEdit={isEdit}
            val={isEdit ? dto.accountNo : ''}
            creditCard={creditCard}
            customStyle={CardTextboxStyle}
            cameraIcon={cameraIcon}
            onCardFocus={onCardFocus}
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
        {isExpirationRequired && (
          <ExpiryContainer showCvv={showCvv}>
            <ExpiryMonth>
              <Field
                placeholder={creditFieldLabels.expMonth}
                heading={creditFieldLabels.expMonth}
                component={Select}
                name="expMonth"
                options={expMonthOptionsMap}
                dataLocator="expMonthDropDown"
                onValueChange={itemValue => {
                  this.setState({ selectedMonth: itemValue });
                  updateExpiryDate(itemValue, selectedYear);
                }}
              />
            </ExpiryMonth>
            <ExpiryYear>
              <Field
                placeholder={creditFieldLabels.expYear}
                heading={creditFieldLabels.expYear}
                component={Select}
                name="expYear"
                options={expYearOptionsMap}
                onValueChange={itemValue => {
                  this.setState({ selectedYear: itemValue });
                  updateExpiryDate(selectedMonth, itemValue);
                }}
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
                  dataLocator="cvvTxtBox"
                  customStyle={CvvTextboxStyle}
                />
                <Field name="cardType" id="cardType" component={TextBox} type="hidden" />
                <CVVInfo>{cvvInfo}</CVVInfo>
              </CvvCode>
            )}
          </ExpiryContainer>
        )}
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
  onCardFocus: PropTypes.func,
  isExpirationRequired: PropTypes.bool,
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
  onCardFocus: () => {},
  isExpirationRequired: true,
};

export default CreditCardFields;
export { CreditCardFields as CreditCardFieldsVanilla };
