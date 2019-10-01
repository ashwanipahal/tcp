import React from 'react';
import { shallow, mount } from 'enzyme';
import { StyliticsProductTabListContainerVanilla as StyliticsProductTabList } from '../container/StyliticsProductTabList.container';

describe('StyliticsProductTabList', () => {
  it('Should call dispatch function if product list category data is not available ', () => {
    const getStyliticsProductTabListData = jest.fn();
    mount(
      <StyliticsProductTabList
        tabItems={[
          {
            text: {
              text: 'test',
            },
            category: {
              cat_id: '2',
            },
          },
        ]}
        getStyliticsProductTabListData={getStyliticsProductTabListData}
      />
    );

    expect(getStyliticsProductTabListData).toBeCalledTimes(1);
  });

  it('Should NOT call dispatch function if product list category data is  available ', () => {
    const getStyliticsProductTabListData = jest.fn();
    shallow(
      <StyliticsProductTabList
        StyliticsProductTabList={{
          '2': {},
        }}
        tabItems={[
          {
            text: {
              text: 'test',
            },
            category: {
              cat_id: '2',
            },
          },
        ]}
        getStyliticsProductTabListData={getStyliticsProductTabListData}
      />
    );
    expect(getStyliticsProductTabListData).toBeCalledTimes(0);
  });

  it('Should NOT call dispatch function if category data is not available ', () => {
    const getStyliticsProductTabListData = jest.fn();
    shallow(
      <StyliticsProductTabList
        tabItems={[
          {
            text: {
              text: 'test',
            },
          },
        ]}
        getStyliticsProductTabListData={getStyliticsProductTabListData}
      />
    );

    expect(getStyliticsProductTabListData).toBeCalledTimes(0);
  });

  it('Should provide selected tab item on tab selection ', () => {
    const onProductTabChangeMock = jest.fn();
    const tabItems = [
      {
        text: {
          text: 'test',
        },
        category: {
          cat_id: '2',
        },
      },
      {
        text: {
          text: 'test 2',
        },
        category: {
          cat_id: '3',
        },
      },
    ];

    shallow(
      <StyliticsProductTabList tabItems={tabItems} onProductTabChange={onProductTabChangeMock} />
    );

    expect(onProductTabChangeMock).toHaveBeenCalledWith('2', tabItems[0]);
  });
});
