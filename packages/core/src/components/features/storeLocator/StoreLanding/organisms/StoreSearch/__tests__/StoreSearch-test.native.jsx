import React from 'react';
import { FlatList } from 'react-native';
import { shallow } from 'enzyme';
import theme from '@tcp/core/styles/themes/TCP';
import { Field } from 'redux-form';
import { StoreSearchVanilla } from '../views/StoreSearch.native';
import labels from '../../../container/__mocks__/storeSearchData';

describe('StoreSearch component', () => {
  let props = {
    handleSubmit: jest.fn(),
    labels,
    theme,
    loadStoresByCoordinates: jest.fn(),
  };

  it('should be defined', () => {
    const component = shallow(<StoreSearchVanilla {...props} />);
    expect(component).toBeDefined();
  });

  it('component renders correctly with proper elements', () => {
    const component = shallow(<StoreSearchVanilla {...props} />);
    const item = { name: 'test', dataLocator: 'gymboree-store-option' };
    component
      .find(FlatList)
      .props()
      .renderItem({ item });
    component
      .find(Field)
      .props()
      .refs();
    component
      .find(Field)
      .props()
      .onSubmitEditing();
    expect(component).toMatchSnapshot();
  });

  it('StoreSearch component renders with errors', () => {
    props = {
      ...props,
      error: 'you have an error in the component',
    };
    const component = shallow(<StoreSearchVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('StoreSearch component renders correctly props', () => {
    const component = shallow(<StoreSearchVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('StoreSearch component renders correctly props', () => {
    const modifiedProps = {
      ...props,
      mapView: true,
    };
    const component = shallow(<StoreSearchVanilla {...modifiedProps} />);
    component.setState({
      errorNotFound: true,
    });
    expect(component).toMatchSnapshot();
  });

  it('handleLocationSelection calls loadStoresByCoordinates', () => {
    const component = shallow(<StoreSearchVanilla {...props} />);
    const location = {
      geometry: {
        location: {
          lat: 22,
          lng: 77,
        },
      },
    };
    component.instance().handleLocationSelection(location);
    expect(props.loadStoresByCoordinates).toHaveBeenCalled();
  });

  it('handleLocationSelection calls loadStoresByCoordinates - no geometry', () => {
    const modifiedProps = {
      ...props,
      submitting: true,
    };
    const component = shallow(<StoreSearchVanilla {...modifiedProps} />);
    const location = {};
    const returnValue = component.instance().handleLocationSelection(location);
    expect(returnValue).toBeFalsy();
  });

  it('onSelectStore should return', () => {
    const eventGym = [true, undefined, undefined, 'gymboreeStoreOption'];
    const eventOutlet = [true, undefined, undefined, 'outletOption'];
    const test = [true, undefined, undefined, 'testOption'];
    const selectStoreType = jest.fn();
    const component = shallow(<StoreSearchVanilla {...props} selectStoreType={selectStoreType} />);
    const returnValueGym = component.instance().onSelectStore(eventGym);
    const returnValueOutlet = component.instance().onSelectStore(eventOutlet);
    component.instance().onSelectStore(test);
    expect(returnValueGym).toBeTruthy();
    expect(returnValueOutlet).toBeTruthy();
  });

  it('onSearch should return with error', () => {
    const component = shallow(<StoreSearchVanilla {...props} />);
    component.instance().onSearch();
    expect(component.instance().state.errorNotFound).toBeTruthy();
  });
});
