import React from 'react';
import { shallow } from 'enzyme';
import GuestLoginOverview from '../views';

describe('GuestLoginOverview component', () => {
  it('GuestLoginOverview component renders correctly without props', () => {
    const component = shallow(<GuestLoginOverview />);
    expect(component).toMatchSnapshot();
  });

  it('GuestLoginOverview component renders correctly with props', () => {
    const props = {
      getComponentId: {
        login: 'login',
        createAccount: 'createAccount',
      },
      labels: {
        lbl_overview_login_text: 'lbl_overview_login_text',
        lbl_overview_createAccount: 'lbl_overview_createAccount',
      },
    };
    const component = shallow(<GuestLoginOverview props={props} />);
    expect(component).toMatchSnapshot();
  });
});
