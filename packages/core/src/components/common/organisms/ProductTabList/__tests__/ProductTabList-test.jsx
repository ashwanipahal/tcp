import React from 'react';
import { shallow } from 'enzyme';
import { ProductTabListContainerVanilla as ProductTabList } from '../container/ProductTabList.container';

describe('ProductTabList', () => {
  it('Should call dispatch function if product list category data is not available ', () => {
    const getProductTabListData = jest.fn();
    shallow(
      <ProductTabList
        tabItems={[
          {
            text: {
              text: 'test',
            },
            category: [
              {
                key: 'cat_id',
                val: '123',
              },
              {
                key: 'cat_id',
                val: '123',
              },
            ],
          },
        ]}
        getProductTabListData={getProductTabListData}
      />
    );

    expect(getProductTabListData).not.toHaveBeenCalled();
  });

  it('Should NOT call dispatch function if product list category data is  available ', () => {
    const getProductTabListData = jest.fn();
    shallow(
      <ProductTabList
        productTabList={{
          '2': {},
        }}
        tabItems={[
          {
            text: {
              text: 'test',
            },
            category: [
              {
                key: 'cat_id',
                val: '123',
              },
              {
                key: 'cat_id',
                val: '123',
              },
            ],
          },
        ]}
        getProductTabListData={getProductTabListData}
      />
    );
    expect(getProductTabListData).not.toHaveBeenCalled();
  });

  it('Should NOT call dispatch function if category data is not available ', () => {
    const getProductTabListData = jest.fn();
    shallow(
      <ProductTabList
        tabItems={[
          {
            text: {
              text: 'test',
            },
            category: [],
          },
        ]}
        getProductTabListData={getProductTabListData}
      />
    );

    expect(getProductTabListData).not.toHaveBeenCalled();
  });

  it('Should provide selected tab item on tab selection ', () => {
    const onProductTabChangeMock = jest.fn();
    const tabItems = [
      {
        text: {
          text: 'test',
        },
        category: [
          {
            key: 'cat_id',
            val: '2',
          },
        ],
      },
      {
        text: {
          text: 'test 2',
        },
        category: [
          {
            key: 'cat_id',
            val: '2',
          },
        ],
      },
    ];

    shallow(<ProductTabList tabItems={tabItems} onProductTabChange={onProductTabChangeMock} />);

    expect(onProductTabChangeMock).not.toHaveBeenCalled();
  });
});
