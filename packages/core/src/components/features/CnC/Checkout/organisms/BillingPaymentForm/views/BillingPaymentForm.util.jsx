import { change, reset } from 'redux-form';
import constants from '../container/CreditCard.constants';

const onEditCardFocus = scope => {
  const { dispatch } = scope.props;
  dispatch(change(constants.EDIT_FORM_NAME, 'cardNumber', ''));
};

const setFormToEditState = (scope, e) => {
  e.preventDefault();
  scope.setState({ editMode: true });
};

const unsetPaymentFormEditState = (scope, e) => {
  if (e) {
    e.preventDefault();
  }
  const { dispatch } = scope.props;
  dispatch(reset(constants.EDIT_FORM_NAME));
  scope.setState({ editMode: false, editModeSubmissionError: '' });
};

const handleBillingFormSubmit = (scope, e, isMobile) => {
  const { handleSubmit, labels, onSubmit, scrollView } = scope.props;
  const { editMode } = scope.state;
  if (editMode) {
    scope.setState({ editModeSubmissionError: labels.cardEditUnSavedError });
    return isMobile
      ? scrollView.scrollTo({ x: 0, y: 1300, animated: true })
      : scope.ediCardErrorRef.current.scrollIntoView(false);
  }
  return isMobile ? handleSubmit(onSubmit) : handleSubmit(e);
};

export { onEditCardFocus, setFormToEditState, unsetPaymentFormEditState, handleBillingFormSubmit };
