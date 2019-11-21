import React from 'react';
import { shallow } from 'enzyme';
import { StoreListContainer, mapDispatchToProps } from '../StoreList.container';
import StoreList from '../views';
import labelsMock from '../__mocks__/labels.mock';
import list from '../__mocks__/results.mock';

describe('Store List Page', () => {
  const props = {
    labels: labelsMock,
    storeListUS: list.StoreListReducer.storesSummaryListUS,
    storeListCA: list.StoreListReducer.storesSummaryListCA,
    getStoresList: () => null,
  };
  it('should render Store List page', () => {
    const component = shallow(<StoreListContainer {...props} />);
    expect(component.is(StoreList)).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action getStoreList which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getStoresList();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
