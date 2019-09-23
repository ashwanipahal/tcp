import React from 'react';
import { shallow } from 'enzyme';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
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

  it('should renders Noticifaction for error message', () => {
    const props = {
      labels: {
        common: {},
      },
      successMessage: 'success',
      errorMessage: 'error',
    };
    const component = shallow(<PointsClaimForm {...props} />);
    expect(component.find(Notification)).toHaveLength(1);
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
    component.setState({ type: 'in-store' });
    expect(component.find('.image_container')).toHaveLength(1);
  });
});
