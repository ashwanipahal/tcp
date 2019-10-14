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
          city: 'Ohio',
          state: 'CA',
          zipCode: '33232',
        },
        phone: '8139942076',
      },
      pickUpPrimary: {
        firstName: 'abc',
        lastName: 'def',
      },
      pickUpAlternative: {},
      hours: {
        regularHours: [
          {
            dayName: 'COLUMBUS DAY',
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
