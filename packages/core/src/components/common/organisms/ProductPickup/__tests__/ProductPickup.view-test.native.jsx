import React from 'react';
import { shallow } from 'enzyme';
import { ProductPickupVanilla } from '../views/ProductPickup.view.native';

describe('ProductPickupVanilla', () => {
  let component;
  const props = {
    miscInfo: {},
    userDefaultStore: {
      basicInfo: {
        id: '',
        storeName: '',
      },
    },
    userGeoCoordinates: {
      lat: null,
      long: null,
    },
    itemValues: {
      color: '',
      Fit: '',
      Size: '',
      Quantity: null,
    },
    onPickUpOpenClick: null,
    bopisItemInventory: [],
    isBopisEligible: false,
    isBossEligible: false,
    isSkuResolved: false,
    showChangeStore: false,
    pickupTitleText: '',
    isBossEligBossInvAvail: false,
    isStoreBopisEligible: false,
    showPickupDetails: false,
    showPickupInfo: false,
    isSubmitting: false,
    labels: {
      lbl_Product_pickup_BOPIS_AVAILABLE: 'Pick up TODAY!',
      lbl_Product_pickup_BOPIS_DISABLED_FITS_HUSKY: 'husky',
      lbl_Product_pickup_BOPIS_DISABLED_FITS_PLUS: 'plus',
      lbl_Product_pickup_BOPIS_DISABLED_FITS_SLIM: 'slim',
      lbl_Product_pickup_BOPIS_ONLY_AVAILABLE: 'Item available for pickup TODAY',
      lbl_Product_pickup_BOSS_AVAILABLE: 'Or choose NO RUSH Pickup ',
      lbl_Product_pickup_BOSS_ONLY_AVAILABLE: 'Choose NO RUSH Pickup ',
      lbl_Product_pickup_FIND_STORE: 'FIND A STORE',
      lbl_Product_pickup_FREE_SHIPPING: 'FREE Shipping Every Day!',
      lbl_Product_pickup_NO_MIN_PURCHASE: 'No Minimum Purchase Required.',
      lbl_Product_pickup_PICKUP_IN_STORE: 'PICK UP IN STORE',
      lbl_Product_pickup_PRODUCT_BOPIS: 'Buy online - Pick up in store',
      lbl_Product_pickup_TITLE_DEFAULT_NOSTORE: 'Select Store',
    },
  };

  beforeEach(() => {
    component = shallow(<ProductPickupVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return styled view component value eleven', () => {
    expect(component.find('Styled(View)')).toHaveLength(6);
  });

  it('should return styled CustomIcon component value two', () => {
    expect(component.find('Styled(CustomIcon)')).toHaveLength(2);
  });

  it('should return styled BodyCopy component value seven', () => {
    expect(component.find('Styled(BodyCopy)')).toHaveLength(4);
  });

  it('should return styled LineComp component value one', () => {
    expect(component.find('Styled(LineComp)')).toHaveLength(1);
  });
});
