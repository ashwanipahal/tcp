import React from 'react';
import { shallow } from 'enzyme';
import { ProfileInfoActionTile } from '../ProfileInfoActionTile.view';

describe('ProfileInfoActionTile', () => {
  it('should render correctly', () => {
    const props = {
      activityIcon: '/test',
      activityTitle: 'test',
      activityDescription: 'test',
      activityCompletionState: '',
      redirectTo: '/',
    };
    const tree = shallow(<ProfileInfoActionTile {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when activityCompletionState is present', () => {
    const props = {
      activityIcon: '/test',
      activityTitle: 'test',
      activityDescription: 'test',
      activityCompletionState: 'added',
      redirectTo: '/',
    };
    const tree = shallow(<ProfileInfoActionTile {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
