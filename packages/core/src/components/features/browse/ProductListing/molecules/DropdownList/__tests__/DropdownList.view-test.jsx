import React from 'react';
import { shallow } from 'enzyme';
import DropdownList from '../views/DropdownList.view';

describe('Drop Down is shown', () => {
  const props = {
    classNamePrefix: '',
    optionsMap: [],
    handleItemClick: jest.fn(),
    highlightedIndex: 0,
    selectedIndex: 1,
    facetName: '',
    autosuggestAnalytics: '',
    className: '',
    query: '',
    dataLocator: '',
    labels: {},
  };
  it('should render Drop Down ', () => {
    const component = shallow(<DropdownList {...props} />);
    expect(component).toMatchSnapshot();
  });
});
