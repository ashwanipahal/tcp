import React from 'react';
import { shallow } from 'enzyme';
import { GridVanilla } from '../views/Grid';

describe('Grid component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'sample-grid',
    };
    const component = shallow(<GridVanilla {...props}>ABCD</GridVanilla>);
    expect(component).toMatchSnapshot();
    expect(component.find('.sample-grid')).toHaveLength(1);
  });
});
