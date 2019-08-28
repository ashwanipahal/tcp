import React from 'react';
import { shallow } from 'enzyme';
import { ChangePasswordInfo } from '../ChangePasswordInfo.view.native';

describe('ChangePassword', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      handleComponentChange: () => {},
    };
    const tree = shallow(<ChangePasswordInfo {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
