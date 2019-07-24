import React from 'react';
import { shallow } from 'enzyme';
import { HeaderPromoVanilla } from '../HeaderPromo';
import { MessageContainer } from '../HeaderPromo.style';

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

  it('HeaderPromo should return MessageContainer component value one', () => {
    expect(component.find(MessageContainer)).toHaveLength(0);
  });
});
