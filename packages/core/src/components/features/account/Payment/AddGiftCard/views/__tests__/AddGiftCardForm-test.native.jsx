import React from 'react';
import { shallow } from 'enzyme';
import { AddGiftCardFormVanilla } from '../AddGiftCardForm.native';

describe('Add gift card form component', () => {
  const props = {
    labels: {
      paymentGC: {},
      common: {},
    },
    change: jest.fn(),
    handleSubmit: jest.fn(),
  };

  it('should render component correctly', () => {
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('render error message', () => {
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    component.setProps({ addGiftCardResponse: 'foo' });
    expect(component).toMatchSnapshot();
  });
});
