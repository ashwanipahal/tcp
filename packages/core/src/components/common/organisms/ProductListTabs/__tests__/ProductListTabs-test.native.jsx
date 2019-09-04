import React from 'react';
import { shallow } from 'enzyme';
import ProductListTabs from '../views';

function getTimer(time) {
  jest.useFakeTimers();
  return new Promise(resolve => {
    setTimeout(resolve, time);
    jest.runAllTimers();
  });
}

describe('ProductListTabs', () => {
  it('Should call dispatch function if product list category data is not available ', () => {
    const getProductListTabsData = jest.fn();
    shallow(
      <ProductListTabs
        categoryList={[
          {
            text: 'test',
            catId: '2',
          },
        ]}
        getProductListTabsData={getProductListTabsData}
      />
    );

    // 4002 because currently 4000 delay is being added componentDidMount to fetch data
    return getTimer(4002).then(() => {
      expect(getProductListTabsData).toBeCalledTimes(1);
    });
  });

  it('Should NOT call dispatch function if product list category data is  available ', () => {
    const getProductListTabsData = jest.fn();
    shallow(
      <ProductListTabs
        productListTabs={{
          '2': {},
        }}
        categoryList={[
          {
            text: 'test',
            catId: '2',
          },
        ]}
        getProductListTabsData={getProductListTabsData}
      />
    );

    // 4002 because currently 4000 delay is being added componentDidMount to fetch data
    return getTimer(4002).then(() => {
      expect(getProductListTabsData).toBeCalledTimes(0);
    });
  });

  it('Should NOT call dispatch function if category data is not available ', () => {
    const getProductListTabsData = jest.fn();
    shallow(
      <ProductListTabs
        categoryList={[
          {
            text: 'test',
          },
        ]}
        getProductListTabsData={getProductListTabsData}
      />
    );

    // 4002 because currently 4000 delay is being added componentDidMount to fetch data
    return getTimer(4004).then(() => {
      expect(getProductListTabsData).toBeCalledTimes(0);
    });
  });
});
