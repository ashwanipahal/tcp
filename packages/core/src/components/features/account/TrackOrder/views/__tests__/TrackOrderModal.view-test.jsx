import React from 'react';
import { shallow } from 'enzyme';
import { TrackOrderModalVanilla } from '../TrackOrderModal.view';

describe('TrackOrderModal component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      className: '',
      openState: true,
      setModalMountState: jest.fn(),
      openLoginOverlay: jest.fn(),
      onSubmit: jest.fn(),
      errorMessage: null,
      showNotification: 'error',
      onChangeForm: jest.fn(),
    };
    const component = shallow(<TrackOrderModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
