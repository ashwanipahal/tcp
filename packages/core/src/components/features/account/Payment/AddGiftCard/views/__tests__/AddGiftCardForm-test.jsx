import React from 'react';
import { shallow } from 'enzyme';
import { AddGiftCardFormVanilla } from '../AddGiftCardForm';

describe('Add gift card form component', () => {
  const props = {
    labels: {},
    onAddGiftCardClick: jest.fn(),
    handleSubmit: jest.fn(),
  };

  it('should render component correctly', () => {
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('simulate add gift card button', () => {
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    component.instance().handleSubmit({
      cardPin: 'foo',
      giftCardNumber: 'foo',
    });
    expect(props.onAddGiftCardClick).toHaveBeenCalled();
  });
});
