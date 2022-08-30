import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line import/no-named-as-default
import TrackOrderModal from '../TrackOrderModal.view.native';

describe('TrackOrderModal component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      openState: true,
      setModalMountState: jest.fn(),
      onSubmit: jest.fn(),
      errorMessage: null,
      showNotification: 'error',
      onChangeForm: jest.fn(),
      handleToggle: jest.fn(),
    };
    const component = shallow(<TrackOrderModal {...props} />);
    expect(component).toMatchSnapshot();
  });
});
