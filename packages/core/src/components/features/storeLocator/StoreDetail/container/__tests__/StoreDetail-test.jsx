import React from 'react';
import { shallow } from 'enzyme';
import { StoreAddressTile, StoreHours } from '../../../../../common/molecules';
import { StoreDetailVanilla } from '../views/StoreDetail';
import mockStore from '../__mocks__/currentStore.mock';
import storesList from '../__mocks__/suggestedStores';
import mockLabels from '../../../../../common/molecules/StoreAddressTile/__mocks__/labels.mock';

describe('StoreDetail component', () => {
  const props = {
    className: 'test',
    store: mockStore.currentStore,
    labels: mockLabels.StoreLocator,
    otherStores: storesList.suggestedStores,
    openStoreDetails: jest.fn(),
    openStoreDirections: jest.fn(),
    routesBack: jest.fn(),
    fetchRichContent: jest.fn(),
  };
  it('StoreDetail component renders correctly with props', () => {
    const component = shallow(<StoreDetailVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('StoreDetail component renders correctly with StoreAddressTile component', () => {
    const component = shallow(<StoreDetailVanilla {...props} />);
    expect(component.find(StoreAddressTile)).toHaveLength(1);
  });
  it('StoreDetail component renders correctly with StoreHours component', () => {
    const component = shallow(<StoreDetailVanilla {...props} />);
    expect(component.find(StoreHours)).toHaveLength(1);
  });
});
