import React from 'react';
import { shallow } from 'enzyme';
import { BundleProductItemsVanilla } from '../views/BundleProductItems.view.native';

describe('BundleProductItemsVanilla', () => {
  let component;
  const props = {
    plpLabels: {},
    pdpLabels: {},
    shortDescription: '',
    itemPartNumber: '',
    longDescription: '',
    currency: 'USD',
    currencyAttributes: {
      exchangevalue: 1,
    },
    addToBagEcom: () => {},
    currentState: {},
    addToBagError: '',
    addToBagErrorId: '',
    isPickupModalOpen: false,
    addToFavorites: () => {},
    isLoggedIn: false,
    isPlcc: false,
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
