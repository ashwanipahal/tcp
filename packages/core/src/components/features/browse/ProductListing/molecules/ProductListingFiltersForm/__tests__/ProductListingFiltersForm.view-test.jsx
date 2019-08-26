import React from 'react';
import { shallow } from 'enzyme';
import ProductListingFiltersForm from '../views/ProductListingFiltersForm.view';

describe('ProductListingFiltersForm is shown', () => {
  const props = {
    filters: {},
    labels: {},
  };
  it('should render ProductListingFiltersForm', () => {
    const component = shallow(<ProductListingFiltersForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
