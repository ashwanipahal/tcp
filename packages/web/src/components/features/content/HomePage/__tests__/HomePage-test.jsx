import React from 'react';
import { shallow } from 'enzyme';

import { HomePageViewVanilla } from '../views/HomePage.view';

describe('HomePageViewVanilla', () => {
  let component;
  const getBootstrapData = jest.fn();

  beforeEach(() => {
    const props = {
      slot_1: { className: 'moduleD' },
      slot_2: { className: 'moduleH' },
      getBootstrapData,
      appType: 'tcp',
      navigation: {
        getParam: () => false,
      },
      loadNavigationData: () => {},
    };
    component = shallow(<HomePageViewVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(HomePageViewVanilla).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
