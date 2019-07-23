import React from 'react';
import { shallow } from 'enzyme';
import { HeaderPromoVanilla } from '../views/HeaderPromo.native';
import { Container, ChildContainer, Image, MessageContainer } from '../HeaderPromo.style.native';

describe('HeaderPromo Component', () => {
  let component;
  const props = {
    headerPromo: {},
  };

  beforeEach(() => {
    component = shallow(<HeaderPromoVanilla {...props} />);
  });

  it('HeaderPromo icons should be defined', () => {
    component.setState({ isIconIn: true });
  });

  it('HeaderPromo should be defined', () => {
    expect(component).toBeDefined();
  });

  it('HeaderPromo should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('HeaderPromo should return Container component value one', () => {
    expect(component.find(Container)).toHaveLength(1);
  });

  it('HeaderPromo should return ChildContainer component value one', () => {
    expect(component.find(ChildContainer)).toHaveLength(1);
  });

  it('HeaderPromo should return MessageContainer component value one', () => {
    expect(component.find(MessageContainer)).toHaveLength(1);
  });

  it('HeaderPromo should return Image component value one', () => {
    expect(component.find(Image)).toHaveLength(1);
  });
});
