import React from 'react';
import { shallow } from 'enzyme';
import { BackToTopVanilla } from '../views/BackToTop';

describe('BackToTop component', () => {
  it('BackToTop component renders correctly', () => {
    const component = shallow(<BackToTopVanilla />);
    expect(component).toMatchSnapshot();
  });

  it('Calls #addBackToTopBtn', () => {
    const component = shallow(<BackToTopVanilla />);
    component.instance().addBackToTopBtn();
  });

  it('Calls #scrollToTop', () => {
    const component = shallow(<BackToTopVanilla />);
    component.instance().scrollToTop();
  });

  it('Component Unmounts', () => {
    const component = shallow(<BackToTopVanilla />);
    component.instance().componentWillUnmount();
  });
});
