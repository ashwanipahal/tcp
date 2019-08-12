import React from 'react';
import { shallow } from 'enzyme';
import PaymentItem from '../PaymentItem.view.native';

describe('PaymentItem component', () => {
  let component;
  let props = {
    paymentInfo: {
      icon: '',
      subText: '',
      text: 'You have not added a credit card yet.',
      title: 'Default Credit Card',
      variation: 'Add',
    },
  };
  component = shallow(<PaymentItem {...props} />);
  beforeEach(() => {
    component = shallow(<PaymentItem {...props} />);
  });

  it('should render correctly', () => {
    component = shallow(<PaymentItem {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with values', () => {
    props = {
      paymentInfo: {
        icon: 4,
        subText: 'expires 1/2021',
        text: 'ending in 1111',
        title: 'Default Credit Card',
        variation: 'Edit',
      },
    };
    component = shallow(<PaymentItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
