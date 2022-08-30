import React from 'react';
import { shallow } from 'enzyme';
import LoggedInUserInfo from '../view/LoggedInUserInfo';

describe('LoggedInUserInfo component', () => {
  it('LoggedInUserInfo component renders correctly to match snapshot', () => {
    const props = {
      mainId: 'accountDrawer',
      userName: 'vijayendrakumarsingh',
      userPoints: '21',
      userRewards: '5.51',
      openOverlay: jest.fn(),
      userNameClick: true,
      onLinkClick: jest.fn(),
      isDrawer: false,
    };
    const component = shallow(<LoggedInUserInfo {...props} />);
    expect(component).toMatchSnapshot();
  });
});
