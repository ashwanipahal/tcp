import React from 'react';
import { shallow } from 'enzyme';
import { AddGiftCardVanilla } from '../AddGiftCard.view';

describe('Add gift card component', () => {
  it('should render component correctly if add gift is successful', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      addGiftCardResponse: 'success',
      onAddGiftCardClick: jest.fn(),
    };
    const component = shallow(<AddGiftCardVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render component correctly if add gift is failure', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      addGiftCardResponse: 'failure',
      onAddGiftCardClick: jest.fn(),
    };
    const component = shallow(<AddGiftCardVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
