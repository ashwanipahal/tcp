import React from 'react';
import { shallow } from 'enzyme';
import CustomSelect from '../views/CustomSelect.view';

describe('Custom Select is shown', () => {
  const props = {
    title: '',
    disabled: false,
    allowMultipleSelections: false,
    placeholder: '',
    buttonIconClosed: '',
    buttonIconExpanded: '',
    className: '',
    optionsMap: {},
    input: {},
    onCloseCallback: jest.fn(),
    onExpandCallback: jest.fn(),
    tabIndex: 0,
    expanded: false,
    disableExpandStateChanges: false,
    selectOnHighlight: false,
    showErrorIfUntouched: false,
    selectTextOverride: '',
    facetName: '',
    appliedFilterVal: 1,
    labels: {},
  };
  it('should render Custom Select ', () => {
    const component = shallow(<CustomSelect {...props} />);
    expect(component).toMatchSnapshot();
  });
});
