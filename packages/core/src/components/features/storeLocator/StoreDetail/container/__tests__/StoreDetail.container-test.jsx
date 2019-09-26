import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, List } from 'immutable';
import { StoreDetailContainer, mapDispatchToProps } from '../StoreDetail.container';
import StoreDetail from '../views/StoreDetail';

describe('Store Detail Page', () => {
  const labels = {
    StoreLocator: {
      lbl_storelocators_landingpage_openInterval: 'open until',
      lbl_storelocators_landingpage_milesAway: 'miles away',
      lbl_storelocators_landingpage_getdirections_link: 'Get Directions',
      lbl_storelocators_landingpage_favStore: 'Your Store',
      lbl_storelocators_landingpage_setfavStore: 'SET AS FAVORITE',
      lbl_storelocators_common_atThisPlace: 'at this PLACE!',
      lbl_storelocators_landingpage_storedetails_link: 'Store Details',
      lbl_storelocators_details_getdirections_btn: 'Directions',
      lbl_storelocators_details_callstore_btn: 'Call Store',
      lbl_storelocators_details_changestore_btn: 'Change Favorite Store',
      lbl_storelocators_detail_mallType: 'Mall Type:',
      lbl_storelocators_detail_entranceType: 'Type of Entrance:',
      lbl_storelocators_details_locations_details_btn: 'SEE STORE DETAILS',
      lbl_storelocators_details_locations_title: 'OTHER LOCATIONS NEAR YOU',
    },
  };
  const props = {
    labels,
    currentStoreInfo: fromJS({
      basicInfo: fromJS({
        id: '',
        storeName: '',
        phone: '',
        coordinates: {
          lat: '',
          long: '',
        },
        address: {},
      }),
      hours: fromJS({
        regularHours: List([]),
        holidayHours: List([]),
        regularAndHolidayHours: List([]),
      }),
      features: fromJS({
        mallType: '',
        entranceType: '',
      }),
    }),
    currentStoreBasicInfo: fromJS({
      id: '',
      coordinates: {
        lat: '',
        long: '',
      },
    }),
    formatStore: store => ({ test: store }),
    nearByStores: [],
    loadNearByStoreInfo: jest.fn(),
  };
  it('should render StoreDetail', () => {
    const component = shallow(<StoreDetailContainer {...props} />);
    expect(component.is(StoreDetail)).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('should not render StoreDetail', () => {
    const prop = {
      currentStoreInfo: fromJS({}),
      formatStore: store => ({ key: store }),
      nearByStores: [],
      loadNearByStoreInfo: jest.fn(),
    };
    const component = shallow(<StoreDetailContainer {...prop} />);
    expect(component.is(StoreDetail)).toBeFalsy();
    expect(component).toMatchSnapshot();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action onSubmit which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const payload = {
        storeLocationId: 111421,
        getNearby: true,
        latitude: 40.76004,
        longitude: -73.91805,
        currentStore: fromJS({
          basicInfo: {
            id: '111421',
          },
        }),
      };
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.loadNearByStoreInfo(payload);
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
