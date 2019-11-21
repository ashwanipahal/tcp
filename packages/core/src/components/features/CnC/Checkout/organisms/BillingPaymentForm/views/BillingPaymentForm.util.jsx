import { change, reset } from 'redux-form';
import constants from '../container/CreditCard.constants';
import { onAddNewCreditCardUpdate } from './BillingPaymentForm.view.util';

const onEditCardFocus = scope => {
  const { dispatch } = scope.props;
  dispatch(change(constants.EDIT_FORM_NAME, 'cardNumber', ''));
};

const setFormToEditState = (scope, e) => {
  e.preventDefault();
  scope.setState({ editMode: true });
};

const unsetPaymentFormEditState = (scope, e) => {
  /* istanbul ignore else */
  if (e) {
    e.preventDefault();
  }
  const { dispatch } = scope.props;
  dispatch(reset(constants.EDIT_FORM_NAME));
  scope.setState({ editMode: false, editModeSubmissionError: '' });
};

const handleBillingFormSubmit = (scope, e, isMobile) => {
  const { handleSubmit, labels, scrollView } = scope.props;
  const { editMode } = scope.state;
  if (editMode) {
    /* istanbul ignore else */
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    scope.setState({ editModeSubmissionError: labels.cardEditUnSavedError });
    return isMobile
      ? scrollView.scrollTo({ x: 0, y: 1300, animated: true })
      : scope.ediCardErrorRef.current.scrollIntoView(false);
  }
  return handleSubmit(e);
};

/**
 * @function onAddNewCreditCardClick
 * @description sets the add new credit card state as true
 */
const onAddNewCreditCardClick = scope => {
  const { dispatch } = scope.props;
  scope.setState({ addNewCCState: true });
  onAddNewCreditCardUpdate(dispatch);
};

const getPaymentMethods = labels => [
  { id: constants.PAYMENT_METHOD_CREDIT_CARD, displayName: labels.creditCard },
  { id: constants.PAYMENT_METHOD_PAY_PAL, displayName: labels.payPal },
  { id: constants.PAYMENT_METHOD_VENMO, displayName: labels.venmo },
];

/**
 * @function onAddCreditCardClick
 * @description sets the add new credit card state as true
 */
const onAddCreditCardClick = scope => {
  const { dispatch } = scope.props;
  scope.setState({ addNewCCState: true });
  dispatch(change(constants.FORM_NAME, 'cardNumber', ''));
  dispatch(change(constants.FORM_NAME, 'expMonth', ''));
  dispatch(change(constants.FORM_NAME, 'expYear', ''));
  dispatch(change(constants.FORM_NAME, 'cvvCode', ''));
};

/**
 * @function onCCDropDownChange
 * @description sets the add new credit card state to false if it is true
 */
const onCCDropDownChange = scope => {
  const { addNewCCState } = scope.state;
  if (addNewCCState) {
    scope.setState({ addNewCCState: false });
  }
  const { dispatch } = scope.props;
  dispatch(change(constants.FORM_NAME, 'cvvCode', ''));
};

export {
  onEditCardFocus,
  setFormToEditState,
  unsetPaymentFormEditState,
  handleBillingFormSubmit,
  onAddNewCreditCardClick,
  getPaymentMethods,
  onAddCreditCardClick,
  onCCDropDownChange,
};
