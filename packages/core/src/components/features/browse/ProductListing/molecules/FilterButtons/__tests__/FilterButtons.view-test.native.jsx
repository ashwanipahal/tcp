import React from 'react';
import { shallow } from 'enzyme';
import ColorSwitch from '../views/FilterButtons.view.native';

describe('FilterButtons component', () => {
  const props = {
    props: {},
    labelsFilter: {
      lbl_filter: 'FILTER',
      lbl_sort: 'SORT',
    },
    onPressFilter: () => {},
    onPressSort: () => {},
  };
  it('should renders FilterButtons correctly', () => {
    const component = shallow(<ColorSwitch {...props} />);
    expect(component).toMatchSnapshot();
  });
});
