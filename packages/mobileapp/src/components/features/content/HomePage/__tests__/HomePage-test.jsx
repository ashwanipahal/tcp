import React from 'react';
import { shallow } from 'enzyme';

import HomePageView from '../views/HomePage.view';

describe('HomePageView', () => {
  let component;

  beforeEach(() => {
    const props = {
      slot_1: { className: 'moduleD' },
      slot_2: { className: 'moduleH' },
      getBootstrapData: jest.fn(),
    };
    component = shallow(<HomePageView {...props} />);
  });

  it('should be defined', () => {
    expect(HomePageView).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
