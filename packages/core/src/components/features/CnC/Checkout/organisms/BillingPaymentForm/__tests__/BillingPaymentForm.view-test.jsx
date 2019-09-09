import React from 'react';
import { shallow } from 'enzyme';
import { BillingPaymentFormVanilla } from '../views/BillingPaymentForm.view';

describe('ButtonList component', () => {
  const props = {
    className: '',
    onFileCardKey: '',
    isMobile: false,
    cvvCodeRichText: null,
    orderHasShipping: false,
    isGuest: false,
    handleSubmit: jest.fn(),
    cardList: {},
    labels: {},
    paymentMethodId: '',
    backLinkPickup: '',
    backLinkShipping: '',
    nextSubmitText: '',
  };

  it('renders correctly without props', () => {
    const component = shallow(<BillingPaymentFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
