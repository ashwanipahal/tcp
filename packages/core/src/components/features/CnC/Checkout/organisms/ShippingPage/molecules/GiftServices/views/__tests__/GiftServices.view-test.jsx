import React from 'react';
import { shallow } from 'enzyme';
import { getProductDetails } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import { GiftServicesVanilla } from '../GiftServices.view';

jest.mock(
  '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors',
  () => ({
    getProductDetails: jest.fn(),
  })
);

describe('GiftServices component', () => {
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
    giftWrapOptions: JSON.stringify({
      giftOptions: [
        { itemBrand: 'ALL', name: 'abc', price: '0.00', longDescription: 'abcde' },
        { itemBrand: 'ALL', name: 'abcd', price: '0.00', longDescription: 'abcde' },
        { itemBrand: 'ALL', name: 'abc', price: '5.00', longDescription: 'abcde' },
      ],
    }),
    cartOrderItems: [{}],
    setClickAnalyticsDataGC: jest.fn(),
    dispatch: jest.fn(),
  };

  it('renders correctly', () => {
    getProductDetails.mockImplementation(() => {
      return {
        itemInfo: {
          itemId: '1234',
          color: 'yellow',
          name: 'abcd',
          offerPrice: '5',
          size: 'SM',
          listPrice: '45',
        },
        productInfo: { skuId: '6787678', upc: '3435', productPartNumber: '8234782346' },
      };
    });
    const component = shallow(<GiftServicesVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should click handleChange Event', () => {
    const component = shallow(<GiftServicesVanilla {...props} />);
    component.setState({
      isChecked: false,
      orderItems: {},
    });
    component.instance().handleChange();
    expect(component.state('isChecked')).toEqual(true);
  });
  it('should click giftServiceChanged Event', () => {
    const component = shallow(<GiftServicesVanilla {...props} />);
    component.instance().giftServiceChanged('', 'test');
    expect(props.dispatch).toBeCalled();
  });
  it('should click toggleDetailsModal Event', () => {
    const component = shallow(<GiftServicesVanilla {...props} />);
    component.setState({
      detailStatus: true,
    });
    component.instance().toggleDetailsModal();
    expect(component.state('detailStatus')).toEqual(false);
  });
  it('should call getActiveTitle if value is same as selected option', () => {
    const options = [
      {
        value: 'abcd',
        title: 'first',
      },
    ];
    const component = shallow(<GiftServicesVanilla {...props} />);
    expect(component.instance().getActiveTitle(options, 'abcd')).toEqual('first');
  });
  it('should call getActiveTitle if value is different as selected option', () => {
    const options = [
      {
        value: 'abcd',
        title: 'first',
      },
      {
        value: 'standard',
        title: 'first',
      },
    ];
    const component = shallow(<GiftServicesVanilla {...props} />);
    expect(component.instance().getActiveTitle(options, 'abcde')).toEqual('first');
  });
});
