export default {
  body: {
    PhysicalStore: [
      [
        {
          addressLine: {
            '0': '9593 carousel center',
            '1': 'NA',
            '2': 'PLACE',
          },
          attribute: {
            brands: ['TCP'],
            displayValue:
              '{ "storehours":[ {"nick":"monday","availability":[{"from" : "2019-05-06T10:00:00", "to" : "2019-05-06T21:30:00" ,"status":"opened" } ] },{"nick":"tuesday","availability":[{"from" : "2019-05-07T10:00:00", "to" : "2019-05-07T21:30:00" ,"status":"opened" } ] },{"nick":"wednesday","availability":[{"from" : "2019-05-08T10:00:00", "to" : "2019-05-08T21:30:00" ,"status":"opened" } ] },{"nick":"thursday","availability":[{"from" : "2019-05-09T10:00:00", "to" : "2019-05-09T21:30:00" ,"status":"opened" } ] },{"nick":"friday","availability":[{"from" : "2019-05-10T10:00:00", "to" : "2019-05-10T21:30:00" ,"status":"opened" } ] },{"nick":"saturday","availability":[{"from" : "2019-05-11T10:00:00", "to" : "2019-05-11T21:30:00" ,"status":"opened" } ] },{"nick":"Mother\'s Day","availability":[{"from" : "2019-05-12T11:00:00", "to" : "2019-05-12T18:00:00" ,"status":"opened" } ] },{"nick":"monday","availability":[{"from" : "2019-05-13T10:00:00", "to" : "2019-05-13T21:30:00" ,"status":"opened" } ] },{"nick":"tuesday","availability":[{"from" : "2019-05-14T10:00:00", "to" : "2019-05-14T21:30:00" ,"status":"opened"} ] }]}\r',
            name: 'STORE_HOURS_JSON',
            value: 'STORE_HOURS_JSON',
          },
          city: 'syracuse',
          country: 'US ',
          description: {
            displayStoreName: 'destiny usa',
          },
          distance: '19.093613910522105',
          isCurrentStore: 'False',
          isPreviousStore: 'False',
          isStoreBOSSEligible: '0',
          latitude: '43.06830',
          longitude: '-76.17030',
          postalCode: '13290                                   ',
          preferredStore: '0',
          stateOrProvinceName: 'NY',
          storeName: '0685',
          telephone1: '3154663703                      ',
          uniqueId: '110685',
        },
        {
          addressLine: {
            '0': '655 route 318 76',
            '1': 'NA',
            '2': 'OUTLET',
          },
          attribute: {
            brands: ['TCP'],
            displayValue:
              '{ "storehours":[ {"nick":"monday","availability":[{"from" : "2019-05-06T10:00:00", "to" : "2019-05-06T21:00:00" ,"status":"opened" } ] },{"nick":"tuesday","availability":[{"from" : "2019-05-07T10:00:00", "to" : "2019-05-07T21:00:00" ,"status":"opened" } ] },{"nick":"wednesday","availability":[{"from" : "2019-05-08T10:00:00", "to" : "2019-05-08T21:00:00" ,"status":"opened" } ] },{"nick":"thursday","availability":[{"from" : "2019-05-09T10:00:00", "to" : "2019-05-09T21:00:00" ,"status":"opened" } ] },{"nick":"friday","availability":[{"from" : "2019-05-10T10:00:00", "to" : "2019-05-10T21:00:00" ,"status":"opened" } ] },{"nick":"saturday","availability":[{"from" : "2019-05-11T10:00:00", "to" : "2019-05-11T21:00:00" ,"status":"opened" } ] },{"nick":"Mother\'s Day","availability":[{"from" : "2019-05-12T10:00:00", "to" : "2019-05-12T18:00:00" ,"status":"opened" } ] },{"nick":"monday","availability":[{"from" : "2019-05-13T10:00:00", "to" : "2019-05-13T21:00:00" ,"status":"opened" } ] },{"nick":"tuesday","availability":[{"from" : "2019-05-14T10:00:00", "to" : "2019-05-14T21:00:00" ,"status":"opened"} ] }]}\r',
            name: 'STORE_HOURS_JSON',
            value: 'STORE_HOURS_JSON',
          },
          city: 'waterloo',
          country: 'US ',
          description: {
            displayStoreName: 'waterloo premium outlets',
          },
          distance: '20.283523490732914',
          isCurrentStore: 'False',
          isPreviousStore: 'False',
          isStoreBOSSEligible: '0',
          latitude: '42.95429',
          longitude: '-76.92129',
          postalCode: '13165                                   ',
          preferredStore: '0',
          stateOrProvinceName: 'NY',
          storeName: '1733',
          telephone1: '3155398770                      ',
          uniqueId: '111733',
        },
      ],
    ],
  },
};

