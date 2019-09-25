import React from 'react';
import { shallow } from 'enzyme';
import { PointsClaimForm } from '../PointsClaimForm.view';

describe('PointsClaimForm component', () => {
  it('should renders correctly in initial state', () => {
    const props = {
      labels: {
        common: {},
      },
      successMessage: '',
      errorMessage: '',
    };
    const component = shallow(<PointsClaimForm {...props} />);
    expect(component.exists()).toBeTruthy();
  });

  it('should renders correctly with success and error', () => {
    const props = {
      labels: {
        common: {},
      },
      successMessage: 'success',
      errorMessage: 'error',
    };
    const component = shallow(<PointsClaimForm {...props} />);
    expect(component.exists()).toBeTruthy();
  });

  it('should renders sample reciept image for in-store option', () => {
    const props = {
      labels: {
        common: {},
      },
      successMessage: 'success',
      errorMessage: 'error',
    };

    const component = shallow(<PointsClaimForm {...props} />);
    component.setState({ type: 'In-Store' });
    expect(component.find('.image_container')).toHaveLength(1);
  });
});
