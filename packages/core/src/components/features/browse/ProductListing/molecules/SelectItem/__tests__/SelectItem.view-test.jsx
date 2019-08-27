import React from 'react';
import { shallow } from 'enzyme';
import SelectItem from '../views/SelectItem.view';

describe('Select Item is shown', () => {
  const props = {
    className: 'Test',
    index: 0,
    content: {},
    highlighted: false,
    clickHandler: jest.fn(),
    highlightedRefCapturer: jest.fn(),
    docType: '',
    facetName: 'categoryPath2_uFilter',
    value: 'Sample Value',
    isAutosuggestAnalytics: 'PropTypes.string.isRequired',
    title: 'Sample Title',
    query: 'Sample Query',
  };
  it('should render select item ', () => {
    const component = shallow(<SelectItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
