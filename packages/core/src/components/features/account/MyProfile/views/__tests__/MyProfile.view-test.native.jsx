import React from 'react';
import { shallow } from 'enzyme';
import { MyProfile } from '../MyProfile.view.native';

describe('Myprofile', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      handleComponentChange: () => {},
      componentProps: {},
    };
    const tree = shallow(<MyProfile {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
