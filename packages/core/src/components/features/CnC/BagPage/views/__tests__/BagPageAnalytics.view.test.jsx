import React from 'react';
import { shallow } from 'enzyme';
import BagPageAnalytics from '../BagPageAnalytics.view';

describe('BagPageAnalytics component', () => {
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
    const component = shallow(<BagPageAnalytics {...props} />);
    expect(component).toMatchSnapshot();
  });
});
