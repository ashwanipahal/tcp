import React from 'react';
import { shallow } from 'enzyme';
import HomePageView from '../views/HomePage.view';

describe('HomePageView', () => {
  let component;
  const getBootstrapData = jest.fn();

  beforeEach(() => {
    component = shallow(<HomePageView moduleD={{}} getBootstrapData={getBootstrapData} />);
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
