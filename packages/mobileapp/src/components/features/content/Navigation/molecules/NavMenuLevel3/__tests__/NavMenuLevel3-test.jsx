import React from 'react';
import { shallow } from 'enzyme';

import NavMenuLevel3View from '../views/NavMenuLevel3.view';

describe('NavMenuLevel3', () => {
  it('should be defined', () => {
    expect(NavMenuLevel3View).toBeDefined();
  });

  it('should render correctly', () => {
    const props = {
      navigation: {
        goBack: () => {
          return 'back';
        },
        getParam: param => {
          const obj = {
            navigationObj: [
              {
                title: 'Lorem',
              },
              {
                title: 'Categoriess',
              },
            ],
            l2Title: 'test',
          };
          return obj[param];
        },
      },
      item: {
        subCategories: [
          {
            title: 'Lorem',
          },
          {
            title: 'Categoriess',
          },
        ],
      },
    };
    const component = shallow(<NavMenuLevel3View {...props} />);
    expect(component).toMatchSnapshot();
  });
});