export const mockLocResponse = [
  {
    basicInfo: {
      address: {
        addressLine1: '9593 carousel center',
        city: 'syracuse',
        country: 'US ',
        state: 'NY',
        zipCode: '13290',
      },
      coordinates: {
        lat: 43.0683,
        long: -76.1703,
      },
      id: '110685',
      isDefault: '0',
      phone: '(315) 466-3703',
      storeName: 'destiny usa',
    },
    distance: '19.09',
    features: {
      entranceType: undefined,
      mallType: undefined,
      storeType: 'Retail Store',
    },
    hours: {
      holidayHours: [],
      regularAndHolidayHours: [],
      regularHours: [
        {
          dayName: 'MONDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-06 10:00:00',
              toHour: '2019-05-06 21:30:00',
            },
          ],
        },
        {
          dayName: 'TUESDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-07 10:00:00',
              toHour: '2019-05-07 21:30:00',
            },
          ],
        },
        {
          dayName: 'WEDNESDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-08 10:00:00',
              toHour: '2019-05-08 21:30:00',
            },
          ],
        },
        {
          dayName: 'THURSDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-09 10:00:00',
              toHour: '2019-05-09 21:30:00',
            },
          ],
        },
        {
          dayName: 'FRIDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-10 10:00:00',
              toHour: '2019-05-10 21:30:00',
            },
          ],
        },
        {
          dayName: 'SATURDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-11 10:00:00',
              toHour: '2019-05-11 21:30:00',
            },
          ],
        },
        {
          dayName: "MOTHER'S DAY",
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-12 11:00:00',
              toHour: '2019-05-12 18:00:00',
            },
          ],
        },
        {
          dayName: 'MONDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-13 10:00:00',
              toHour: '2019-05-13 21:30:00',
            },
          ],
        },
        {
          dayName: 'TUESDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-14 10:00:00',
              toHour: '2019-05-14 21:30:00',
            },
          ],
        },
      ],
    },
    pickupType: {
      isStoreBopisSelected: true,
      isStoreBossSelected: true,
    },
    productAvailability: {},
    storeBossInfo: {
      endDate: undefined,
      isBossEligible: '0',
      startDate: undefined,
    },
  },
  {
    basicInfo: {
      address: {
        addressLine1: '655 route 318 76',
        city: 'waterloo',
        country: 'US ',
        state: 'NY',
        zipCode: '13165',
      },
      coordinates: {
        lat: 42.95429,
        long: -76.92129,
      },
      id: '111733',
      isDefault: '0',
      phone: '(315) 539-8770',
      storeName: 'waterloo premium outlets',
    },
    distance: '20.28',
    features: {
      entranceType: undefined,
      mallType: undefined,
      storeType: 'Outlet',
    },
    hours: {
      holidayHours: [],
      regularAndHolidayHours: [],
      regularHours: [
        {
          dayName: 'MONDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-06 10:00:00',
              toHour: '2019-05-06 21:00:00',
            },
          ],
        },
        {
          dayName: 'TUESDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-07 10:00:00',
              toHour: '2019-05-07 21:00:00',
            },
          ],
        },
        {
          dayName: 'WEDNESDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-08 10:00:00',
              toHour: '2019-05-08 21:00:00',
            },
          ],
        },
        {
          dayName: 'THURSDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-09 10:00:00',
              toHour: '2019-05-09 21:00:00',
            },
          ],
        },
        {
          dayName: 'FRIDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-10 10:00:00',
              toHour: '2019-05-10 21:00:00',
            },
          ],
        },
        {
          dayName: 'SATURDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-11 10:00:00',
              toHour: '2019-05-11 21:00:00',
            },
          ],
        },
        {
          dayName: "MOTHER'S DAY",
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-12 10:00:00',
              toHour: '2019-05-12 18:00:00',
            },
          ],
        },
        {
          dayName: 'MONDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-13 10:00:00',
              toHour: '2019-05-13 21:00:00',
            },
          ],
        },
        {
          dayName: 'TUESDAY',
          isClosed: false,
          openIntervals: [
            {
              fromHour: '2019-05-14 10:00:00',
              toHour: '2019-05-14 21:00:00',
            },
          ],
        },
      ],
    },
    pickupType: {
      isStoreBopisSelected: true,
      isStoreBossSelected: true,
    },
    productAvailability: {},
    storeBossInfo: {
      endDate: undefined,
      isBossEligible: '0',
      startDate: undefined,
    },
  },
];
