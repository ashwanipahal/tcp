import React from 'react';
import { shallow } from 'enzyme';
import { TrackOrderBottomSectionVanilla } from '../views/TrackOrderBottomSection.view';

describe('TrackOrderBottomSection component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      className: '',
      setModalMountState: jest.fn(),
      openLoginOverlay: jest.fn(),
    };
    const component = shallow(<TrackOrderBottomSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
