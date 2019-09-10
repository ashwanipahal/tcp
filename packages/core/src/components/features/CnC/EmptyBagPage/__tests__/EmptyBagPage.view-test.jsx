import React from 'react';
// eslint-disable-next-line import/no-unresolved
import Router from 'next/router';
import { shallow } from 'enzyme';

import { EmptyBagPageVanilla } from '../views/EmptyBagPage.view';

jest.mock('next/router', () => ({ push: jest.fn() }));

describe('EmptyBagPage component with true', () => {
  it('should renders correctly with true', () => {
    const props = {
      isUserLoggedIn: true,
      className: '',
      bagLabels: {
        guestUserMsg: '',
        login: '',
        shopNow: '',
        loggedInMsg: '',
      },
    };
    const component = shallow(<EmptyBagPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
describe('EmptyBagPage component with false', () => {
  it('should renders correctly with false', () => {
    const props = {
      isUserLoggedIn: false,
      className: '',
      bagLabels: {
        guestUserMsg: '',
        login: '',
        shopNow: '',
        loggedInMsg: '',
      },
    };
    const component = shallow(<EmptyBagPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
describe('EmptyBagPage component click simulation', () => {
  it('should renders correctly with click', () => {
    const props = {
      isUserLoggedIn: false,
      className: '',
      bagLabels: {
        guestUserMsg: '',
        login: '',
        shopNow: '',
        loggedInMsg: '',
      },
    };
    const component = shallow(<EmptyBagPageVanilla {...props} />);
    component.find('Styled(Button)').simulate('click');
    expect(Router.push).toHaveBeenCalled();
  });
});
