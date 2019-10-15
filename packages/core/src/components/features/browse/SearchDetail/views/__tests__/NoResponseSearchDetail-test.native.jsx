import React from 'react';
import { shallow } from 'enzyme';
import { NoResponseSearchDetailVanilla } from '../NoResponseSearchDetail.view.native';

describe('NoResponseSearchDetailVanilla component', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      searchedText: '',
      slpLabels: {},
      labels: {
        lbl_search_whats_trending: '',
        lbl_search_recent_search: '',
        lbl_search_looking_for: '',
        lbl_search_product_matches: '',
      },
      searchResultSuggestions: [],
    };
    wrapper = shallow(<NoResponseSearchDetailVanilla {...props} />);
  });

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
