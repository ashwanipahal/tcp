import React from 'react';
import { shallow } from 'enzyme';
import { MyFavoriteStoreContainer, mapDispatchToProps } from '../MyFavoriteStore.container';
import MyFavoriteStoreComponent from '../../views/MyFavoriteStore.view';

describe('MyFavoriteStore container', () => {
  it('should render MyFavoriteStoreComponent', () => {
    const component = shallow(<MyFavoriteStoreContainer defaultStore="123" />);
    expect(component.is(MyFavoriteStoreComponent)).toBeTruthy();
  });
});

describe('#mapDispatchToProps', () => {
  it('should return an action MyFavoriteStore which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getMyFavoriteStoreDetails();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
