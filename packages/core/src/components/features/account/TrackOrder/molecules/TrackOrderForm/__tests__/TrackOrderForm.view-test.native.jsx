import React from 'react';
import { shallow } from 'enzyme';
import TrackOrderForm from '../views/TrackOrderForm.view.native';

describe('TrackOrderForm component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      errorMessage: '',
      handleSubmit: jest.fn(),
      onChangeForm: jest.fn(),
      invalid: false,
    };
    const component = shallow(<TrackOrderForm {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly if invalid is true, makes the track order button is disabled', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      errorMessage: '',
      handleSubmit: jest.fn(),
      onChangeForm: jest.fn(),
      invalid: true,
    };
    const component = shallow(<TrackOrderForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
