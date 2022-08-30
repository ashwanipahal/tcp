import React from 'react';
import { shallow } from 'enzyme';
import { OutfitDetailsViewVanilla } from '../views/OutfitDetails.view.native';

describe('OutfitDetail component', () => {
  let component;
  const props = {
    outfitImageUrl: '',
    outfitProducts: '',
    plpLabels: '',
    item: jest.fn(),
    labels: '',
    isPickupModalOpen: true,
    navigation: '',
    isLoggedIn: false,
  };

  beforeEach(() => {
    component = shallow(<OutfitDetailsViewVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
