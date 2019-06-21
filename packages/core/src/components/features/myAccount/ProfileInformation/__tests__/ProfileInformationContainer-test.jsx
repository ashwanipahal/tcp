// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import ProfileInformation from '../container/ProfileInformation.container';

describe('ProfileInformation Container', () => {
  it('should render ProfileInformation Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<ProfileInformation mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
