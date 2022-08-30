import { shallow } from 'enzyme';
import React from 'react';
import { ExtraPointsDetailModalVanilla } from '../ExtraPointsDetailModal.view';

describe('Extra Points Details Modal', () => {
  const data = {
    labels: {},
    openState: false,
    waysToEarnRow: {
      activityCode: 'AppDownload',
      activityTitle: 'Earn 4 Points',
      description: 'Download & Log in to our App',
      displayOrder: 1,
      activityModal: {
        activityModalLongDescription: 'test1 test1<br/><br/>test2 test2',
      },
      iconImage: '/wcsstore/static/images/download-app.jpg',
    },
    onRequestClose: () => {},
  };
  it('should render correctly', () => {
    const component = shallow(<ExtraPointsDetailModalVanilla {...data} />);
    expect(component).toMatchSnapshot();
  });
});
