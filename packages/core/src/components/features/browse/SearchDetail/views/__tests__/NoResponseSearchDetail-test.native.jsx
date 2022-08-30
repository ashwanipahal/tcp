import React from 'react';
import { shallow } from 'enzyme';
import { NoResponseSearchDetailVanilla } from '../NoResponseSearchDetail.view.native';

describe('NoResponseSearchDetailVanilla component', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      searchedText: '',
      slpLabels: {
        lbl_no_suggestion: '',
        lbl_didYouMean: '',
        lbl_tips: '',
        lbl_check_your_spelling: '',
        lbl_simplified_keywords: '',
        lbl_try_searching: '',
        lbl_narrow_searches: '',
      },
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
