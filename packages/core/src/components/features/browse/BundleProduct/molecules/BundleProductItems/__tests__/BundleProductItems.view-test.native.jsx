import React from 'react';
import { shallow } from 'enzyme';
import { BundleProductItemsVanilla } from '../views/BundleProductItems.view.native';

describe('BundleProductItemsVanilla', () => {
  let component;
  const props = {
    currentBundle: [],
    plpLabels: {},
    handleAddToBag: () => {},
    addToFavorites: () => {},
    addToBagEcom: () => {},
    currentState: {},
    navigation: {},
    labels: {},
    isLoggedIn: false,
  };

  beforeEach(() => {
    component = shallow(<BundleProductItemsVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
