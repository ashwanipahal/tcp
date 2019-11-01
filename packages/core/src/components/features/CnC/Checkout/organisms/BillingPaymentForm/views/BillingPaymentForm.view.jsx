import React from 'react';
import { reduxForm, Field, change } from 'redux-form';
import CardImage from '@tcp/core/src/components/common/molecules/CardImage';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/BillingPaymentForm.style';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import PaymentMethods from '../../../../common/molecules/PaymentMethods';
import CreditCardDropdown from './CreditCardDropdown.view';
import Card from '../../../../../../common/molecules/Card';
import { Row, Col, Heading, TextBox, BodyCopy, Anchor } from '../../../../../../common/atoms';
import constants from '../container/CreditCard.constants';
import CheckoutFooter from '../../../molecules/CheckoutFooter';
import utility, {
  getExpirationRequiredFlag,
  getCreditCardList,
  getSelectedCard,
} from '../../../util/utility';
import { CHECKOUT_ROUTES } from '../../../Checkout.constants';
import DropdownList from './CreditCardDropdownList.view';
import getCvvInfo from '../../../molecules/CVVInfo';
import AddNewCCForm from '../../AddNewCCForm';
import CheckoutBillingAddress from '../../CheckoutBillingAddress';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import {
  propTypes,
  defaultProps,
  getCardOptions,
  onCCDropUpdateChange,
  onAddNewCreditCardUpdate,
  getFormName,
  renderBillingAddressHeading,
} from './BillingPaymentForm.view.util';
import VenmoPaymentButton from '../../../../../../common/atoms/VenmoPaymentButton';
import CheckoutOrderInfo from '../../../molecules/CheckoutOrderInfoMobile';
import CardEditFrom from './CardEditForm.view';
import {
  onEditCardFocus as onCardEditFocus,
  setFormToEditState,
  unsetPaymentFormEditState,
  handleBillingFormSubmit,
} from './BillingPaymentForm.util';

/**
 * @class BillingPaymentForm
 * @extends {PureComponent}
 * @description view component to render signed in user form.
 */
