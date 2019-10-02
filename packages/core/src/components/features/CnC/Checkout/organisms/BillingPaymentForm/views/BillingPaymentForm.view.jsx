import React from 'react';
import { reduxForm, Field, change } from 'redux-form';
import CardImage from '@tcp/core/src/components/common/molecules/CardImage';
import TextBox from '../../../../../../common/atoms/TextBox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/BillingPaymentForm.style';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import PaymentMethods from '../../../../common/molecules/PaymentMethods';
import CreditCardDropdown from './CreditCardDropdown.view';
import Card from '../../../../../../common/molecules/Card';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';

import { Heading } from '../../../../../../common/atoms';
import constants from '../container/CreditCard.constants';
import Anchor from '../../../../../../common/atoms/Anchor';
import CheckoutFooter from '../../../molecules/CheckoutFooter';
import utility from '../../../util/utility';
import { CHECKOUT_ROUTES } from '../../../Checkout.constants';
import DropdownList from './CreditCardDropdownList.view';
import getCvvInfo from '../../../molecules/CVVInfo';
import AddNewCCForm from '../../AddNewCCForm';
import CheckoutBillingAddress from '../../CheckoutBillingAddress';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import {
  propTypes,
  defaultProps,
  getExpirationRequiredFlag,
  getSelectedCard,
  getCreditCardList,
  getCardOptions,
} from './BillingPaymentForm.view.util';
import VenmoPaymentButton from '../../../../../../common/atoms/VenmoPaymentButton';
import CheckoutOrderInfo from '../../../molecules/CheckoutOrderInfoMobile';
import CardEditFrom from './CardEditForm.view';

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
    this.state = {
      addNewCCState: false,
      editMode: false,
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
   * @function getCreditCardDropDown
   * @description returns the  credit card list
   */
  getCreditCardDropDown = (options, onClickHandler, activeValue) => {
    return (
      <DropdownList
        {...{ options, onClickHandler, activeValue }}
        className="custom-select-dropDownList"
      />
    );
  };

  /**
   * @function getCheckoutBillingAddress
   * @description returns the checkout billing address form
   */
  getCheckoutBillingAddress = ({ editMode } = {}) => {
    const {
      selectedOnFileAddressId,
      isSameAsShippingChecked,
      isEditFormSameAsShippingChecked = false,
      editFormSelectedOnFileAddressId,
    } = this.props;
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
        formName={editMode ? constants.EDIT_FORM_NAME : constants.FORM_NAME}
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
    const { cardType, labels, dispatch, syncErrorsObj, isGuest } = this.props;
    const { cvvCodeRichText, creditFieldLabels, isSaveToAccountChecked } = this.props;
    let cvvError;
    /* istanbul ignore else */
    if (syncErrorsObj) {
      cvvError = syncErrorsObj.syncError.cvvCode;
    }
    const isExpirationRequired = getExpirationRequiredFlag({ cardType });

    return (
      <AddNewCCForm
        cvvInfo={getCvvInfo({ cvvCodeRichText })}
        {...{ cardType, cvvError, labels, isGuest, onCardFocus, editMode, isSaveToAccountChecked }}
        {...{ dispatch, isExpirationRequired, creditFieldLabels }}
        formName={constants.FORM_NAME}
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
    return (
      <>
        {creditCardList &&
          creditCardList.size > 0 &&
          this.getCCDropDown({ labels, creditCardList, onFileCardKey })}
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
  };

  /**
   * @function getCCDropDown
   * @description returns the credit card drop down if user has credit cards
   */
  getCCDropDown = ({ labels, creditCardList, onFileCardKey, selectedCard, editMode }) => {
    const { addNewCCState } = this.state;
    return (
      <Row fullBleed className="elem-mb-XL elem-mt-MED">
        <Col
          colSize={{
            large: 6,
            small: 6,
            medium: 10,
          }}
          className={`creditCardForm__addressBook ${editMode ? 'disable-drop-down' : ''}`}
        >
          <Field
            selectListTitle=""
            name="onFileCardKey"
            id="onFileCardKey"
            component={CreditCardDropdown}
            dataLocator="payment-billingaddressdd"
            options={getCardOptions({
              creditCardList,
              labels,
              onFileCardKey,
              addNewCCState,
              addNewCC: this.onAddNewCreditCardClick,
              selectedCard,
            })}
            childrenComp={(options, onClickHandler, activeValue, onClose) =>
              this.getCreditCardDropDown(options, onClickHandler, activeValue, onClose)
            }
            onChange={this.onCCDropDownChange}
          />
        </Col>
      </Row>
    );
  };

  setFormToEditState = e => {
    e.preventDefault();
    this.cardNumberCleared = false;
    this.setState({ editMode: true });
  };

  unsetFormEditState = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ editMode: false });
  };

  renderCardDetailsHeading = ({ hideAnchor } = {}) => {
    const { labels } = this.props;
    return (
      <BodyCopy component="div" fontFamily="secondary" className="billing-payment-details">
        <BodyCopy
          fontFamily="primary"
          fontSize="fs26"
          fontWeight="regular"
          data-locator="billing-payment-details"
          className="elem-mb-XS"
        >
          {labels.cardDetailsTitle}
        </BodyCopy>
        {!hideAnchor && (
          <Anchor
            fontSizeVariation="medium"
            underline
            to="/#"
            noLink
            onClick={this.setFormToEditState}
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
    const selectedCard = onFileCardKey ? getSelectedCard({ creditCardList, onFileCardKey }) : '';
    const { editMode } = this.state;
    const { dispatch } = this.props;
    const billingPaymentFormWidthCol = { large: 3, small: 4, medium: 4 };
    const cvvCodeColWidth = { large: 3, small: 2, medium: 4 };
    return (
      <>
        <Heading
          component="h3"
          variant="listMenu"
          className="cardDropdownHeading"
          dataLocator="billing-payment-bilingcreditcardlabel"
        >
          {labels.selectFromCard}
        </Heading>
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
                  dataLocator="billing-payment-method"
                >
                  {labels.paymentMethod}
                </Heading>
                <Row fullBleed>
                  <Col colSize={billingPaymentFormWidthCol} className="billing-payment-card-info">
                    <CardImage
                      card={selectedCard}
                      cardNumber={`${labels.creditCardEnd}${selectedCard.accountNo.slice(-4)}`}
                    />
                  </Col>

                  {selectedCard.ccType !== constants.ACCEPTED_CREDIT_CARDS.PLACE_CARD && (
                    <Col colSize={cvvCodeColWidth} className="position-relative cvvCode">
                      <Field
                        placeholder={labels.cvvCode}
                        name="cvvCode"
                        id="cvvCode"
                        component={TextBox}
                        dataLocator="billing-payment-cvvCode"
                        className="field"
                        showSuccessCheck={false}
                        enableSuccessCheck={false}
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
                      dataLocator="billing-payment-checkbox-field"
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
                        {labels.defaultPayment}
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
                dataLocator="billing-payment-billingAddress"
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
                    dataLocatorPrefix="billing-payment-card-detail"
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
            selectedCard={selectedCard}
            onEditCardFocus={this.onEditCardFocus}
            key="cardEditForm"
            dispatch={dispatch}
            addressForm={this.getCheckoutBillingAddress}
            handleEditFromSubmit={this.handleEditFromSubmit}
            renderCardDetailsHeading={this.renderCardDetailsHeading}
            getAddNewCCForm={this.getAddNewCCForm}
            unsetFormEditState={this.unsetFormEditState}
            labels={labels}
          />
        )}
      </>
    );
  };

  handleEditFromSubmit = data => {
    const formData = data;
    const { updateCardDetail } = this.props;
    formData.onFileAddressKey = formData.address.addressId || '';
    formData.cardType = formData.ccBrand.toUpperCase();
    delete formData.ccType;
    delete formData.ccBrand;
    updateCardDetail(formData);
  };

  onEditCardFocus = () => {
    if (!this.cardNumberCleared) {
      const { dispatch } = this.props;
      this.cardNumberCleared = true;
      dispatch(change(constants.EDIT_FORM_NAME, 'cardNumber', ''));
    }
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
    const { onFileCardKey, labels, cvvCodeRichText } = this.props;
    const { paymentMethodId, orderHasShipping, backLinkPickup } = this.props;
    const { backLinkShipping, nextSubmitText, isPaymentDisabled, showAccordian } = this.props;
    const { editMode } = this.state;
    const creditCardList = getCreditCardList({ cardList });
    return (
      <form name={constants.FORM_NAME} noValidate className={className} onSubmit={handleSubmit}>
        {!isPaymentDisabled && (
          <div>
            <BodyCopy
              fontFamily="primary"
              fontSize="fs26"
              fontWeight="regular"
              data-locator="billing-details"
              className="elem-mb-LRG elem-mt-XL"
            >
              {labels.paymentMethod}
            </BodyCopy>
            <PaymentMethods labels={labels} className="elem-mb-LRG" />
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
            {paymentMethodId === constants.PAYMENT_METHOD_VENMO && (
              <VenmoPaymentButton
                className="venmo-container"
                continueWithText={labels.continueWith}
              />
            )}
          </div>
        )}
        <CheckoutOrderInfo isGuest={isGuest} showAccordian={showAccordian} />
        <CheckoutFooter
          hideBackLink
          disableNext={editMode}
          backLinkHandler={() => utility.routeToPage(CHECKOUT_ROUTES.shippingPage)}
          nextButtonText={nextSubmitText}
          backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
          showVenmoSubmit={paymentMethodId === constants.PAYMENT_METHOD_VENMO}
          continueWithText={labels.continueWith}
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
