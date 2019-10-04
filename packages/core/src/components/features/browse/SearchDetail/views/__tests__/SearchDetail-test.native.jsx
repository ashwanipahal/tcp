import React from 'react';
import { shallow } from 'enzyme';

import { SearchDetailVanilla } from '../SearchDetail.view.native';

describe('ProductAddToBagVanilla native should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchDetailVanilla searchedText="Pink Dress" />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render expected number of components', () => {
    expect(wrapper.find('View').length).toBe(2);
  });
});
