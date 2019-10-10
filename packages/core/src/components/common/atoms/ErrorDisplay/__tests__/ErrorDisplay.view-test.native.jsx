import React from 'react';
import { shallow } from 'enzyme';
import ErrorDisplay from '../views/ErrorDisplay.view.native';

describe('ErrorDisplay', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ErrorDisplay />);
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
