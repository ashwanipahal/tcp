import React from 'react';
import { shallow } from 'enzyme';
import AddGiftCardComponent from '../AddGiftCard.view';

describe('Add gift card component', () => {
  it('should render component correctly', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      addGiftCardResponse: 'success',
      onAddGiftCardClick: jest.fn(),
    };
    const component = shallow(<AddGiftCardComponent {...props} />);
    expect(component).toMatchSnapshot();
  });
});
