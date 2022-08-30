import React from 'react';
import { shallow } from 'enzyme';
import { UserInfo } from '../UserInfo.view.native';

describe('UserInfo Native component', () => {
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
