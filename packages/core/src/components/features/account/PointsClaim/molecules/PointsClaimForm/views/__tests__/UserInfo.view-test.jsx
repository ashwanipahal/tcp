import React from 'react';
import { shallow } from 'enzyme';
import { UserInfo } from '../UserInfo.view';

describe('UserInfo component', () => {
  it('should renders correctly with success and error', () => {
    const props = {
      labels: {
        common: {},
      },
      userInfoData: {},
    };
    const component = shallow(<UserInfo {...props} />);
    expect(component).toMatchSnapshot();
  });
});
