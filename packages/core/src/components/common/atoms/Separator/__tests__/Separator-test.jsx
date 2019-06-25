import React from 'react';
import { shallow } from 'enzyme';
import { SeparatorVanilla } from '../views/Separator';

describe('Separator component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'sample-class',
    };
    const component = shallow(<SeparatorVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
