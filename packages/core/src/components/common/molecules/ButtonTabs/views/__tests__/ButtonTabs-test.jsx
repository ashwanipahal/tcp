import React from 'react';
import { shallow } from 'enzyme';
import { ButtonTabsVanilla, getActiveStatus } from '../ButtonTabs';

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

  it('Should call getActiveStatus', () => {
    props.selectedTabId = 1;
    const componentWithEqualProp = shallow(<ButtonTabsVanilla {...props} />);
    getActiveStatus(1, 1);
    expect(componentWithEqualProp).toBeDefined();
  });

  it('Should call getActiveStatus with no matching id', () => {
    getActiveStatus(1, 2);
  });

  it('Should call getActiveStatus for collection of data', () => {
    getActiveStatus([], []);
  });
});
