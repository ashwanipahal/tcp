import React from 'react';
import { shallow } from 'enzyme';
import { PickUpSummaryVanilla } from '../PickUpSummary.view';

describe.skip('Order Summary Details component', () => {
  const props = {
    ordersLabels: {},
    pickUpStore: {
      basicInfo: {
        address: {
          addressLine1: 'space 170',
          city: 'New Jersey',
          state: 'NJ',
          zipCode: '33232',
        },
        phone: '23423423423',
      },
      pickUpPrimary: {
        firstName: 'Username1',
        lastName: 'Username2',
      },
      pickUpAlternative: {},
      hours: {
        regularHours: [
          {
            dayName: 'TUESDAY',
            openIntervals: [
              {
                fromHour: '2019-11-12 10:00:00',
                toHour: '2019-11-12 21:00:00',
              },
            ],
          },
        ],
      },
    },
  };
  it.skip('should renders correctly', () => {
    const component = shallow(<PickUpSummaryVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
