/* eslint-disable max-lines */
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
import {
  propTypes,
  defaultProps,
  getExpirationRequiredFlag,
  getCreditCardList,
  getSelectedCard,
} from './BillingPaymentForm.view.util';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import CONSTANTS from '../../../Checkout.constants';
import PaymentMethods from '../../../../common/molecules/PaymentMethods';
import CreditCardDropdown from './CreditCardDropDown.view.native';
import CardImage from '../../../../../../common/molecules/Card/views/CardImage.native';
import Anchor from '../../../../../../common/atoms/Anchor';
import {
  CvvCode,
  CvvTextboxStyle,
  CVVInfo,
  BillingAddressWrapper,
  PaymentMethodWrapper,
  PaymentMethodHeader,
  CardDetailHeader,
  CardDetailEdit,
  SubHeader,
  BillingAddressHeader,
} from '../styles/BillingPaymentForm.style.native';
import Card from '../../../../../../common/molecules/Card/views/Card.native';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import TextBox from '../../../../../../common/atoms/TextBox';

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

  addNewCCBtn = () => {
    return null;
  };

  getCardDetailsMethod = labels => {
    return (
      <CardDetailHeader>
        {labels.lbl_billing_cardDetailsTitle ? (
          <BodyCopy
            mobileFontFamily="primary"
            fontSize="fs26"
            fontWeight="regular"
            data-locator="billing-payment-details"
            text={labels.lbl_billing_cardDetailsTitle}
          />
        ) : null}
        {labels.lbl_billing_editBtn ? (
          <CardDetailEdit>
            <Anchor
              underline
              anchorVariation="primary"
              fontSizeVariation="small"
              noLink
              href="#"
              target="_blank"
              text={labels.lbl_billing_editBtn}
            />
          </CardDetailEdit>
        ) : null}
      </CardDetailHeader>
    );
  };

  getPaymentMethod = (labels, selectedCard, cvvCodeRichText) => {
    return (
      <>
        {labels.lbl_billing_paymentMethodTitle ? (
          <SubHeader>
            <BodyCopy
              mobileFontFamily="primary"
              fontSize="fs16"
              fontWeight="extrabold"
              data-locator="billing-payment-method"
              text={labels.lbl_billing_paymentMethodTitle}
            />
          </SubHeader>
        ) : null}
        {labels.lbl_billing_creditCardEnd
          ? this.renderCVVField(labels, selectedCard, cvvCodeRichText)
          : null}
      </>
    );
  };

  renderCVVField = (labels, selectedCard, cvvCodeRichText) => {
    return (
      <PaymentMethodWrapper>
        {labels.lbl_billing_creditCardEnd ? (
          <CardImage
            card={selectedCard}
            cardNumber={`${labels.lbl_billing_creditCardEnd}${selectedCard.accountNo.slice(-4)}`}
          />
        ) : null}
        {labels.lbl_billing_cvvCode &&
        selectedCard.ccType !== constants.ACCEPTED_CREDIT_CARDS.PLACE_CARD ? (
          <CvvCode>
            <Field
              label={labels.lbl_billing_cvvCode}
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

  getDefaultPayment = (selectedCard, labels) => {
    return (
      <BillingAddressHeader>
        {!selectedCard.defaultInd && labels.lbl_billing_defaultPayment ? (
          <Field
            id="primary"
            name="primary"
            component={InputCheckbox}
            dataLocator="abilling-payment-checkbox-field"
            rightText={labels.lbl_billing_defaultPayment}
          />
        ) : null}
      </BillingAddressHeader>
    );
  };

  getBillingAddressWrapper = (selectedCard, onFileCardKey, labels) => {
    return (
      <>
        {labels.lbl_billing_billingAddress ? (
          <BillingAddressHeader>
            <BodyCopy
              mobileFontFamily="primary"
              fontSize="fs16"
              fontWeight="extrabold"
              dataLocator="billing-payment-billingAddress"
              text={labels.lbl_billing_billingAddress}
            />
          </BillingAddressHeader>
        ) : null}
        {selectedCard ? (
          <BillingAddressWrapper>
            {onFileCardKey && (
              <Card
                card={selectedCard}
                dataLocatorPrefix="billing-payment-card-detail"
                showAddress
              />
            )}
          </BillingAddressWrapper>
        ) : null}
      </>
    );
  };

  getCCDropDown = ({
    labels,
    creditCardList,
    onFileCardKey,
    selectedCard,
    dispatch,
    cvvCodeRichText,
  }) => {
    return (
      <BillingAddressWrapper>
        <CreditCardDropdown
          creditCardList={creditCardList}
          labels={labels}
          onFileCardKey={onFileCardKey}
          addNewCC={this.onAddNewCCClick}
          selectedOnFileCardKey={selectedCard && selectedCard.creditCardId}
          dispatch={dispatch}
          formName={constants.FORM_NAME}
        />
        {selectedCard ? this.getCardDetailsMethod(labels) : null}
        {selectedCard ? this.getPaymentMethod(labels, selectedCard, cvvCodeRichText) : null}
        {this.getDefaultPayment(selectedCard, labels)}
        {this.getBillingAddressWrapper(selectedCard, onFileCardKey, labels)}
      </BillingAddressWrapper>
    );
  };

  addNewBillingInfoForm = () => {
    const { cardList } = this.props;
    const { addNewCCState } = this.state;
    const creditCardList = getCreditCardList({ cardList });
    return (
      <>
        {creditCardList && creditCardList.size > 0 && this.addNewCCBtn()}
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
    const { addNewCCState } = this.state;
    const selectedCard = onFileCardKey ? getSelectedCard({ creditCardList, onFileCardKey }) : '';
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
      billingData,
      dispatch,
    } = this.props;
    const paymentMethods = [
      { id: 'creditCard', displayName: 'Credit Card' },
      { id: 'payPal', displayName: 'Pay Pal' },
      { id: 'venmo', displayName: 'Venmo' },
    ];
    const creditCardList = getCreditCardList({ cardList });
    return (
      <>
        <PaymentMethodHeader>
          <BodyCopy
            mobileFontFamily="primary"
            fontSize="fs26"
            fontWeight="regular"
            data-locator="billing-details"
            text={labels.lbl_billing_paymentMethodTitle}
          />
        </PaymentMethodHeader>

        <FormSection name="shipmentMethods">
          <PaymentMethods
            paymentMethods={paymentMethods}
            formName={constants.FORM_NAME}
            paymentHeader="Credit card"
            selectedPaymentId={paymentMethodId}
            dispatch={dispatch}
          />
        </FormSection>

        {paymentMethodId === constants.PAYMENT_METHOD_CREDIT_CARD && billingData ? (
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
