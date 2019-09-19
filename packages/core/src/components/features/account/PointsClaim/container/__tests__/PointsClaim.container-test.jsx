import React from 'react';
import { shallow } from 'enzyme';
import PointsClaimView from '../../views';

describe('PointsClaimContainer container', () => {
  it('should render PointsClaim component', () => {
    const props = {
      successMessage: '',
      errorMessage: '',
      labels: {},
      showNotification: '',
      transactionTypesMap: [],
    };
    const tree = shallow(<PointsClaimView claimSubmit={jest.fn()} {...props} />);
    expect(tree.exists()).toBeTruthy();
  });
});
