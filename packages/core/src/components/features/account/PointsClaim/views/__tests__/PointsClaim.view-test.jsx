import React from 'react';
import { shallow } from 'enzyme';
import { PointsClaimView } from '../PointsClaim.view';

describe('PointsClaim View component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      successMessage: 'SUCCESS',
      errorMessage: 'ERROR',
      onSubmit: () => {},
    };
    const component = shallow(<PointsClaimView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
