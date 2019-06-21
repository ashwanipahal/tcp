// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import EarnExtraPoints from '../views/EarnExtraPoints.view';

describe('EarnExtraPoints View', () => {
  it('should render EarnExtraPoints Correctly', () => {
    const tree = shallow(<EarnExtraPoints />);
    expect(tree).toMatchSnapshot();
  });
});
