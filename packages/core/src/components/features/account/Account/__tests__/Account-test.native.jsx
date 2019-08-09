import { shallow } from 'enzyme';
import React from 'react';
import { Account } from '../container/Account.native';

describe('Account View', () => {
  let component;
  let props = {
    labels: {},
  };
  beforeEach(() => {
    component = shallow(<Account {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should validate getComponent', () => {
    component = shallow(<Account {...props} />);
    expect(component.instance().getComponent('accountOverviewMobile')).toEqual('accountOverview');
  });

  it('should render Account Correctly', () => {
    props = {
      labels: {
        account: {},
      },
      navData: {},
      mainContent: 'AccountOverview',
      handleComponentChange: () => {},
    };
    component = shallow(<Account {...props} />);
    expect(component).toMatchSnapshot();
  });
});
