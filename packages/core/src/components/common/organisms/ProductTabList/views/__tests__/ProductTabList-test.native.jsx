import React from 'react';
import { shallow } from 'enzyme';
import ProductTabList from '../ProductTabList.native';

describe('ProductTabList', () => {
  const props = {
    className: 'demo',
    tabs: [
      {
        label: 'abc',
        id: 1,
      },
      {
        label: 'abc',
        id: 1,
      },
      {
        label: 'abc',
        id: 1,
      },
    ],
    selectedTabId: ['abv'],
    onTabChange: jest.fn(),
    dataLocator: 'data',
  };
  const component = shallow(<ProductTabList {...props} />);
  it('Should be defined ', () => {
    expect(component).toBeDefined();
  });
});
