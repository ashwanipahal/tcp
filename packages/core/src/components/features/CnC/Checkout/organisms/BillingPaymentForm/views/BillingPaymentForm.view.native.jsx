import React from 'react';
import { FormSection, reduxForm, change, Field } from 'redux-form';
import GenericSkeleton from '@tcp/core/src/components/common/molecules/GenericSkeleton/GenericSkeleton.view.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import constants from '../container/CreditCard.constants';
import getCvvInfo from '../../../molecules/CVVInfo';
import AddNewCCForm from '../../AddNewCCForm';

import AddressFields from '../../../../../../common/molecules/AddressFields';
import { propTypes, defaultProps, onCCDropUpdateChange } from './BillingPaymentForm.view.util';
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
  PayPalTextContainer,
  PaymentMethodMainWrapper,
  PaymentMethodImage,
  SkeletonWrapper,
} from '../styles/BillingPaymentForm.style.native';

import TextBox from '../../../../../../common/atoms/TextBox';
import {
  getCardDetailsMethod,
  getDefaultPayment,
  getBillingAddressWrapper,
  getCheckoutBillingAddress,
} from './BillingPaymentForm.view.native.util';
import CardEditFrom from './CardEditForm.view.native';
import {
  onEditCardFocus,
  setFormToEditState,
  unsetPaymentFormEditState,
  handleBillingFormSubmit,
  getPaymentMethods,
  onAddCreditCardClick,
  onCCDropDownChange,
} from './BillingPaymentForm.util';
import CCskeleton from './CCskeleton.native';

