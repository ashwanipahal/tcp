import React from 'react';
import { shallow } from 'enzyme';
import { AccountDrawerHeadingVanilla } from '../AccountDrawerHeading';

describe('AccountDrawerHeading', () => {
  it('should render correctly', () => {
    const labels = {
      ACC_DRAWER_USER_NAME: 'Test Name',
      ACC_DRAWER_VIEW_MY_ACC: 'View My Account',
    };
    const tree = shallow(<AccountDrawerHeadingVanilla labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
