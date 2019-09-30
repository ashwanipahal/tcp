import { parseStoreHours } from '../parseStoreHours';

describe('parseStoreHours ', () => {
  const hoursInputData = [
    {
      nick: 'friday',
      availability: [
        {
          from: '2019-01-04T09:30:00',
          to: '2019-01-04T21:00:00',
          status: 'opened',
        },
      ],
    },
    {
      nick: 'saturday',
      availability: [
        {
          from: '2019-01-05T09:30:00',
          to: '2019-01-05T21:00:00',
          status: 'opened',
        },
      ],
    },
    {
      nick: 'sunday',
      availability: [
        {
          from: '2019-01-06T11:00:00',
          to: '2019-01-06T19:00:00',
          status: 'opened',
        },
      ],
    },
    {
      nick: 'monday',
      availability: [
        {
          from: '2019-01-07T09:30:00',
          to: '2019-01-07T21:00:00',
          status: 'opened',
        },
      ],
    },
    {
      nick: 'tuesday',
      availability: [
        {
          from: '2019-01-08T09:30:00',
          to: '2019-01-08T21:00:00',
          status: 'opened',
        },
      ],
    },
    {
      nick: 'wednesday',
      availability: [
        {
          from: '2019-01-09T09:30:00',
          to: '2019-01-09T21:00:00',
          status: 'opened',
        },
      ],
    },
    {
      nick: 'thursday',
      availability: [
        {
          from: '2019-01-10T09:30:00',
          to: '2019-01-10T21:00:00',
          status: 'opened',
        },
      ],
    },
    {
      nick: 'friday',
      availability: [
        {
          from: '2019-01-11T09:30:00',
          to: '2019-01-11T21:00:00',
          status: 'opened',
        },
      ],
    },
    {
      nick: 'saturday',
      availability: [
        {
          from: '2019-01-12T09:30:00',
          to: '2019-01-12T21:00:00',
          status: 'opened',
        },
      ],
    },
  ];

  test('parsed correct input', () => {
    const result = {
      dayName: 'FRIDAY',
      isClosed: false,
      openIntervals: [
        {
          fromHour: '2019-01-04 09:30:00',
          toHour: '2019-01-04 21:00:00',
        },
      ],
    };
    expect(parseStoreHours(hoursInputData)[0]).toMatchObject(result);
  });
});
