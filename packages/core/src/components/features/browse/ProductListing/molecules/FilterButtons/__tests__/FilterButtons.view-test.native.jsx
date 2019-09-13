import React from 'react';
import { shallow } from 'enzyme';
import { FilterButtonsVanilla } from '../views/FilterButtons.view.native';

describe('FilterButtons component', () => {
  const props = {
    props: {},
    labelsFilter: {
      lbl_filter: 'FILTER',
      lbl_sort: 'SORT',
    },
    onPressFilter: () => {},
    onPressSort: () => {},
    selected: false,
  };
  it('should renders FilterButtons correctly', () => {
    const component = shallow(<FilterButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
