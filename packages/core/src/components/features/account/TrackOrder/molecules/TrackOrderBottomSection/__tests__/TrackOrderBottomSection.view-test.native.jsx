import React from 'react';
import { shallow } from 'enzyme';
import TrackOrderBottomSection from '../views/TrackOrderBottomSection.view.native';

describe('TrackOrderBottomSection component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      toggleModal: jest.fn(),
    };
    const component = shallow(<TrackOrderBottomSection {...props} />);
    expect(component).toMatchSnapshot();
  });
});
