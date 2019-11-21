import React from 'react';
import { shallow } from 'enzyme';
import GuestUserInfo from '../view/GuestUserInfo';

describe('GuestUserInfo component', () => {
  it('GuestUserInfo component renders correctly to match snapshot', () => {
    const props = {
      createAccount: 'createAccount',
      login: 'login',
      openOverlay: jest.fn(),
      triggerLoginCreateAccount: true,
      onLinkClick: jest.fn(),
      userNameClick: true,
    };
    const component = shallow(<GuestUserInfo {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('GuestUserInfo component renders correctly to match snapshot', () => {
    const props = {
      createAccount: 'createAccount',
      login: 'login',
      openOverlay: jest.fn(),
      triggerLoginCreateAccount: false,
      onLinkClick: jest.fn(),
      userNameClick: true,
    };
    const component = shallow(<GuestUserInfo {...props} />);
    expect(component).toMatchSnapshot();
  });
});
