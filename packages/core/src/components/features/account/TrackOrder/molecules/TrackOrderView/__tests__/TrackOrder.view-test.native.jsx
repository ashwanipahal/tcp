import React from 'react';
import { shallow } from 'enzyme';
import TrackOrderModalView from '../views/TrackOrder.view.native';

describe('TrackOrderView component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      onSubmit: jest.fn(),
      errorMessage: null,
      showNotification: 'error',
      onChangeForm: jest.fn(),
      onRequestClose: jest.fn(),
    };
    const component = shallow(<TrackOrderModalView {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly with generic error message', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      onSubmit: jest.fn(),
      errorMessage: 'genericError',
      showNotification: 'error',
      onChangeForm: jest.fn(),
      onRequestClose: jest.fn(),
    };
    const component = shallow(<TrackOrderModalView {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with notification component', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      onSubmit: jest.fn(),
      errorMessage: 'Please enter valid values',
      showNotification: 'error',
      onChangeForm: jest.fn(),
      onRequestClose: jest.fn(),
    };
    const component = shallow(<TrackOrderModalView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
