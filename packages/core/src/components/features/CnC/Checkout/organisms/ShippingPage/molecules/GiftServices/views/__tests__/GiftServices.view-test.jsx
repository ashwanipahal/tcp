import React from 'react';
import { shallow } from 'enzyme';
import { GiftServicesVanilla } from '../GiftServices.view';

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
    giftWrapOptions: '{}',
    cartOrderItems: [],
    setClickAnalyticsDataGC: jest.fn(),
    dispatch: jest.fn(),
  };

  it('renders correctly', () => {
    const component = shallow(<GiftServicesVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should click handleChange Event', () => {
    const component = shallow(<GiftServicesVanilla {...props} />);
    component.setState({
      isChecked: true,
      orderItems: {},
    });
    component.instance().handleChange();
    expect(component.state('isChecked')).toEqual(false);
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
});
