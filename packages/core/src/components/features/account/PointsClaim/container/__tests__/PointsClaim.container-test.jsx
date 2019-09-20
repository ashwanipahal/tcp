import React from 'react';
import { shallow } from 'enzyme';
import PointsClaimView from '../../views';
import { getSiteId } from '../../../../../../utils/utils.web';

jest.mock('../../../../../../utils/utils.web', () => ({
  getSiteId: jest.fn(),
}));

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

  it('should not render if site id is ca', () => {
    getSiteId.mockImplementation(() => 'ca');
    const props = {
      successMessage: '',
      errorMessage: '',
      labels: {},
      showNotification: '',
      transactionTypesMap: [],
    };
    const tree = shallow(<PointsClaimView claimSubmit={jest.fn()} {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
