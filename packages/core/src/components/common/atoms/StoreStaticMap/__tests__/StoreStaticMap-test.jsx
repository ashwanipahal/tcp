import React from 'react';
import { shallow } from 'enzyme';
import StoreStaticMap from '../views/StoreStaticMap';
import list from '../stories/storesList';
import { isCanada, getViewportInfo } from '../../../../../utils';

describe('StoreStaticMap component', () => {
  const apiKey = 'AIzaSyCzOG6DZLR-haS8xvPOr73KkIWPMBbTVI8';
  it('StoreStaticMap component renders correctly without props', () => {
    const component = shallow(<StoreStaticMap />);
    expect(component).toMatchSnapshot();
  });

  it('StoreStaticMap component renders correctly with props', () => {
    const props = {
      storesList: list,
      isCanada,
      isMobile: getViewportInfo().isMobile,
      apiKey,
    };
    const component = shallow(<StoreStaticMap {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('StoreStaticMap component renders correctly with map', () => {
    const props = {
      storesList: list,
      isCanada,
      isMobile: getViewportInfo().isMobile,
      apiKey,
    };
    const component = shallow(<StoreStaticMap {...props} />);
    expect(component).toHaveLength(1);
  });
  it('StoreStaticMap component renders correctly with particular store mark in map', () => {
    const props = {
      storesList: list,
      isCanada,
      isMobile: getViewportInfo().isMobile,
      centeredStoreId: '110850',
      apiKey,
    };
    const component = shallow(<StoreStaticMap {...props} />);
    expect(component).toHaveLength(1);
  });
});
