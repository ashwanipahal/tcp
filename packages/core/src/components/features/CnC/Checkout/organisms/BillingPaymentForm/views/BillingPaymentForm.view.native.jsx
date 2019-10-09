import React from 'react';
import { FormSection, reduxForm, change, Field } from 'redux-form';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import constants from '../container/CreditCard.constants';
import getCvvInfo from '../../../molecules/CVVInfo';
import AddNewCCForm from '../../AddNewCCForm';
import CheckoutBillingAddress from '../../CheckoutBillingAddress';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import { propTypes, defaultProps } from './BillingPaymentForm.view.util';
import {
  getExpirationRequiredFlag,
  getCreditCardList,
  getSelectedCard,
} from '../../../util/utility';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import CONSTANTS from '../../../Checkout.constants';
import PaymentMethods from '../../../../common/molecules/PaymentMethods';
import CreditCardDropdown from './CreditCardDropDown.view.native';
import { CardImage } from '../../../../../../common/molecules/Card/views/CardImage.native';
import {
  CvvCode,
  CvvTextboxStyle,
  CVVInfo,
  BillingAddressWrapper,
  PaymentMethodWrapper,
  PaymentMethodHeader,
  SubHeader,
  CreditCardHeader,
  CreditCardWrapper,
  PaymentMethodMainWrapper,
  PaymentMethodImage,
} from '../styles/BillingPaymentForm.style.native';

import TextBox from '../../../../../../common/atoms/TextBox';
import {
  getCardDetailsMethod,
  getDefaultPayment,
  getBillingAddressWrapper,
} from './BillingPaymentForm.view.native.util';

