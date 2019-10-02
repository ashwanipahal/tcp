export default {
  address1: '471-485 fulton street',
  address2: '',
  address3: 'PLACE',
  brands: ['GYM'],
  city: 'brooklyn',
  country: 'US',
  displayValue: {
    storehours: [
      {
        nick: 'monday',
        availability: [
          {
            from: '2019-05-06T10:00:00',
            to: '2019-05-06T20:00:00',
            status: 'opened',
          },
        ],
      },
      {
        nick: 'tuesday',
        availability: [
          {
            from: '2019-05-07T10:00:00',
            to: '2019-05-07T20:00:00',
            status: 'opened',
          },
        ],
      },
      {
        nick: 'wednesday',
        availability: [
          {
            from: '2019-05-08T10:00:00',
            to: '2019-05-08T20:00:00',
            status: 'opened',
          },
        ],
      },
      {
        nick: 'thursday',
        availability: [
          {
            from: '2019-05-09T10:00:00',
            to: '2019-05-09T20:00:00',
            status: 'opened',
          },
        ],
      },
      {
        nick: 'friday',
        availability: [
          {
            from: '2019-05-10T10:00:00',
            to: '2019-05-10T20:00:00',
            status: 'opened',
          },
        ],
      },
      {
        nick: 'saturday',
        availability: [
          {
            from: '2019-05-11T10:00:00',
            to: '2019-05-11T20:00:00',
            status: 'opened',
          },
        ],
      },
      {
        nick: "Mother's Day",
        availability: [
          {
            from: '2019-05-12T11:00:00',
            to: '2019-05-12T18:00:00',
            status: 'opened',
          },
        ],
      },
      {
        nick: 'monday',
        availability: [
          {
            from: '2019-05-13T10:00:00',
            to: '2019-05-13T20:00:00',
            status: 'opened',
          },
        ],
      },
      {
        nick: 'tuesday',
        availability: [
          {
            from: '2019-05-14T10:00:00',
            to: '2019-05-14T20:00:00',
            status: 'opened',
          },
        ],
      },
    ],
  },
  isStoreBOSSEligible: '0',
  itemAvailability: [],
  latitude: 40.69112,
  longitude: -73.98625,
  name: 'fulton street',
  phone: '7182431150',
  preferredStore: 0,
  stLocId: 110850,
  state: 'NY',
  zipCode: '11201',
};

export const parsedStoreInfoMockData = {
  storeBossInfo: {
    isBossEligible: '0',
  },
  pickupType: {
    isStoreBossSelected: true,
    isStoreBopisSelected: true,
  },
  distance: null,
  basicInfo: {
    id: '110850',
    storeName: 'fulton street',
    isDefault: false,
    address: {
      addressLine1: '471-485 fulton street',
      city: 'brooklyn',
      state: 'NY',
      country: 'US',
      zipCode: '11201',
    },
    phone: '(718) 243-1150',
    coordinates: {
      lat: 40.69112,
      long: -73.98625,
    },
  },
  hours: {
    regularHours: [],
    holidayHours: [],
    regularAndHolidayHours: [],
  },
  features: {
    storeType: 'Retail Store',
  },
  productAvailability: {},
};
