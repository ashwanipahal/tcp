import React from 'react';
import { shallow } from 'enzyme';
import { VenmoConfirmationVanilla } from '../views/VenmoConfirmation.view';

describe('VenmoConfirmation component', () => {
  const props = {
    labels: {
      lbl_venmo_confirmation_message:
        'If your order ships after 10 days, a second authorization will appear on your card, however you will only be charged once.',
      lbl_venmo_payment: 'Payment Method',
      lbl_venmo_logo: 'Venmo Logo',
    },
    className: '',
  };

  it('renders correctly without props', () => {
    const component = shallow(<VenmoConfirmationVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
