import React from 'react';
import { shallow } from 'enzyme';
import { BagPageHeaderVanilla } from '../BagPageHeader';
import {
  SafeAreaViewStyle,
  BagPageContainer,
  BrandIconSection,
  CloseContainer,
  BrandIcon,
  CloseIcon,
} from '../Header.style';

describe('BagPageHeader Component', () => {
  let component;
  const props = {
    navigation: {},
  };

  beforeEach(() => {
    component = shallow(<BagPageHeaderVanilla {...props} />);
  });

  it('BagPage Header should be defined', () => {
    expect(component).toBeDefined();
  });

  it('BagPage Header should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('BagPage Header should return SafeAreaViewStyle component value one', () => {
    expect(component.find(SafeAreaViewStyle)).toHaveLength(1);
  });

  it('BagPage should return BagPageHeaderContainer component value one', () => {
    expect(component.find(BagPageContainer)).toHaveLength(1);
  });

  it('BagPage should return BrandIconSection component value one', () => {
    expect(component.find(BrandIconSection)).toHaveLength(1);
  });

  it('BagPage should return CloseContainer component value one', () => {
    expect(component.find(CloseContainer)).toHaveLength(1);
  });

  it('BagPage should return BrandIcon component value one', () => {
    expect(component.find(BrandIcon)).toHaveLength(1);
  });

  it('BagPage should return CloseIcon component value one', () => {
    expect(component.find(CloseIcon)).toHaveLength(1);
  });
});