export class BillingPaymentForm extends React.PureComponent {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.state = { addNewCCState: false, editMode: false, editModeSubmissionError: '' };
    this.ediCardErrorRef = React.createRef();
  }

  /**
   * @function onAddNewCreditCardClick
   * @description sets the add new credit card state as true
   */
  onAddNewCreditCardClick = () => {
    const { dispatch } = this.props;
    this.setState({ addNewCCState: true });
    onAddNewCreditCardUpdate(dispatch);
  };

  /**
   * @function getCreditCardDropDown
   * @description returns the  credit card list
   */
  getCreditCardDropDown = (options, onClickHandler, activeValue) => {
    return (
      <DropdownList
        {...{ optionsMap: options, clickHandler: onClickHandler, activeValue }}
        className="custom-select-dropDownList"
      />
    );
  };

  /**
   * @function getCheckoutBillingAddress
   * @description returns the checkout billing address form
   */
  getCheckoutBillingAddress = ({ editMode } = {}) => {
    const { selectedOnFileAddressId, isSameAsShippingChecked } = this.props;
    const { isEditFormSameAsShippingChecked, editFormSelectedOnFileAddressId } = this.props;
    const { userAddresses, labels, cardList, isGuest, dispatch } = this.props;
    const { orderHasShipping, addressLabels, shippingAddress, billingData } = this.props;
    const { addNewCCState } = this.state;
    const creditCardList = getCreditCardList({ cardList });
    return (
      <CheckoutBillingAddress
        shippingAddress={shippingAddress}
        isSameAsShippingChecked={
          editMode ? isEditFormSameAsShippingChecked : isSameAsShippingChecked
        }
        billingData={billingData}
        userAddresses={userAddresses}
        {...{ labels, editMode, isGuest, orderHasShipping, dispatch, addressLabels }}
        selectedOnFileAddressId={
          editMode ? editFormSelectedOnFileAddressId : selectedOnFileAddressId
        }
        formName={getFormName(editMode)}
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
  getAddNewCCForm = ({ onCardFocus, editMode } = {}) => {
    const { cardType, editFormCardType, labels, dispatch, syncErrorsObj, isGuest } = this.props;
    const { cvvCodeRichText, creditFieldLabels, isSaveToAccountChecked } = this.props;
    const { isPLCCEnabled } = this.props;
    let cvvError;
    /* istanbul ignore else */
    if (syncErrorsObj) {
      cvvError = syncErrorsObj.syncError.cvvCode;
    }
    const isExpirationRequired = getExpirationRequiredFlag({ cardType });
    const formCardType = editMode ? editFormCardType : cardType;
    const formName = getFormName(editMode);
    dispatch(change(formName, 'cardType', cardType));
    dispatch(change(formName, 'isPLCCEnabled', isPLCCEnabled));
    return (
      <AddNewCCForm
        cvvInfo={getCvvInfo({ cvvCodeRichText })}
        {...{ cardType: formCardType, cvvError, isGuest, onCardFocus, isSaveToAccountChecked }}
        {...{ dispatch, isExpirationRequired, creditFieldLabels, editMode, labels, isPLCCEnabled }}
        formName={formName}
      />
    );
  };

  /**
   * @function addNewBillingInfoForm
   * @description returns the new billing info form
   */
  addNewBillingInfoForm = () => {
    const { onFileCardKey, labels, cardList } = this.props;
    const creditCardList = getCreditCardList({ cardList });
    const ccListPreset = creditCardList && creditCardList.size > 0;
    return (
      <>
        {renderBillingAddressHeading(labels)}
        {ccListPreset && this.getCCDropDown({ labels, creditCardList, onFileCardKey })}
        {this.getAddNewCCForm()}
        {this.getCheckoutBillingAddress()}
      </>
    );
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
    const { dispatch } = this.props;
    dispatch(change(constants.FORM_NAME, 'cvvCode', ''));
  };

  /**
   * @function onEditCardFocus
   * @description on edit card number field focus event to clear the field first time only
   */
  onEditCardFocus = scope => {
    if (!this.cardNumberCleared) {
      this.cardNumberCleared = true;
      onCardEditFocus(scope);
    }
  };

  /**
   * @function getCCDropDown
   * @description returns the credit card drop down if user has credit cards
   */
  getCCDropDown = ({ labels, creditCardList, onFileCardKey, selectedCard, editMode }) => {
    const { addNewCCState } = this.state;
    const { dispatch } = this.props;
    const restCardParam = { addNewCC: this.onAddNewCreditCardClick, selectedCard };
    const cardParams = { creditCardList, labels, onFileCardKey, addNewCCState, ...restCardParam };
    const colSize = { large: 6, small: 6, medium: 10 };
    if (onFileCardKey) {
      onCCDropUpdateChange(onFileCardKey, selectedCard, dispatch);
    }
    return (
      <Row fullBleed className="elem-mb-XL elem-mt-MED">
        <Col
          colSize={colSize}
          className={`creditCardForm__addressBook ${editMode ? 'disable-drop-down' : ''}`}
        >
          <Field
            selectListTitle=""
            name="onFileCardKey"
            id="onFileCardKey"
            component={CreditCardDropdown}
            dataLocator="selectCardDrpDown"
            options={getCardOptions(cardParams)}
            childrenComp={(options, onClickHandler, activeValue, onClose) =>
              this.getCreditCardDropDown(options, onClickHandler, activeValue, onClose)
            }
            onChange={this.onCCDropDownChange}
            customTitle={labels.addCreditCard}
          />
        </Col>
      </Row>
    );
  };

  renderCardDetailsHeading = ({ hideAnchor } = {}) => {
    const { labels } = this.props;
    return (
      <BodyCopy component="div" fontFamily="secondary" className="billing-payment-details">
        <BodyCopy
          fontFamily="primary"
          fontSize="fs26"
          fontWeight="regular"
          dataLocator="cardDetailLbl"
          className="elem-mb-XS"
        >
          {labels.cardDetailsTitle}
        </BodyCopy>
        {!hideAnchor && (
          <Anchor
            fontSizeVariation="medium"
            underline
            noLink
            onClick={e => {
              this.cardNumberCleared = false;
              setFormToEditState(this, e);
            }}
            anchorVariation="primary"
            className="billing-payment-edit"
            dataLocator="billing-payment-edit"
          >
            {labels.edit}
          </Anchor>
        )}
      </BodyCopy>
    );
  };

  /**
   * @function getCreditListView
   * @description returns the credit card drop down along with selected card
   */
  getCreditListView = ({ labels, cvvCodeRichText, creditCardList, onFileCardKey }) => {
    const { defaultPayment, paymentMethod, creditCardEnd, cvvCode } = labels;
    const selectedCard = onFileCardKey ? getSelectedCard({ creditCardList, onFileCardKey }) : '';
    const { editMode, editModeSubmissionError } = this.state;
    const { dispatch, updateCardDetail, editFormCardType } = this.props;
    const billingPaymentFormWidthCol = { large: 3, small: 4, medium: 4 };
    const cvvCodeColWidth = { large: 3, small: 2, medium: 4 };
    const { renderCardDetailsHeading, getAddNewCCForm, unsetFormEditState, onEditCardFocus } = this;
    return (
      <>
        {renderBillingAddressHeading(labels)}
        {this.getCCDropDown({ labels, creditCardList, onFileCardKey, selectedCard, editMode })}
        {!editMode ? (
          <>
            {selectedCard ? (
              <>
                {this.renderCardDetailsHeading()}
                <Heading
                  component="h2"
                  variant="listMenu"
                  className="paymentMethodHeading"
                  dataLocator="paymentMethodLbl"
                >
                  {paymentMethod}
                </Heading>
                <Row fullBleed>
                  <Col colSize={billingPaymentFormWidthCol} className="billing-payment-card-info">
                    <CardImage
                      card={selectedCard}
                      cardNumber={`${creditCardEnd}${selectedCard.accountNo.slice(-4)}`}
                    />
                  </Col>
                  {selectedCard.ccType !== constants.ACCEPTED_CREDIT_CARDS.PLACE_CARD && (
                    <Col colSize={cvvCodeColWidth} className="position-relative cvvCode">
                      <Field
                        placeholder={cvvCode}
                        name="cvvCode"
                        id="cvvCode"
                        component={TextBox}
                        dataLocator="cvvTxtBox"
                        className="field"
                        showSuccessCheck={false}
                        enableSuccessCheck={false}
                        autocomplete="noautocomplete"
                      />
                      <span className="hide-show show-hide-icons">
                        <span className="info-icon-img-wrapper">
                          {getCvvInfo({ cvvCodeRichText })}
                        </span>
                      </span>
                    </Col>
                  )}
                </Row>
                {!selectedCard.defaultInd && (
                  <Row fullBleed className="billing-payment-subHeading default-payment">
                    <Field
                      dataLocator="defaultPaymentChkBox"
                      name="defaultPaymentMethod"
                      component={InputCheckbox}
                      className="default-payment"
                    >
                      <BodyCopy
                        dataLocator="billing-payment-default-payment-heading-lbl"
                        fontSize="fs16"
                        fontFamily="secondary"
                        fontWeight="regular"
                      >
                        {defaultPayment}
                      </BodyCopy>
                    </Field>
                  </Row>
                )}
              </>
            ) : (
              this.getAddNewCCForm()
            )}
            <Row fullBleed className="billing-payment-subHeading">
              <Heading
                component="h2"
                variant="listMenu"
                className="paymentMethodHeading"
                dataLocator="billingAddressLbl"
              >
                {labels.billingAddress}
              </Heading>
            </Row>

            {selectedCard ? (
              <Row fullBleed className="elem-mb-XL">
                {onFileCardKey && (
                  <Card
                    card={selectedCard}
                    className="CreditCardForm__address"
                    dataLocator="selectedCardDetail"
                    showAddress
                  />
                )}
              </Row>
            ) : (
              this.getCheckoutBillingAddress()
            )}
          </>
        ) : (
          <CardEditFrom
            {...{ selectedCard, renderCardDetailsHeading, getAddNewCCForm, unsetFormEditState }}
            {...{ onEditCardFocus, dispatch, labels, updateCardDetail, editModeSubmissionError }}
            key="cardEditForm"
            addressForm={this.getCheckoutBillingAddress}
            errorMessageRef={this.ediCardErrorRef}
            cardType={editFormCardType}
          />
        )}
      </>
    );
  };

  unsetFormEditState = e => {
    unsetPaymentFormEditState(this, e);
  };

  /**
   * @function getCreditCardWrapper
   * @description returns the credit card payment method view
   */
  getCreditCardWrapper = ({ labels, creditCardList, cvvCodeRichText, onFileCardKey }) => {
    const { addNewCCState } = this.state;
    return (
      <>
        {creditCardList && creditCardList.size > 0 && !addNewCCState
          ? this.getCreditListView({ labels, cvvCodeRichText, creditCardList, onFileCardKey })
          : this.addNewBillingInfoForm()}
      </>
    );
  };

  /**
   * @function render
   * @description render method to be called of component
   */
  render() {
    const { className, handleSubmit, cardList, isGuest } = this.props;
    const { onFileCardKey, labels, cvvCodeRichText, isVenmoEnabled } = this.props;
    const { paymentMethodId, orderHasShipping, backLinkPickup } = this.props;
    const { backLinkShipping, nextSubmitText, isPaymentDisabled, showAccordian } = this.props;
    const creditCardList = getCreditCardList({ cardList });
    return (
      <form
        name={constants.FORM_NAME}
        noValidate
        className={className}
        onSubmit={e => handleBillingFormSubmit(this, e)}
      >
        {!isPaymentDisabled && (
          <div>
            <BodyCopy
              fontFamily="primary"
              fontSize="fs26"
              fontWeight="regular"
              dataLocator="paymentMethodLbl"
              className="elem-mb-LRG elem-mt-XL"
            >
              {labels.paymentMethod}
            </BodyCopy>
            <PaymentMethods
              labels={labels}
              className="elem-mb-LRG"
              isVenmoEnabled={isVenmoEnabled}
            />
            {paymentMethodId === constants.PAYMENT_METHOD_CREDIT_CARD &&
              this.getCreditCardWrapper({
                labels,
                creditCardList,
                cvvCodeRichText,
                onFileCardKey,
              })}
            {paymentMethodId === constants.PAYMENT_METHOD_PAYPAL && (
              <div className="payment-paypal-container" />
            )}
            {paymentMethodId === constants.PAYMENT_METHOD_VENMO && isVenmoEnabled && (
              <VenmoPaymentButton
                className="venmo-container"
                continueWithText={labels.continueWith}
                onSuccess={handleSubmit}
                isVenmoBlueButton
              />
            )}
          </div>
        )}
        <CheckoutOrderInfo isGuest={isGuest} showAccordian={showAccordian} />
        <CheckoutFooter
          hideBackLink
          backLinkHandler={() => utility.routeToPage(CHECKOUT_ROUTES.shippingPage)}
          nextButtonText={nextSubmitText}
          backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
          showVenmoSubmit={paymentMethodId === constants.PAYMENT_METHOD_VENMO}
          continueWithText={labels.continueWith}
          onVenmoSubmit={handleSubmit}
        />
      </form>
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
})(withStyles(BillingPaymentForm, styles));
export { BillingPaymentForm as BillingPaymentFormVanilla };
