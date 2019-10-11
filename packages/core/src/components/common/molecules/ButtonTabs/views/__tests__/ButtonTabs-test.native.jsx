import React from 'react';
import { shallow } from 'enzyme';
import ButtonTabs from '../ButtonTabs.native';

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
  const component = shallow(<ButtonTabs {...props} />);
  it('Should be defined ', () => {
    expect(component).toBeDefined();
  });
});
