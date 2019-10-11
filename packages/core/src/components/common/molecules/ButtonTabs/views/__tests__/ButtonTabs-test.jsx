import React from 'react';
import { shallow } from 'enzyme';
import { ButtonTabsVanilla } from '../ButtonTabs';

describe('ButtonTabs', () => {
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
  const component = shallow(<ButtonTabsVanilla {...props} />);
  it('Should be defined ', () => {
    expect(component).toBeDefined();
  });
});
