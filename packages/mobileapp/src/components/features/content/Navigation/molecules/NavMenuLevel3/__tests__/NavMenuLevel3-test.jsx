import React from 'react';
import { shallow } from 'enzyme';

import NavMenuLevel3View from '../views/NavMenuLevel3.view';

describe('NavMenuLevel2', () => {
  it('should be defined', () => {
    expect(NavMenuLevel3View).toBeDefined();
  });

  it('should render correctly', () => {
    const props = {
      navigation: {
        getParam: param => {
          if (param === 'navigationObj') {
            return {
              item: {
                subCategories: [],
              },
            };
          }
          return 'GIRL';
        },
      },
    };
    const component = shallow(<NavMenuLevel3View {...props} />);
    expect(component).toMatchSnapshot();
  });
});
