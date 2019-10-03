import React from 'react';
import { shallow } from 'enzyme';
import {
  GuestBillingContainerVanilla,
  mapDispatchToProps,
} from '../container/GuestBillingForm.container';

describe('BillingPageContainer', () => {
  it('should render correctly', () => {
    const props = {
      cardType: null,
      syncErrors: null,
      cvvCodeRichText: '',
      labels: {},
      paymentMethodId: null,
      shippingAddress: null,
    };
    const tree = shallow(<GuestBillingContainerVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if billing data is present', () => {
    const props = {
      cardType: null,
      syncErrors: null,
      cvvCodeRichText: '',
      labels: {},
      paymentMethodId: null,
      shippingAddress: null,
      billingData: {
        billing: {},
        address: {},
      },
      submitBilling: jest.fn(),
      setVenmoProgress: jest.fn(),
    };
    const data = {
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        firstName: '',
        lastName: '',
        state: '',
        zipCode: '',
        onFileAddressKey: '',
        onFileAddressId: '',
      },
      sameAsShipping: true,
    };
    const tree = shallow(<GuestBillingContainerVanilla {...props} />);
    tree.instance().submitBillingData(data);
    expect(tree).toMatchSnapshot();
  });
  it('should call mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.submitBilling();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
