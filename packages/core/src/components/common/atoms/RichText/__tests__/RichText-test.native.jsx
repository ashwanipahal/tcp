import React from 'react';
import { shallow } from 'enzyme';
import RichText from '../views/RichText.native';

describe('RichText', () => {
  let component;

  beforeEach(() => {
    component = shallow(<RichText id="RichText" />);
  });

  it('should be defined', () => {
    expect(RichText).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('#RichText')).toHaveLength(1);
  });
});
