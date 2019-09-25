import React from 'react';
import { shallow } from 'enzyme';
import { GuestBillingFormVanilla } from '../views/GuestBillingForm.view';

describe('GuestBillingFormVanilla', () => {
  it('should render correctly', () => {
    const props = {
      shippingAddress: null,
      cvvCodeRichText: '',
      cardType: null,
      syncErrorsObj: null,
      labels: {},
      paymentMethodId: null,
      handleSubmit: jest.fn(),
    };
    const tree = shallow(<GuestBillingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly when props change', () => {
    const mockedDispatch = jest.fn();
    const props = {
      shippingAddress: null,
      cvvCodeRichText: '',
      cardType: null,
      syncErrorsObj: { syncError: { cvvCode: 'error' } },
      labels: {},
      paymentMethodId: 'creditCard',
      dispatch: mockedDispatch,
      handleSubmit: jest.fn(),
    };
    const tree = shallow(<GuestBillingFormVanilla {...props} />);
    tree.setProps({ cardType: 'VISA' });
    expect(mockedDispatch).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });
});
