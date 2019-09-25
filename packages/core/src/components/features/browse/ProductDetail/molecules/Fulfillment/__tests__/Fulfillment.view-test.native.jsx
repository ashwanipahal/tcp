import React from 'react';
import { shallow } from 'enzyme';
import { FulfillmentVanilla } from '../views/Fulfillment.view.native';

describe('FulfillmentVanilla', () => {
  let component;
  const props = {
    labels: {},
    onChangeStore: jest.fn(),
    margins: null,
    onPickUpInStore: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<FulfillmentVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return styled view component value eleven', () => {
    expect(component.find('Styled(View)')).toHaveLength(11);
  });

  it('should return styled CustomIcon component value two', () => {
    expect(component.find('Styled(CustomIcon)')).toHaveLength(2);
  });

  it('should return styled BodyCopy component value seven', () => {
    expect(component.find('Styled(BodyCopy)')).toHaveLength(7);
  });

  it('should return styled LineComp component value one', () => {
    expect(component.find('Styled(LineComp)')).toHaveLength(1);
  });

  it('should return styled Anchor component value one', () => {
    expect(component.find('Styled(Anchor)')).toHaveLength(1);
  });
});
