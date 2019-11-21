import React from 'react';
import { shallow } from 'enzyme';
import EarnPoints from '../ExtraPoints.view';

describe('EarnPointsVanilla component', () => {
  it('should renders correctly', () => {
    const props = {
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
      labels: {},
      onViewActivityDetails: () => {},
    };
    const component = shallow(
      <EarnPoints {...props} onViewActivityDetails={jest.fn()} toggleModal={jest.fn()} />
    );
    component.setState({ showModal: true });
    component.setState({ waysToEarnRow: {} });
    expect(component).toMatchSnapshot();
  });
});
