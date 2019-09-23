import React from 'react';
import { reduxForm } from 'redux-form';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import constants from '../container/CreditCard.constants';
import Button from '../../../../../../common/atoms/Button'
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
} from './BillingPaymentForm.view.util';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import CONSTANTS from '../../../Checkout.constants';

export class BillingPaymentForm extends React.PureComponent {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.state = {
      addNewCCState: false,
    };
  }

  onAddNewCCClick = () => {
    this.setState({ addNewCCState: true });
  };

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

  getAddNewCCForm = () => {
    const {
      cvvCodeRichText,
      cardType,
      labels,
      syncErrorsObj,
      isGuest,
      isSaveToAccountChecked,
      dispatch,
      billingData
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
        isSaveToAccountChecked={isSaveToAccountChecked}
        formName={constants.FORM_NAME}
        dispatch={dispatch}
        isExpirationRequired={isExpirationRequired}
        billingData={billingData}
      />
    );
  };

  addNewBillingInfoForm = () => {
    const { onFileCardKey, labels, cardList } = this.props;
    const { addNewCCState } = this.state;
    const creditCardList = getCreditCardList({ cardList });
    return (
      <>
        {creditCardList &&
          creditCardList.size > 0 && (
            <Button
              color="white"
              fill="BLUE"
              buttonVariation="variable-width"
              text="Add new CC"
              fontSize="fs13"
              fontWeight="extrabold"
              mobileFontFamily="secondary"
              onPress={this.onAddNewCCClick}
            />
          )}
        {this.getAddNewCCForm()}
        {this.getCheckoutBillingAddress({ ...this.props, creditCardList, addNewCCState })}
      </>
    );
  };


  getCreditListView = ({ labels, cvvCodeRichText, creditCardList, onFileCardKey }) => {
    return (
      <>
        {creditCardList &&
          creditCardList.size > 0 && (
            <Button
              color="white"
              fill="BLUE"
              buttonVariation="variable-width"
              text="Add new CC"
              fontSize="fs13"
              fontWeight="extrabold"
              mobileFontFamily="secondary"
              onPress={this.onAddNewCCClick}
            />
          )}
        : (
        this.getAddNewCCForm()
      )}
        {this.getCheckoutBillingAddress()}
      </>
    );
  };

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
      isPaymentDisabled,
      onSubmit,
      navigation
    } = this.props;
    const creditCardList = getCreditCardList({ cardList });
    return (
      <>
        <BodyCopy
          mobileFontFamily="primary"
          fontSize="fs26"
          fontWeight="regular"
          data-locator="billing-details"
          text={labels.lbl_billing_paymentMethodTitle}
        />
        {paymentMethodId === constants.PAYMENT_METHOD_CREDIT_CARD ? (
          this.getCreditCardWrapper({
            labels,
            creditCardList,
            cvvCodeRichText,
            onFileCardKey,
          })
        ) :
          (
            null
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
    )
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

