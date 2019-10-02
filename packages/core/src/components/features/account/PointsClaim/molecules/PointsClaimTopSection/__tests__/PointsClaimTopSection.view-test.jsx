import React from 'react';
import { shallow } from 'enzyme';
import { PointsClaimTopSection } from '../views/PointsClaimTopSection.view';

describe('PointsClaimTopSection component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        common: {},
      },
    };
    const component = shallow(<PointsClaimTopSection {...props} />);
    expect(component).toMatchSnapshot();
  });
});
