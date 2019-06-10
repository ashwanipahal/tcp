import React from 'react';
import { shallow } from 'enzyme';
import { ColVanilla } from '../views/Col';

describe('Col component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'sample-column',
    };
    const component = shallow(<ColVanilla {...props}>Random column</ColVanilla>);
    expect(component).toMatchSnapshot();
    expect(component.find('.sample-column')).toHaveLength(1);
  });
});
