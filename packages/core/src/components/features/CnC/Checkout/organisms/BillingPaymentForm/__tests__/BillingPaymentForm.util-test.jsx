import {
  onEditCardFocus,
  setFormToEditState,
  unsetPaymentFormEditState,
  handleBillingFormSubmit,
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
});
