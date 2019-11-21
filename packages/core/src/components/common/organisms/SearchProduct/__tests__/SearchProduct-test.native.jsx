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
    const setRecentSearches = jest.fn();
    wrapper.setProps({ goToSearchResultsPage, setRecentSearches });
    wrapper.instance().searchProducts('pants');
    expect(wrapper.instance().state.modalVisible).toBeFalsy();
    expect(goToSearchResultsPage).toHaveBeenCalled();
    expect(setRecentSearches).toHaveBeenCalled();
  });

  it('should clear search text', () => {
    wrapper.instance().clearSearchText();
    expect(wrapper.instance().state.searchText.length).toBe(0);
  });

  it('should search product on submit editing', () => {
    const goToSearchResultsPage = jest.fn();
    wrapper.setProps({ goToSearchResultsPage });
    wrapper.instance().setState({ searchText: 'Pants' });
    const textInput = wrapper.find('Styled(TextInput)');
    textInput.props().onSubmitEditing();
    expect(goToSearchResultsPage).toHaveBeenCalled();
  });

  it('should render item in list', () => {
    let listItem = shallow(wrapper.instance().renderItem({ item: { text: 'Shoes' } }));
    expect(listItem.find('Styled(BodyCopy)').length).toBe(1);
    wrapper.instance().setState({ searchText: 'ho' });
    listItem = shallow(wrapper.instance().renderItem({ item: { text: 'Shoes' } }));
    expect(listItem.find('Styled(BodyCopy)').length).toBe(3);
  });
});
