import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { AppliedFiltersListVanilla } from '../views/AppliedFiltersList.view';

describe('Custom Select is shown', () => {
  const props = {
    appliedFilters: fromJS({
      categoryPath2_uFilter: ['Essentials Shop', 'Shoes & Accessories'],
      unbxd_price_range_uFilter: [],
    }),
    onRemoveFilter: jest.fn(),
    removeAllFilters: jest.fn(),
    labels: {
      lbl_filtering_by: 'filtering By',
      lbl_clear: 'Clear All',
    },
    className: '',
  };
  it('should render Applied Filter Lists ', () => {
    const component = shallow(<AppliedFiltersListVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