export class BillingPaymentForm extends React.PureComponent {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.state = {
      addNewCCState: false,
    };
  }

  /**
   * @function onAddNewCreditCardClick
   * @description sets the add new credit card state as true
   */
  onAddNewCreditCardClick = () => {
    const { dispatch } = this.props;
    this.setState({ addNewCCState: true });
    dispatch(change(constants.FORM_NAME, 'cardNumber', ''));
    dispatch(change(constants.FORM_NAME, 'expMonth', ''));
    dispatch(change(constants.FORM_NAME, 'expYear', ''));
    dispatch(change(constants.FORM_NAME, 'cvvCode', ''));
  };

  /**
   * @function getCheckoutBillingAddress
   * @description returns the checkout billing address form
   */
  getCheckoutBillingAddress = () => {
    const {
      selectedOnFileAddressId,
      userAddresses,
      labels,
      cardList,
      isGuest,
      orderHasShipping,
      addressLabels,
      dispatch,
      shippingAddress,
      isSameAsShippingChecked,
      billingData,
    } = this.props;
    const { addNewCCState } = this.state;
    const creditCardList = getCreditCardList({ cardList });
    return (
      <CheckoutBillingAddress
        isGuest={isGuest}
        orderHasShipping={orderHasShipping}
        addressLabels={addressLabels}
        dispatch={dispatch}
        shippingAddress={shippingAddress}
        isSameAsShippingChecked={isSameAsShippingChecked}
        labels={labels}
        billingData={billingData}
        userAddresses={userAddresses}
        selectedOnFileAddressId={selectedOnFileAddressId}
        formName={constants.FORM_NAME}
        addNewCCState={
          addNewCCState ||
          (!creditCardList && !orderHasShipping) ||
          (creditCardList && creditCardList.size === 0)
        }
      />
    );
  };

  /**
   * @function getAddNewCCForm
   * @description returns the add new credit card form
   */
  getAddNewCCForm = () => {
    const {
      cvvCodeRichText,
      cardType,
      labels,
      syncErrorsObj,
      isGuest,
      isSaveToAccountChecked,
      dispatch,
      billingData,
      creditFieldLabels,
    } = this.props;
    let cvvError;
    /* istanbul ignore else */
    if (syncErrorsObj) {
      cvvError = syncErrorsObj.syncError.cvvCode;
    }
    const isExpirationRequired = getExpirationRequiredFlag({ cardType });
    const { addNewCCState } = this.state;

    return (
      <AddNewCCForm
        cvvInfo={getCvvInfo({ cvvCodeRichText })}
        cardType={cardType}
        cvvError={cvvError}
        labels={labels}
        isGuest={isGuest}
        isSaveToAccountChecked={isSaveToAccountChecked}
        formName={constants.FORM_NAME}
        dispatch={dispatch}
        isExpirationRequired={isExpirationRequired}
        billingData={billingData}
        addNewCCState={addNewCCState}
        creditFieldLabels={creditFieldLabels}
      />
    );
  };

  getPaymentMethod = (labels, selectedCard, cvvCodeRichText) => {
    return (
      <>
        {labels.paymentMethod ? (
          <SubHeader>
            <BodyCopy
              mobileFontFamily="primary"
              fontSize="fs16"
              fontWeight="extrabold"
              data-locator="billing-payment-method"
              text={labels.paymentMethod}
              color="gray.900"
            />
          </SubHeader>
        ) : null}
        {labels.creditCardEnd ? this.renderCVVField(labels, selectedCard, cvvCodeRichText) : null}
      </>
    );
  };

  renderCVVField = (labels, selectedCard, cvvCodeRichText) => {
    return (
      <PaymentMethodWrapper>
        {labels.creditCardEnd ? (
          <PaymentMethodImage>
            <CardImage
              card={selectedCard}
              cardNumber={`${labels.creditCardEnd}${selectedCard.accountNo.slice(-4)}`}
            />
          </PaymentMethodImage>
        ) : null}
        {labels.cvvCode && selectedCard.ccType !== constants.ACCEPTED_CREDIT_CARDS.PLACE_CARD ? (
          <CvvCode>
            <Field
              label={labels.cvvCode}
              name="cvvCode"
              id="cvvCode"
              type="text"
              component={TextBox}
              dataLocator="payment-cvv"
              customStyle={CvvTextboxStyle}
            />
            {this.getCvvInfoIcon(cvvCodeRichText)}
          </CvvCode>
        ) : null}
      </PaymentMethodWrapper>
    );
  };

  getCvvInfoIcon = cvvCodeRichText => {
    return <CVVInfo>{getCvvInfo({ cvvCodeRichText })}</CVVInfo>;
  };

  /**
   * @function onCCDropDownChange
   * @description sets the add new credit card state to false if it is true
   */
  onCCDropDownChange = () => {
    const { addNewCCState } = this.state;
    if (addNewCCState) {
      this.setState({ addNewCCState: false });
    }
  };

  getCCDropDown = ({
    labels,
    creditCardList,
    onFileCardKey,
    selectedCard,
    dispatch,
    cvvCodeRichText,
  }) => {
    const { addNewCCState } = this.state;
    return (
      <BillingAddressWrapper>
        <CreditCardWrapper>
          <CreditCardHeader>
            <BodyCopy
              mobileFontFamily="primary"
              fontSize="fs10"
              fontWeight="extrabold"
              dataLocator="billing-payment-bilingcreditcardlabel"
              text={labels.selectFromCard}
            />
          </CreditCardHeader>
          <CreditCardDropdown
            creditCardList={creditCardList}
            labels={labels}
            onFileCardKey={onFileCardKey}
            addNewCC={this.onAddNewCreditCardClick}
            selectedOnFileCardKey={selectedCard && selectedCard.creditCardId}
            dispatch={dispatch}
            formName={constants.FORM_NAME}
            addNewCCState={addNewCCState}
            onChange={this.onCCDropDownChange}
          />
        </CreditCardWrapper>
        {selectedCard ? getCardDetailsMethod(labels) : null}
        {selectedCard ? this.getPaymentMethod(labels, selectedCard, cvvCodeRichText) : null}
        {selectedCard ? getDefaultPayment(selectedCard, labels) : null}
        {selectedCard ? getBillingAddressWrapper(selectedCard, onFileCardKey, labels) : null}
      </BillingAddressWrapper>
    );
  };

  addNewBillingInfoForm = () => {
    const { cardList, labels, dispatch, onFileCardKey } = this.props;
    const { addNewCCState } = this.state;
    const creditCardList = getCreditCardList({ cardList });
    return (
      <>
        {creditCardList &&
          creditCardList.size > 0 &&
          this.getCCDropDown({ labels, creditCardList, onFileCardKey, dispatch })}
        {this.getAddNewCCForm()}
        {this.getCheckoutBillingAddress({ ...this.props, creditCardList, addNewCCState })}
      </>
    );
  };

  getCreditListView = ({
    labels,
    creditCardList,
    onFileCardKey,
    selectedCard,
    dispatch,
    cvvCodeRichText,
  }) => {
    return (
      <>
        {creditCardList && creditCardList.size > 0
          ? this.getCCDropDown({
              labels,
              creditCardList,
              onFileCardKey,
              selectedCard,
              dispatch,
              cvvCodeRichText,
            })
          : this.getAddNewCCForm()}
      </>
    );
  };

  getCreditCardWrapper = ({ labels, creditCardList, cvvCodeRichText, onFileCardKey, dispatch }) => {
    const selectedCard = onFileCardKey ? getSelectedCard({ creditCardList, onFileCardKey }) : '';
    const { addNewCCState } = this.state;
    return (
      <>
        {creditCardList && creditCardList.size > 0 && !addNewCCState
          ? this.getCreditListView({
              labels,
              cvvCodeRichText,
              creditCardList,
              onFileCardKey,
              selectedCard,
              dispatch,
            })
          : this.addNewBillingInfoForm()}
      </>
    );
  };

  /**
   * @function render
   * @description render method to be called of component
   */
  render() {
    const {
      handleSubmit,
      cardList,
      onFileCardKey,
      labels,
      cvvCodeRichText,
      paymentMethodId,
      orderHasShipping,
      backLinkPickup,
      backLinkShipping,
      nextSubmitText,
      onSubmit,
      navigation,
      dispatch,
      isPaymentDisabled,
    } = this.props;
    const paymentMethods = [
      { id: constants.PAYMENT_METHOD_CREDIT_CARD, displayName: labels.creditCard },
      { id: constants.PAYMENT_METHOD_PAY_PAL, displayName: labels.payPal },
      { id: constants.PAYMENT_METHOD_VENMO, displayName: labels.venmo },
    ];
    const creditCardList = getCreditCardList({ cardList });
    return (
      <>
        {!isPaymentDisabled && (
          <PaymentMethodMainWrapper>
            <PaymentMethodHeader>
              <BodyCopy
                fontFamily="primary"
                fontSize="fs26"
                fontWeight="regular"
                spacingStyles="margin-bottom-MED"
                color="gray.900"
                data-locator="billing-details"
                text={labels.paymentMethod}
              />
            </PaymentMethodHeader>

            <FormSection name="shipmentMethods">
              <PaymentMethods
                paymentMethods={paymentMethods}
                formName={constants.FORM_NAME}
                selectedPaymentId={paymentMethodId}
                dispatch={dispatch}
              />
            </FormSection>

            {paymentMethodId === constants.PAYMENT_METHOD_CREDIT_CARD ? (
              this.getCreditCardWrapper({
                labels,
                creditCardList,
                cvvCodeRichText,
                onFileCardKey,
                dispatch,
              })
            ) : (
              <SubHeader />
            )}
          </PaymentMethodMainWrapper>
        )}
        <CnCTemplate
          navigation={navigation}
          btnText={nextSubmitText}
          routeToPage=""
          onPress={handleSubmit(onSubmit)}
          backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
          onBackLinkPress={() =>
            navigation.navigate(
              orderHasShipping
                ? CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_SHIPPING
                : CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_PICKUP
            )
          }
          showAccordian
        />
      </>
    );
  }
}

const validateMethod = createValidateMethod({
  address: AddressFields.addressValidationConfig,
  ...getStandardConfig(['cardNumber', 'cvvCode', 'expYear', 'expMonth']),
});
export default reduxForm({
  form: constants.FORM_NAME, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(BillingPaymentForm);
export { BillingPaymentForm as BillingPaymentFormVanilla };
