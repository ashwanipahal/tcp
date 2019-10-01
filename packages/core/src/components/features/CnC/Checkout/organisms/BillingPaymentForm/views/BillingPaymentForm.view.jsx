import React from 'react';
import { reduxForm, Field, change } from 'redux-form';
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
import CardImage from '../../../../../../common/molecules/Card/views/CardImage';
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
        optionsMap={options}
        clickHandler={onClickHandler}
        activeValue={activeValue}
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
      userAddresses,
      labels,
      cardList,
      isGuest,
      orderHasShipping,
      addressLabels,
      dispatch,
      shippingAddress,
      isSameAsShippingChecked,
      isEditFormSameAsShippingChecked = false,
      editFormSelectedOnFileAddressId,
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
        isSameAsShippingChecked={
          editMode ? isEditFormSameAsShippingChecked : isSameAsShippingChecked
        }
        labels={labels}
        editMode={editMode}
        billingData={billingData}
        userAddresses={userAddresses}
        selectedOnFileAddressId={
          editMode ? editFormSelectedOnFileAddressId : selectedOnFileAddressId
        }
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
  getAddNewCCForm = ({ onCardFocus, editMode } = {}) => {
    const {
      cvvCodeRichText,
      cardType,
      labels,
      syncErrorsObj,
      isGuest,
      isSaveToAccountChecked,
      dispatch,
      creditFieldLabels,
    } = this.props;
    let cvvError;
    /* istanbul ignore else */
    if (syncErrorsObj) {
      cvvError = syncErrorsObj.syncError.cvvCode;
    }
    const isExpirationRequired = getExpirationRequiredFlag({ cardType });

    return (
      <AddNewCCForm
        cvvInfo={getCvvInfo({ cvvCodeRichText })}
        cardType={cardType}
        cvvError={cvvError}
        labels={labels}
        isGuest={isGuest}
        onCardFocus={onCardFocus}
        editMode={editMode}
        isSaveToAccountChecked={isSaveToAccountChecked}
        formName={constants.FORM_NAME}
        dispatch={dispatch}
        isExpirationRequired={isExpirationRequired}
        creditFieldLabels={creditFieldLabels}
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
    e.preventDefault();
    this.setState({ editMode: false });
  };

  getCartEditForm = React.memo(({ selectedCard }) => {
    const AddressForm = this.getCheckoutBillingAddress;
    const { accountNo, ccBrand, ccType, expMonth, expYear, addressDetails: address } = selectedCard;
    const that = this;
    class FormView extends React.PureComponent {
      render() {
        const { handleSubmit } = this.props;
        return (
          <form name={constants.EDIT_FORM_NAME} noValidate onSubmit={handleSubmit}>
            {that.renderCardDetailsHeading({ hideAnchor: true })}
            {that.getAddNewCCForm({
              onCardFocus: that.onEditCardFocus,
              editMode: true,
            })}
            <AddressForm editMode key="123" />
            <button type="submit">Save</button>
            <button type="button" onClick={that.unsetFormEditState}>
              Cancel
            </button>
          </form>
        );
      }
    }

    const CartEditForm = reduxForm({
      form: constants.EDIT_FORM_NAME, // a unique identifier for this form
      enableReinitialize: true,
    })(FormView);

    return (
      <CartEditForm
        onSubmit={this.handleEditFromSubmit}
        initialValues={{
          cardNumber: accountNo,
          expMonth: expMonth.trim(),
          expYear,
          ccBrand,
          ccType,
          address,
        }}
      />
    );
  });

  handleEditFromSubmit = data => {
    console.log({ data });
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
    const CartEditFrom = this.getCartEditForm;
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
                  <Col
                    colSize={{
                      large: 3,
                      small: 4,
                      medium: 4,
                    }}
                    className="billing-payment-card-info"
                  >
                    <CardImage
                      card={selectedCard}
                      cardNumber={`${labels.creditCardEnd}${selectedCard.accountNo.slice(-4)}`}
                    />
                  </Col>

                  {selectedCard.ccType !== constants.ACCEPTED_CREDIT_CARDS.PLACE_CARD && (
                    <Col
                      colSize={{
                        large: 3,
                        small: 2,
                        medium: 4,
                      }}
                      className="position-relative cvvCode"
                    >
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
          <CartEditFrom selectedCard={selectedCard} key="cardEditForm" />
        )}
      </>
    );
  };

  onEditCardFocus = e => {
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
    const {
      className,
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
      isPaymentDisabled,
      showAccordian,
      isGuest,
    } = this.props;
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
              <VenmoPaymentButton className="venmo-container" />
            )}
          </div>
        )}
        <CheckoutOrderInfo isGuest={isGuest} showAccordian={showAccordian} />
        <CheckoutFooter
          hideBackLink
          backLinkHandler={() => utility.routeToPage(CHECKOUT_ROUTES.shippingPage)}
          nextButtonText={nextSubmitText}
          backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
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
