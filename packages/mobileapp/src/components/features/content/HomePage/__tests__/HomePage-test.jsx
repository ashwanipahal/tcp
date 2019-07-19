import React from 'react';
import { shallow } from 'enzyme';

import HomePageView from '../views/HomePage.view';

describe('HomePageView', () => {
  let component;

  beforeEach(() => {
    component = shallow(<HomePageView />);
  });

  it('should be defined', () => {
    expect(HomePageView).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
