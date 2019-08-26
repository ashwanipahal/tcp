import React from 'react';
import { shallow } from 'enzyme';
import { ProfileInfoActions } from '../ProfileInfoActions.view.native';

describe('ProfileInfoActions', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      handleComponentChange: () => {},
    };
    const tree = shallow(<ProfileInfoActions {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
