import React from 'react';
import { shallow } from 'enzyme';
import {
  ConfirmationContainerVanilla,
  mapDispatchToProps,
} from '../container/Confirmation.container';

describe('ConfirmationContainer', () => {
  it('should render correctly', () => {
    const mockedFetchUpdateOrderDetails = jest.fn();
    const props = {
      fetchUpdateOrderDetails: mockedFetchUpdateOrderDetails,
      orderNumbersByFullfillmentCenter: {
        fullfillmentCenterMap: [
          {
            orderType: 'BOSS',
          },
        ],
      },
      updateOrderDetailsBossId: 'boss-id',
      updateOrderDetailsBopisId: 'bopis-id',
    };
    const tree = shallow(<ConfirmationContainerVanilla {...props} />);
    expect(mockedFetchUpdateOrderDetails).toBeCalled();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with Bopis item', () => {
    const mockedFetchUpdateOrderDetails = jest.fn();
    const props = {
      fetchUpdateOrderDetails: mockedFetchUpdateOrderDetails,
      orderNumbersByFullfillmentCenter: {
        fullfillmentCenterMap: [
          {
            orderType: 'BOPIS',
          },
        ],
      },
      updateOrderDetailsBossId: 'boss-id',
      updateOrderDetailsBopisId: 'bopis-id',
    };
    const tree = shallow(<ConfirmationContainerVanilla {...props} />);
    expect(mockedFetchUpdateOrderDetails).toBeCalled();
    expect(tree).toMatchSnapshot();
  });
  it('should call mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.fetchUpdateOrderDetails();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
