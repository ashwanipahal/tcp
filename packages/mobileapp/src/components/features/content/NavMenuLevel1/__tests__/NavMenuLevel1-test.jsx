import React from 'react';
import { shallow } from 'enzyme';

import NavMenuLevel1View from '../views/NavMenuLevel1.view';

describe('NavMenuLevel1', () => {
  it('should be defined', () => {
    expect(NavMenuLevel1View).toBeDefined();
  });

  it('should render correctly', () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    const component = shallow(<NavMenuLevel1View {...props} />);
    expect(component).toMatchSnapshot();
  });
});
