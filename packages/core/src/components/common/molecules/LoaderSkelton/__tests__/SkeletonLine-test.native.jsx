import React from 'react';
import { shallow } from 'enzyme';
import { FadeInViewVanilla } from '../views/SkeletonLine.view.native';

describe('FadeInViewVanilla Native component', () => {
  let component;

  const props = {
    minOpacity: 0.3,
    maxOpacity: 1,
  };

  beforeEach(() => {
    component = shallow(<FadeInViewVanilla {...props} />);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return AnimatedComponent component value one', () => {
    expect(component.find('AnimatedComponent')).toHaveLength(1);
  });
});
