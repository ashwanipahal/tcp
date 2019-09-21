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
          activityTitle: 'Earn 5 Points',
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
      labels: {},
      onViewActivityDetails: () => {},
    };
    const component = shallow(<EarnPointsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
