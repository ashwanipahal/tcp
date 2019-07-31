import React from 'react';
import { shallow } from 'enzyme';
import { LineCompVanilla } from '../views/line.native';

describe('InputCheckbox component', () => {
  it('should render correctly', () => {
    const props = {
      marginTop: 0,
      marginBottom: 0,
      borderWidth: 0.65,
      borderColor: '#ff0000',
    };
    const component = shallow(<LineCompVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
