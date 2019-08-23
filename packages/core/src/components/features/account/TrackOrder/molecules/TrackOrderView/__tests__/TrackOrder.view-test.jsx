import React from 'react';
import { shallow } from 'enzyme';
import { TrackOrderViewVanilla } from '../views/TrackOrder.view';

describe('TrackOrderView component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      openState: true,
      openLoginOverlay: jest.fn(),
      onSubmit: jest.fn(),
      errorMessage: null,
      showNotification: 'error',
      onChangeForm: jest.fn(),
      setModalMountState: jest.fn(),
    };
    const component = shallow(<TrackOrderViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
