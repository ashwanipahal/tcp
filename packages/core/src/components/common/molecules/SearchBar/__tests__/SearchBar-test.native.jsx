import React from 'react';
import { shallow } from 'enzyme';

import SearchBar from '../views/SearchBar.view.native';

describe('SearchBar native should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchBar />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('SearchBar native should render correctly with showCustomizedSearch', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchBar showCustomizedSearch />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
