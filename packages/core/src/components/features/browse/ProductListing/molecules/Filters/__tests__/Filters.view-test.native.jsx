import React from 'react';
import { shallow } from 'enzyme';
import { FiltersVanilla } from '../views/Filters.view.native';

describe('FiltersVanilla is shown', () => {
  const props = {
    filters: {
      unbxdDisplayName: [],
    },
    theme: {},
    labelsFilter: {},
  };

  it('should render FiltersVanilla', () => {
    const component = shallow(<FiltersVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
