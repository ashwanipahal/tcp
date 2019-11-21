import React from 'react';
import { shallow } from 'enzyme';
import PickUpSummary from '../PickUpSummary.view';

describe('Order Summary Details component', () => {
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
            dayName: 'WEDNESDAY',
            openIntervals: [
              {
                fromHour: '2019-10-14 10:00:00',
                toHour: '2019-10-14 21:00:00',
              },
            ],
          },
        ],
      },
    },
  };
  it('should renders correctly', () => {
    const component = shallow(<PickUpSummary {...props} />);
    expect(component).toMatchSnapshot();
  });
});
