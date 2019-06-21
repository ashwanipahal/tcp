// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import ProfileInformation from '../views/ProfileInformation.view';

describe('ProfileInformation View', () => {
  it('should render ProfileInformation Correctly', () => {
    const tree = shallow(<ProfileInformation />);
    expect(tree).toMatchSnapshot();
  });
});
