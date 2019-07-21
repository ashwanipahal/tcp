import React from 'react';
import { shallow } from 'enzyme';
import { HeaderVanilla } from '../Header';
import { Wrapper, VerticalLeftView, VerticalRightView } from '../Header.style';

describe('Header Component', () => {
  let component;
  const props = {
    labels: {},
  };

  beforeEach(() => {
    component = shallow(<HeaderVanilla {...props} />);
  });

  it('Header icons should be defined', () => {
    component.setState({ isIconIn: true });
  });

  it('Header should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Header should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('Header should return Wrapper component value one', () => {
    expect(component.find(Wrapper)).toHaveLength(1);
  });

  it('Header should return VerticalLeftView component value one', () => {
    expect(component.find(VerticalLeftView)).toHaveLength(1);
  });

  it('Header should return VerticalRightView component value one', () => {
    expect(component.find(VerticalRightView)).toHaveLength(1);
  });
});
