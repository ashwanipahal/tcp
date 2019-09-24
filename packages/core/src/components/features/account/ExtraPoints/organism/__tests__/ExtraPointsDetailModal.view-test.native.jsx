import { shallow } from 'enzyme';
import React from 'react';
import ExtraPointsDetailModal from '../ExtraPointsDetailModal.view';

describe('Extra Points Details Modal for native', () => {
  const data = {
    openState: false,
    waysToEarnRow: {
      activityCode: 'AppDownload',
      activityTitle: 'Earn 5 Points',
      description: 'Download & Log in to our App',
      displayOrder: 1,
      activityModal: {
        activityModalLongDescription: 'test1 test1<br/><br/>test2 test2',
      },
      iconImage: '/wcsstore/static/images/download-app.jpg',
    },
    onRequestClose: () => {},
  };
  it('should render correctly native component', () => {
    const component = shallow(<ExtraPointsDetailModal {...data} />);
    expect(component).toMatchSnapshot();
  });
});
