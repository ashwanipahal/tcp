import React from 'react';
import { shallow } from 'enzyme';
import GiftServices from '../GiftServices.container';

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
      cartOrderItems: [
        {
          productInfo: { size: 'youth' },
          itemInfo: { itemId: '8067436100' },
          miscInfo: { storeId: '11075' },
        },
      ],
    };
    const component = shallow(<GiftServices {...props} />);
    expect(component).toMatchSnapshot();
  });
});
