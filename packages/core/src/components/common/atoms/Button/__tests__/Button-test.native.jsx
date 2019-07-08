import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line import/named
import CustomButton from '../views/Button.native';

describe('CustomButton', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CustomButton id="btn" />);
  });

  it('should be defined', () => {
    expect(CustomButton).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('#btn')).toHaveLength(1);
  });
});