export class BillingPaymentForm extends React.PureComponent {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.state = { addNewCCState: false, editMode: false, editModeSubmissionError: '' };
    this.ediCardErrorRef = React.createRef();
  }

  /**
   * @function getAddNewCCForm
   * @description returns the add new credit card form
   */
  getAddNewCCForm = ({ onCardFocus, editMode } = {}) => {
    const { cardList, onFileCardKey } = this.props;
    const { isEditFormSameAsShippingChecked, isSameAsShippingChecked, isPLCCEnabled } = this.props;
    const { cvvCodeRichText, cardType, labels, syncErrorsObj, isGuest, dispatch } = this.props;
    const { isSaveToAccountChecked, billingData, creditFieldLabels, editFormCardType } = this.props;
    let cvvError;
    /* istanbul ignore else */
    if (syncErrorsObj) {
      cvvError = syncErrorsObj.syncError.cvvCode;
    }
    const formCardType = editMode ? editFormCardType : cardType;
    const isExpirationRequired = getExpirationRequiredFlag({ cardType: formCardType });
    const { addNewCCState } = this.state;
    const formName = editMode ? constants.EDIT_FORM_NAME : constants.FORM_NAME;
    dispatch(change(formName, 'cardType', formCardType));
    dispatch(change(formName, 'isPLCCEnabled', isPLCCEnabled));
    dispatch(change(formName, 'creditCardId', onFileCardKey));
    const creditCardList = getCreditCardList({ cardList });
    const selectedCard = onFileCardKey ? getSelectedCard({ creditCardList, onFileCardKey }) : '';
    return (
      <AddNewCCForm
        cvvInfo={getCvvInfo({ cvvCodeRichText })}
        cardType={formCardType}
        cvvError={cvvError}
        labels={labels}
        isGuest={isGuest}
        isSaveToAccountChecked={isSaveToAccountChecked}
        formName={formName}
        dispatch={dispatch}
        isExpirationRequired={isExpirationRequired}
        billingData={billingData}
        addNewCCState={addNewCCState}
        creditFieldLabels={creditFieldLabels}
        editMode={editMode}
        onCardFocus={onCardFocus}
        isSameAsShippingChecked={
          editMode ? isEditFormSameAsShippingChecked : isSameAsShippingChecked
        }
        selectedCard={selectedCard}
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
              dataLocator="paymentMethodLbl"
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
              dataLocator="cvvTxtBox"
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

  unsetFormEditState = e => {
    unsetPaymentFormEditState(this, e);
  };

  getCheckoutBillingAddressEdit = edit => {
    return getCheckoutBillingAddress(this, edit);
  };

  getCCDropDown = ({
    labels,
    creditCardList,
    onFileCardKey,
    selectedCard,
    dispatch,
    cvvCodeRichText,
  }) => {
    const { addNewCCState, editMode, editModeSubmissionError } = this.state;
    const isCardDetailEdit = selectedCard && !editMode;
    const { getAddNewCCForm, unsetFormEditState } = this;
    const { updateCardDetail, toastMessage, editFormCardType } = this.props;
    return (
      <BillingAddressWrapper>
        <CreditCardWrapper pointerEvents={editMode ? 'none' : 'auto'}>
          <CreditCardHeader>
            <BodyCopy
              mobileFontFamily="primary"
              fontSize="fs10"
              fontWeight="extrabold"
              dataLocator="cardDropDownLbl"
              text={labels.selectFromCard}
            />
          </CreditCardHeader>
          <CreditCardDropdown
            creditCardList={creditCardList}
            labels={labels}
            onFileCardKey={onFileCardKey}
            addNewCC={() => onAddCreditCardClick(this)}
            selectedOnFileCardKey={selectedCard && selectedCard.creditCardId}
            dispatch={dispatch}
            formName={constants.FORM_NAME}
            addNewCCState={addNewCCState}
            onChange={() => onCCDropDownChange(this)}
          />
        </CreditCardWrapper>
        {selectedCard ? getCardDetailsMethod(labels, setFormToEditState, editMode, this) : null}
        {isCardDetailEdit ? (
          <>
            {this.getPaymentMethod(labels, selectedCard, cvvCodeRichText)}
            {getDefaultPayment(selectedCard, labels, false)}
            {getBillingAddressWrapper(selectedCard, onFileCardKey, labels)}
          </>
        ) : null}

        {editMode ? (
          <CardEditFrom
            {...{ selectedCard, unsetFormEditState, getAddNewCCForm }}
            {...{ onEditCardFocus, dispatch, labels, updateCardDetail, editModeSubmissionError }}
            key="cardEditForm"
            addressForm={this.getCheckoutBillingAddressEdit}
            errorMessageRef={this.ediCardErrorRef}
            {...{ getDefaultPayment, toastMessage }}
            cardType={editFormCardType}
          />
        ) : null}
      </BillingAddressWrapper>
    );
  };

  addNewBillingInfoForm = () => {
    const { cardList, labels, dispatch, onFileCardKey } = this.props;
    const creditCardList = getCreditCardList({ cardList });
    return (
      <>
        {creditCardList &&
          creditCardList.size > 0 &&
          this.getCCDropDown({ labels, creditCardList, onFileCardKey, dispatch })}
        {this.getAddNewCCForm()}
        {getCheckoutBillingAddress(this)}
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
    if (onFileCardKey) {
      onCCDropUpdateChange(onFileCardKey, selectedCard, dispatch);
    }
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
      cardList,
      onFileCardKey,
      labels,
      cvvCodeRichText,
      paymentMethodId,
      orderHasShipping,
      backLinkPickup,
      backLinkShipping,
      nextSubmitText,
      navigation,
      dispatch,
      isPaymentDisabled,
      setCheckoutStage,
      getPayPalSettings,
      isPayPalWebViewEnable,
      isPayPalEnabled,
      bagLoading,
      isVenmoEnabled,
      onVenmoError,
      isVenmoAppInstalled,
    } = this.props;
    const paymentMethods = getPaymentMethods(labels, isVenmoEnabled, isVenmoAppInstalled);
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
                dataLocator="paymentMethodLbl"
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
            {isPayPalEnabled && paymentMethodId === constants.PAYMENT_METHOD_PAY_PAL ? (
              <PayPalTextContainer>
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs16"
                  spacingStyles="margin-bottom-MED"
                  color="gray.900"
                  dataLocator="paymentMethodLbl"
                  text={labels.payPalLongText}
                />
              </PayPalTextContainer>
            ) : null}
            {!bagLoading ? (
              <>
                {paymentMethodId === constants.PAYMENT_METHOD_VENMO && isVenmoEnabled && (
                  <PayPalTextContainer>
                    <BodyCopy
                      fontFamily="secondary"
                      fontSize="fs16"
                      spacingStyles="margin-bottom-MED"
                      color="gray.900"
                      dataLocator="venmoLabelText"
                      text={labels.venmoLongText}
                    />
                  </PayPalTextContainer>
                )}
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
              </>
            ) : (
              <>
                <CCskeleton />
                <SkeletonWrapper>
                  <GenericSkeleton />
                </SkeletonWrapper>
              </>
            )}
          </PaymentMethodMainWrapper>
        )}
        <CnCTemplate
          navigation={navigation}
          btnText={nextSubmitText}
          routeToPage=""
          onPress={e => handleBillingFormSubmit(this, e, true)}
          backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
          onBackLinkPress={() =>
            orderHasShipping
              ? setCheckoutStage(CONSTANTS.SHIPPING_DEFAULT_PARAM)
              : setCheckoutStage(CONSTANTS.PICKUP_DEFAULT_PARAM)
          }
          pageCategory="billing"
          showAccordian
          getPayPalSettings={getPayPalSettings}
          showPayPalButton={isPayPalEnabled && paymentMethodId === constants.PAYMENT_METHOD_PAY_PAL}
          isPayPalWebViewEnable={isPayPalWebViewEnable}
          showVenmoSubmit={paymentMethodId === constants.PAYMENT_METHOD_VENMO}
          continueWithText={labels.continueWith}
          onVenmoSubmit={e => handleBillingFormSubmit(this, e, true)}
          onVenmoError={onVenmoError}
          bagLoading={bagLoading}
          pageName="checkout"
          pageSection="billing"
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
  shouldValidate: () => true,
  ...validateMethod,
})(BillingPaymentForm);
export { BillingPaymentForm as BillingPaymentFormVanilla };
