import React from 'react';
import { shallow } from 'enzyme';
import { ProductTabListContainerVanilla as ProductTabList } from '../container/ProductTabList.container';

function deferred() {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}

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
                val: '2',
              },
            ],
          },
        ]}
        getProductTabListData={getProductTabListData}
      />
    );

    return deferred().then(() => {
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
        tabItems={[
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
        tabItems={[
          {
            text: {
              text: 'test',
            },
          },
        ]}
        getProductTabListData={getProductTabListData}
      />
    );

    expect(getProductTabListData).toBeCalledTimes(0);
  });

  it('Should provide selected tab item on tab selection ', () => {
    const onProductTabChangeMock = jest.fn();
    const tabItems = [{ category: [{ key: 'cat_id', val: '2' }], text: { text: 'test' } }];

    shallow(<ProductTabList tabItems={tabItems} onProductTabChange={onProductTabChangeMock} />);

    return deferred().then(() => {
      expect(onProductTabChangeMock).toHaveBeenCalledWith(['2'], tabItems[0]);
    });
  });
});
