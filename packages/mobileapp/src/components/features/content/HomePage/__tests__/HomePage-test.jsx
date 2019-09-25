import React from 'react';
import { shallow } from 'enzyme';

import { HomePageView } from '../views/HomePage.view';

describe('HomePageView', () => {
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
    component = shallow(<HomePageView {...props} />);
  });

  it('should be defined', () => {
    expect(HomePageView).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should refresh data on navigation refresh', () => {
    component.setProps({
      navigation: {
        getParam: () => true,
      },
      getBootstrapData,
    });

    expect(getBootstrapData).toHaveBeenCalled();
  });
});
