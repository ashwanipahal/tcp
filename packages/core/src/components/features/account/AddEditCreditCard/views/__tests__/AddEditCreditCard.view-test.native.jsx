import React from 'react';
import { shallow } from 'enzyme';
import { AddEditCreditCard } from '../AddEditCreditCard.view.native';

describe('AddEditCreditCard component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      selectedCard: {
        billingAddressId: 150786,
      },
    };
    const component = shallow(<AddEditCreditCard {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with error message', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      isEdit: true,
      errorMessage: 'There is some error',
      selectedCard: {
        billingAddressId: 150786,
      },
    };
    const component = shallow(<AddEditCreditCard {...props} />);
    expect(component).toMatchSnapshot();
  });
});
