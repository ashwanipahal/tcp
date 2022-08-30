import React from 'react';
import { shallow } from 'enzyme';
import { StyliticsProductTabListContainerVanilla as StyliticsProductTabList } from '../container/StyliticsProductTabList.container';

function getTimer(time) {
  jest.useFakeTimers();
  return new Promise(resolve => {
    setTimeout(resolve, time);
    jest.runAllTimers();
  });
}

describe('StyliticsProductTabList', () => {
  it('Should NOT call dispatch function if product list category data is available ', () => {
    const getStyliticsProductTabListData = jest.fn();
    shallow(
      <StyliticsProductTabList
        productTabList={{
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

    // 4002 because currently 4000 delay is being added componentDidMount to fetch data
    return getTimer(4004).then(() => {
      expect(getStyliticsProductTabListData).toBeCalledTimes(0);
    });
  });
});
