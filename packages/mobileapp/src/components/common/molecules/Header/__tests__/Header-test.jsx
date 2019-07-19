import React from 'react';
import { shallow } from 'enzyme';
import { HeaderVanilla } from '../Header';

describe('Header Component', () => {
  let component;
  const props = {
    labels: {},
  };

  beforeEach(() => {
    component = shallow(<HeaderVanilla {...props} />);
    component.setState({ isIconIn: true });
  });

  it('Header should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Header should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
