import React from 'react';
import { shallow } from 'enzyme';
import { HeadingVanilla } from '../views/Heading';

describe('Heading component', () => {
  it('renders correctly without props', () => {
    const component = shallow(<HeadingVanilla>Heading</HeadingVanilla>);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props with different variant', () => {
    const props = {
      className: 'heading',
      component: 'h4',
      variant: 'h1',
    };
    const component = shallow(
      <HeadingVanilla {...props}>Heading with different variant check</HeadingVanilla>
    );
    expect(component).toMatchSnapshot();
    expect(component.find('.heading')).toHaveLength(1);
    expect(component.find('h4')).toHaveLength(1);
  });
});
