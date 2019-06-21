// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import MyPreferences from '../container/MyPreferences.container';

describe('MyPreferences Container', () => {
  it('should render MyPreferences Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<MyPreferences mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
