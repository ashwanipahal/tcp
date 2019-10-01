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
