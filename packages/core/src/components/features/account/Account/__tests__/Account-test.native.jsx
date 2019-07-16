import { shallow } from 'enzyme';
import React from 'react';
import AccountNative from '../container/Account.native';

describe('AccountNative View', () => {
  it('should render AccountNative Correctly', () => {
    const props = {
      component: 'addressBookMobile',
    };
    const tree = shallow(<AccountNative {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
