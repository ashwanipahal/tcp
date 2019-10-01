import React from 'react';
import { shallow } from 'enzyme';
import { StyliticsProductTabListContainerVanilla as StyliticsProductTabList } from '../container/StyliticsProductTabList.container';

describe('StyliticsProductTabList', () => {
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
});
