import React from 'react';
import { shallow } from 'enzyme';
import { ProfileProgress } from '../ProfileProgress.view';

describe('ProfileInfoActionTile', () => {
  it('should render correctly', () => {
    const props = {
      profileCompletion: 20,
    };
    const tree = shallow(<ProfileProgress {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
