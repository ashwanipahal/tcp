import React from 'react';
import { shallow } from 'enzyme';
import { TrackOrderTopSectionVanilla } from '../views/TrackOrderTopSection.view';

describe('TrackOrderTopSection component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        trackOrder: {},
      },
      className: '',
    };
    const component = shallow(<TrackOrderTopSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
