import React from 'react';
import { shallow } from 'enzyme';
import ProductTabList from '../views';

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

    expect(getProductTabListData).toBeCalledTimes(1);
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
    expect(getProductTabListData).toBeCalledTimes(0);
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

    expect(getProductTabListData).toBeCalledTimes(0);
  });
});
