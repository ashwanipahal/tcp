import React from 'react';
import { shallow } from 'enzyme';
import InitialPropsHOC from '../InitialPropsHOC';
import { HomePageView } from '../../../../features/content/HomePage/views/HomePage.view';

describe('InitialPropsHOC testcases', () => {
  let wrapper;
  const addListener = jest.fn();
  const HomePage = InitialPropsHOC(HomePageView);

  beforeEach(() => {
    wrapper = shallow(<HomePage navigation={{ addListener }} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
