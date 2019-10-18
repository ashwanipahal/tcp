import React from 'react';
import PropTypes from 'prop-types';
import { Field, change } from 'redux-form';
import CreditCardFields from '../../../../../../common/molecules/CreditCardFields';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import { getCreditCardExpirationOptionMap } from '../../../../../account/AddEditCreditCard/container/AddEditCreditCard.utils';
import { SaveToAccWrapper, DefaultPaymentWrapper } from '../styles/AddNewCCForm.styles.native';

/**
 *
 *
 * @class AddNewCCForm
 * @extends {PureComponent}
 * @description view component to render credit card form .
 */
class AddNewCCForm extends React.PureComponent {
  static propTypes = {
    cvvInfo: PropTypes.func.isRequired,
    cvvError: PropTypes.string,
    cardType: PropTypes.string,
    labels: PropTypes.shape({}),
    isGuest: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    formName: PropTypes.string.isRequired,
    cardList: PropTypes.shape([{}]),
    isSaveToAccountChecked: PropTypes.bool,
    isExpirationRequired: PropTypes.bool,
    billingData: PropTypes.shape({ billing: {}, address: {} }),
    addNewCCState: PropTypes.bool,
    creditFieldLabels: PropTypes.shape({}),
    editMode: PropTypes.bool,
    isSameAsShippingChecked: PropTypes.bool,
    dto: PropTypes.shape({
      accountNo: PropTypes.string,
      expMonth: PropTypes.string,
      expYear: PropTypes.string,
    }),
    selectedCard: PropTypes.shape({
      accountNo: PropTypes.string,
      expMonth: PropTypes.string,
      expYear: PropTypes.string,
      cvvCode: PropTypes.string,
    }),
  };

  static defaultProps = {
    cvvError: null,
    cardType: null,
    labels: {},
    isGuest: null,
    cardList: null,
    isSaveToAccountChecked: true,
    isExpirationRequired: true,
    billingData: null,
    addNewCCState: false,
    creditFieldLabels: {},
    editMode: false,
    isSameAsShippingChecked: false,
    dto: {},
    selectedCard: null,
  };

  constructor(props) {
    super(props);
    this.creditCardExpirationOptionMap = getCreditCardExpirationOptionMap();
  }

  /**
   * @function getCreditLabelValues
   * @description gets the labels for credit card fields
   */
  getCreditLabelValues = () => {
    const { creditFieldLabels } = this.props;
    return {
      creditCardNumber: creditFieldLabels.cardNumber,
      expMonth: creditFieldLabels.expMonth,
      expYear: creditFieldLabels.expYear,
      cvvCode: creditFieldLabels.cvvCode,
      cameraText: creditFieldLabels.cameraText,
    };
  };

  /**
   * @function onSaveToAccountChange
   * @description called when save to account checkbox is checked
   */
  onSaveToAccountChange = (e, value) => {
    const { dispatch, formName } = this.props;
    /* istanbul ignore else */
    if (!value && dispatch) {
      dispatch(change(formName, 'defaultPayment', value));
    }
  };

  /**
   * @function renderSaveToAccountOptions
   * @description renders the save to account and set default payment method checkboxes
   */
  renderSaveToAccountOptions = () => {
    const { labels, cardList, isSaveToAccountChecked } = this.props;
    return (
      <>
        <SaveToAccWrapper>
          <Field
            showDefaultCheckbox={false}
            component={InputCheckbox}
            name="saveToAccount"
            onChange={this.onSaveToAccountChange}
            fontSize="fs16"
            rightText={labels.saveToAccount}
            dataLocator="saveCardChkBox"
          />
        </SaveToAccWrapper>
        <DefaultPaymentWrapper>
          <Field
            showDefaultCheckbox={false}
            component={InputCheckbox}
            name="defaultPayment"
            disabled={!cardList && !isSaveToAccountChecked}
            fontSize="fs16"
            rightText={labels.defaultPayment}
            dataLocator="defaultPaymentChkBox"
          />
        </DefaultPaymentWrapper>
      </>
    );
  };

  /**
   * @function updateExpiryDate
   * @description called when the expiry date and year checkbox value is changed
   */
  updateExpiryDate = (month, year) => {
    const { dispatch, formName } = this.props;

    // Setting form value to take dropdown values.
    dispatch(change(formName, 'expYear', year));
    dispatch(change(formName, 'expMonth', month));
  };

  /**
   * @function getExpData
   * @description fetches the initial values for expiry date and year checkboxes
   */
  getExpData = () => {
    const { billingData, addNewCCState } = this.props;
    let expMonth;
    let expYear;
    if (billingData && billingData.billing && !addNewCCState) {
      ({
        billing: { expMonth, expYear },
      } = billingData);
      return { expMonth, expYear };
    }
    return { expMonth, expYear };
  };

  /**
   * @function updateCardDetails
   * @description called when scan any card through camera scanner
   */
  updateCardDetails = (cardNumber, year, month, cvvCode) => {
    const { dispatch, formName } = this.props;
    dispatch(change(formName, 'cardNumber', cardNumber));
    dispatch(change(formName, 'expYear', year));
    dispatch(change(formName, 'expMonth', month));
    dispatch(change(formName, 'cvvCode', cvvCode));
  };

  /**
   * @function render
   * @description render method to be called of component
   */
  render() {
    const {
      cvvInfo,
      cardType,
      cvvError,
      isGuest,
      isExpirationRequired,
      editMode,
      isSameAsShippingChecked,
      selectedCard,
    } = this.props;
    const { expMonth, expYear } = this.getExpData();
    return (
      <>
        <CreditCardFields
          cvvInfo={cvvInfo}
          variation="secondary"
          cardType={cardType}
          cvvError={cvvError}
          creditFieldLabels={this.getCreditLabelValues()}
          isExpirationRequired={isExpirationRequired}
          expMonthOptionsMap={this.creditCardExpirationOptionMap.monthsMap}
          expYearOptionsMap={this.creditCardExpirationOptionMap.yearsMap}
          updateExpiryDate={this.updateExpiryDate}
          updateCardDetails={this.updateCardDetails}
          selectedExpYear={expYear}
          selectedExpMonth={expMonth}
          cameraIcon
          showCvv={!editMode}
          isSameAsShippingChecked={isSameAsShippingChecked}
          selectedCard={selectedCard}
          isEdit={editMode}
          dto={selectedCard}
        />
        {!isGuest && !editMode && this.renderSaveToAccountOptions()}
      </>
    );
  }
}

export default AddNewCCForm;
