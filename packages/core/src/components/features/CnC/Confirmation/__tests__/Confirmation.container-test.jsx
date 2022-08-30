import React from 'react';
import { shallow } from 'enzyme';
import {
  ConfirmationContainerVanilla,
  mapDispatchToProps,
} from '../container/Confirmation.container';

describe('ConfirmationContainer', () => {
  it('should render correctly', () => {
    const mockedFetchUpdateOrderDetails = jest.fn();
    const mockedFetchModuleXContent = jest.fn();
    const props = {
      fetchUpdateOrderDetails: mockedFetchUpdateOrderDetails,
      fetchModuleXContent: mockedFetchModuleXContent,
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
    const mockedFetchModuleXContent = jest.fn();
    const props = {
      fetchUpdateOrderDetails: mockedFetchUpdateOrderDetails,
      fetchModuleXContent: mockedFetchModuleXContent,
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
  it('should call fetchModuleXContent in mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.fetchModuleXContent();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
