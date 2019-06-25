import { shallow } from 'enzyme';
import React from 'react';
import { Account } from '../container/Account';

describe('Account View', () => {
  it('should render Account Correctly', () => {
    const router = {
      query: {
        id: 'accountOverview',
      },
    };
    const tree = shallow(<Account router={router} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render AddressBook Correctly', () => {
    const router = {
      query: {
        id: 'accountOverview',
      },
    };
    const tree = shallow(<Account router={router} />);
    tree.setProps({ router: { query: { id: 'addressBook' } } });
    expect(tree).toMatchSnapshot();
  });
});
