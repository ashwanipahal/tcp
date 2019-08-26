import React from 'react';
import { shallow } from 'enzyme';
import { ProfileInformation } from '../ProfileInformation.view.native';

describe('ProfileInformation', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      handleComponentChange: () => {},
    };
    const tree = shallow(<ProfileInformation {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
