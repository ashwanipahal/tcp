import React from 'react';
import { shallow } from 'enzyme';
import { GuestBillingContainerVanilla } from '../container/GuestBillingForm.container';

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
});
