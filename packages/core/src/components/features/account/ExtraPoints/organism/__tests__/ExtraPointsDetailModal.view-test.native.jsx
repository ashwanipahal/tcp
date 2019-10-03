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
    handleComponentChange: jest.fn(),
  };
  it('should render correctly native component', () => {
    const component = shallow(<ExtraPointsDetailModal {...data} />);
    expect(component).toMatchSnapshot();
  });

  it('test handleButtonClick function for userAboutYourselfSurvey', () => {
    const component = shallow(<ExtraPointsDetailModal {...data} />);
    const props = {
      activityModal: {
        activityModalAction: 'userAboutYourselfSurvey',
      },
    };
    component.instance().handleButtonClick(props.activityModal);
    expect(data.handleComponentChange).toHaveBeenCalled();
  });
  it('test handleButtonClick function for userFavoriteStore', () => {
    const component = shallow(<ExtraPointsDetailModal {...data} />);
    const props = {
      activityModal: {
        activityModalAction: 'userFavoriteStore',
      },
    };
    component.instance().handleButtonClick(props.activityModal);
    expect(data.handleComponentChange).toHaveBeenCalled();
  });
  it('test handleButtonClick function for myPreference', () => {
    const component = shallow(<ExtraPointsDetailModal {...data} />);
    const props = {
      activityModal: {
        activityModalAction: 'myPreference',
      },
    };
    component.instance().handleButtonClick(props.activityModal);
    expect(data.handleComponentChange).toHaveBeenCalled();
  });
  it('test handleButtonClick function for orders', () => {
    const component = shallow(<ExtraPointsDetailModal {...data} />);
    const props = {
      activityModal: {
        activityModalAction: 'orders',
      },
    };
    component.instance().handleButtonClick(props.activityModal);
    expect(data.handleComponentChange).toHaveBeenCalled();
  });
});
