import React from 'react';
import { shallow } from 'enzyme';
import { AnchorVanilla } from '../views/Anchor';

describe('Anchor component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'sample-anchor',
    };
    const component = shallow(<AnchorVanilla {...props}>Random anchor</AnchorVanilla>);
    expect(component).toMatchSnapshot();
    expect(component.find('.sample-anchor')).toHaveLength(1);
  });
});
