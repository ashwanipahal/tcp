import React from 'react';
import { shallow } from 'enzyme';
import Spotlight from '../views/Spotlight';

describe('Spotlight component', () => {
  const props = {
    categoryId: '',
    spotlightUrl: '',
  };
  it('should renders correctly', () => {
    const component = shallow(<Spotlight {...props} />);
    component.setState({ isLoading: false });
    expect(component).toMatchSnapshot();
  });
});
