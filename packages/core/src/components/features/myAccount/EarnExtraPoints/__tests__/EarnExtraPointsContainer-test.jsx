// Boiler plate for furthur test cases to be written

import { shallow } from 'enzyme';
import React from 'react';
import EarnExtraPoints from '../container/EarnExtraPoints.container';

describe('EarnExtraPoints Container', () => {
  it('should render EarnExtraPoints Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<EarnExtraPoints mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
