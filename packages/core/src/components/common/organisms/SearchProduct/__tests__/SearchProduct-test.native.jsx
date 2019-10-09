import React from 'react';
import { shallow } from 'enzyme';

import { SearchProductVanilla } from '../views/SearchProduct.view.native';

describe('SearchProduct should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchProductVanilla />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should close modal', () => {
    const closeSearchModal = jest.fn();
    wrapper.setProps({ closeSearchModal });
    wrapper.instance().closeModal();
    expect(wrapper.instance().state.modalVisible).toBeFalsy();
    expect(closeSearchModal).toHaveBeenCalled();
  });

  it('should start search on change text', () => {
    const startSearch = jest.fn();
    wrapper.setProps({ startSearch });
    wrapper.instance().onChangeText('p');
    expect(startSearch).toHaveBeenCalledTimes(0);
    wrapper.instance().onChangeText('pant');
    expect(startSearch).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().state.searchText).toBe('pant');
  });

  it('should go to srp on search', () => {
    const goToSearchResultsPage = jest.fn();
    wrapper.setProps({ goToSearchResultsPage });
    wrapper.instance().searchProducts('pants');
    expect(wrapper.instance().state.modalVisible).toBeFalsy();
    expect(goToSearchResultsPage).toHaveBeenCalled();
  });
});
