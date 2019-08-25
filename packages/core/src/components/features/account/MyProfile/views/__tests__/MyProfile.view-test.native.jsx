import React from 'react';
import { shallow } from 'enzyme';
import { MyProfile } from '../Myprofile.view.native';

describe('Myprofile', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      handleComponentChange: () => {},
    };
    const tree = shallow(<MyProfile {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
