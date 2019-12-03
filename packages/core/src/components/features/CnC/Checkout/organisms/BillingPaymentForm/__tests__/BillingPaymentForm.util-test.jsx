import {
  onEditCardFocus,
  setFormToEditState,
  unsetPaymentFormEditState,
  handleBillingFormSubmit,
  getPaymentMethods,
} from '../views/BillingPaymentForm.util';

describe('BillingPaymentForm Util', () => {
  const scope = {
    props: {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      labels: { cardEditUnSavedError: 'error' },
      scrollView: { scrollTo: jest.fn() },
    },
    setState: jest.fn(),
    ediCardErrorRef: { current: { scrollIntoView: jest.fn() } },
    state: { editMode: true },
  };
  const labels = {
    payPal: 'Paypal',
    venmo: 'Venmo',
    creditCard: 'Credit Card',
  };
  it('should call onEditCardFocus', () => {
    onEditCardFocus(scope);
    expect(scope.props.dispatch).toBeCalled();
  });
  it('should call setFormToEditState', () => {
    setFormToEditState(scope, { preventDefault: jest.fn() });
    expect(scope.setState).toBeCalled();
  });
  it('#unsetPaymentFormEditState', () => {
    unsetPaymentFormEditState(scope, { preventDefault: jest.fn() });
    expect(scope.setState).toBeCalled();
  });
  it('#handleBillingFormSubmit with isMobile false and edit mode true', () => {
    handleBillingFormSubmit(scope, { preventDefault: jest.fn() }, false);
    expect(scope.ediCardErrorRef.current.scrollIntoView).toBeCalled();
  });
  it('#handleBillingFormSubmit with isMobile true', () => {
    handleBillingFormSubmit(scope, { preventDefault: jest.fn() }, true);
    expect(scope.ediCardErrorRef.current.scrollIntoView).toBeCalled();
  });
  it('#handleBillingFormSubmit with editMode false', () => {
    scope.state.editMode = false;
    handleBillingFormSubmit(scope, { preventDefault: jest.fn() }, false);
    expect(scope.props.handleSubmit).toBeCalled();
  });
  it('#onAddCreditCardClick called', () => {
    scope.state.state = true;
    expect(scope.state.state).toBeTruthy();
  });
  it('#getPaymentMethods called without Venmo', () => {
    const response = [
      { id: 'creditCard', displayName: labels.creditCard },
      { id: 'payPal', displayName: labels.payPal },
    ];
    expect(getPaymentMethods(labels, false)).toEqual(response);
  });
  it('#getPaymentMethods called with Venmo', () => {
    const response = [
      { id: 'creditCard', displayName: labels.creditCard },
      { id: 'payPal', displayName: labels.payPal },
      { id: 'venmo', displayName: labels.venmo },
    ];
    expect(getPaymentMethods(labels, true)).toEqual(response);
  });
});
