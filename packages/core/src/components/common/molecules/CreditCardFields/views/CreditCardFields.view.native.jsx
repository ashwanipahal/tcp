import React from 'react';
import { Platform } from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
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
            onFocus={onCardFocus}
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
