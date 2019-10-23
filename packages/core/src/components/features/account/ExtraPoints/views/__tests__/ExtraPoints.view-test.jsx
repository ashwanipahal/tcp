import React from 'react';
import { shallow } from 'enzyme';
import { EarnPointsVanilla } from '../ExtraPoints.view';

describe('EarnPointsVanilla component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'className',
      waysToEarn: [
        {
          activityCode: 'AppDownload',
          activityTitle: 'Earn 5 Points 1',
          description: 'Download & Log in to our App',
          displayOrder: 1,
          iconImage: '/wcsstore/static/images/download-app.jpg',
        },
        {
          activityCode: 'AppDownload',
          activityTitle: 'Earn 5 Points',
          description: 'Download & Log in to our App',
          displayOrder: 1,
          iconImage: '/wcsstore/static/images/download-app.jpg',
        },
      ],
      earnedPointsNotification: [
        {
          transactionDate: '09/17/19',
          pointsEarned: '5',
        },
      ],
      labels: {},
      earnExtraPointsLabels: {},
      onViewActivityDetails: () => {},
      promoListData: [
        {
          class: null,
          heading: [{ text: 'Shop Extra' }],
          subHeading: [{ text: 'Earn 10 points' }],
        },
        {
          class: null,
          heading: [{ text: ' Bonus Days' }],
          subHeading: [{ text: 'Earn 5 points' }],
        },
        {
          class: null,
          heading: [{ text: ' Bonus Events' }],
          subHeading: [{ text: 'Earn 50 points' }],
        },
        {
          class: null,
          heading: [{ text: ' Shop for  Bonus' }],
          subHeading: [{ text: 'Earn points' }],
        },
      ],
    };
    const component = shallow(<EarnPointsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
