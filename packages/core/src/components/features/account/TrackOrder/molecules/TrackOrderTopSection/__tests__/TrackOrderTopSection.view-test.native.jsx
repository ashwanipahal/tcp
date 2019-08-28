import React from 'react';
import { shallow } from 'enzyme';
import TrackOrderTopSection from '../views/TrackOrderTopSection.view.native';

describe('TrackOrderTopSection component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
    };
    const component = shallow(<TrackOrderTopSection {...props} />);
    expect(component).toMatchSnapshot();
  });
});
