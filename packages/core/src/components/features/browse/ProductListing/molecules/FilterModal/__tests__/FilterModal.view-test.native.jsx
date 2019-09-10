import React from 'react';
import { shallow } from 'enzyme';
import { FilterModalVanilla } from '../views/FilterModal.view';

describe('FilterModal is shown', () => {
  const props = {
    filters: {},
    theme: {},
    labelsFilter: {},
  };
  it('should render FilterModal when show is false', () => {
    const component = shallow(<FilterModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
