import React from 'react';
import { shallow } from 'enzyme';
import { ChangePassword } from '../ChangePasswordInfo.view.native';

describe('ChangePassword', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      handleComponentChange: () => {},
    };
    const tree = shallow(<ChangePassword {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
