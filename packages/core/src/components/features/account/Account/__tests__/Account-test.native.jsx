import { shallow } from 'enzyme';
import React from 'react';
import Account from '../container/Account.native';

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

  it('should render Account Correctly', () => {
    props = {
      labels: {},
    };
    expect(component).toMatchSnapshot();
  });
});
