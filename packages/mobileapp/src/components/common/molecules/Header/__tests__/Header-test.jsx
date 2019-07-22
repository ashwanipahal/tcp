import React from 'react';
import { shallow } from 'enzyme';
import { HeaderVanilla } from '../Header';
import { Container, StoreContainer, CartContainer } from '../Header.style';

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

  it('Header should return Container component value one', () => {
    expect(component.find(Container)).toHaveLength(1);
  });

  it('Header should return StoreContainer component value one', () => {
    expect(component.find(StoreContainer)).toHaveLength(1);
  });

  it('Header should return VerticalRightView component value one', () => {
    expect(component.find(CartContainer)).toHaveLength(1);
  });
});
