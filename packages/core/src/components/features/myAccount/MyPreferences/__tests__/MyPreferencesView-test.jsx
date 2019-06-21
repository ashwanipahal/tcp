// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import MyPreferences from '../views/MyPreferences.view';

describe('MyPreferences View', () => {
  it('should render MyPreferences Correctly', () => {
    const tree = shallow(<MyPreferences />);
    expect(tree).toMatchSnapshot();
  });
});
