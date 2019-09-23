import React from 'react';
import { shallow } from 'enzyme';
import { PromotionalMessageVanilla } from '../views/PromotionalMessage.view.native';

describe('HeadingVanilla', () => {
  let component;
  const props = {
    isPlcc: false,
    height: null,
    marginTop: null,
    dataLocator: '',
    fontSize: null,
  };

  beforeEach(() => {
    component = shallow(<PromotionalMessageVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return PromotionalMessageContainer component value one', () => {
    expect(component.find('Styled(View)')).toHaveLength(1);
  });
  it('should return PromotionalText component value one', () => {
    expect(component.find('Styled(Text)')).toHaveLength(1);
  });
});
