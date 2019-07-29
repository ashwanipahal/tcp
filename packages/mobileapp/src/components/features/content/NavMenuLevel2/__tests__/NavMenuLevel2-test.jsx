import React from 'react';
import { shallow } from 'enzyme';

import NavMenuLevel2View from '../views/NavMenuLevel2.view';

describe('NavMenuLevel2', () => {
  it('should be defined', () => {
    expect(NavMenuLevel2View).toBeDefined();
  });

  it('should render correctly', () => {
    const props = {
      navigation: {
        getParam: jest.fn(),
      },
    };
    const component = shallow(<NavMenuLevel2View {...props} />);
    expect(component).toMatchSnapshot();
  });
});
