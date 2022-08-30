import React from 'react';
import { shallow } from 'enzyme';
import { StoreAddressTile, StoreHours } from '../../../../../common/molecules';
import StoreDetail from '../views/StoreDetail.native';
import mockStore from '../__mocks__/currentStore.mock';
import mockLabels from '../../../../../common/molecules/StoreAddressTile/__mocks__/labels.mock';

describe('StoreDetail component', () => {
  const props = {
    store: mockStore.currentStore,
    labels: mockLabels.StoreLocator,
    openStoreDirections: jest.fn(),
    openCallStore: jest.fn(),
    dialStoreNumber: jest.fn(),
    openMoreStores: jest.fn(),
    isFavorite: true,
    setFavoriteStore: jest.fn(),
  };
  it('StoreDetail component renders correctly with props', () => {
    const component = shallow(<StoreDetail {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('StoreDetail component renders correctly with StoreAddressTile component', () => {
    const component = shallow(<StoreDetail {...props} />);
    expect(component.find(StoreAddressTile)).toHaveLength(1);
  });
  it('StoreDetail component renders correctly with StoreHours component', () => {
    const component = shallow(<StoreDetail {...props} />);
    expect(component.find(StoreHours)).toHaveLength(1);
  });
});
