import React from 'react';
import { shallow } from 'enzyme';
import GiftServices from '../GiftServices.view';

describe('GiftServices component', () => {
  it('renders correctly', () => {
    const props = {
      isGiftServicesChecked: true,
      initialValues: {
        message: 'test',
        optionId: '123234',
      },
      labels: {
        giftServices: 'giftServices',
        details: 'details',
        addAGift: 'addAGift',
        selectBrand: 'selectBrand',
        addMessage: 'addMessage',
        charLimit: 'charLimit',
      },
      giftWrapOptions: {},
    };
    const component = shallow(<GiftServices {...props} />);
    expect(component).toMatchSnapshot();
  });
});
