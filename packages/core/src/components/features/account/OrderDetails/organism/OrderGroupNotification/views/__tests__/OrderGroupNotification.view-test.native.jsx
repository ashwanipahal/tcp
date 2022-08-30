import React from 'react';
import { shallow } from 'enzyme';
import OrderGroupNotification from '../OrderGroupNotification.view';

describe('Order GroupHeader component', () => {
  it('should renders correctly', () => {
    const props = { label: 'PurchaseItems', message: '1' };
    const component = shallow(<OrderGroupNotification {...props} />);
    expect(component).toMatchSnapshot();
  });
});
