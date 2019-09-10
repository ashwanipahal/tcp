import React from 'react';
import { shallow } from 'enzyme';
import ProductTabList from '../views';

function getTimer(time) {
  jest.useFakeTimers();
  return new Promise(resolve => {
    setTimeout(resolve, time);
    jest.runAllTimers();
  });
}

describe('ProductTabList', () => {
  it('Should call dispatch function if product list category data is not available ', () => {
    const getProductTabListData = jest.fn();
    shallow(
      <ProductTabList
        categoryList={[
          {
            text: 'test',
            catId: '2',
          },
        ]}
        getProductTabListData={getProductTabListData}
      />
    );

    // 4002 because currently 4000 delay is being added componentDidMount to fetch data
    return getTimer(4002).then(() => {
      expect(getProductTabListData).toBeCalledTimes(1);
    });
  });

  it('Should NOT call dispatch function if product list category data is  available ', () => {
    const getProductTabListData = jest.fn();
    shallow(
      <ProductTabList
        productTabList={{
          '2': {},
        }}
        categoryList={[
          {
            text: 'test',
            catId: '2',
          },
        ]}
        getProductTabListData={getProductTabListData}
      />
    );

    // 4002 because currently 4000 delay is being added componentDidMount to fetch data
    return getTimer(4002).then(() => {
      expect(getProductTabListData).toBeCalledTimes(0);
    });
  });

  it('Should NOT call dispatch function if category data is not available ', () => {
    const getProductTabListData = jest.fn();
    shallow(
      <ProductTabList
        categoryList={[
          {
            text: 'test',
          },
        ]}
        getProductTabListData={getProductTabListData}
      />
    );

    // 4002 because currently 4000 delay is being added componentDidMount to fetch data
    return getTimer(4004).then(() => {
      expect(getProductTabListData).toBeCalledTimes(0);
    });
  });
});
