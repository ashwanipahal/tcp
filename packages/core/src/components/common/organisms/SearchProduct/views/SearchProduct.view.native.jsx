import React from 'react';
import { Modal, SectionList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BodyCopy, Button } from '../../../atoms';
import CustomIcon from '../../../atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../atoms/Icon/Icon.constants';
import SearchContainer, {
  HeaderContainer,
  ItemContainer,
  TextInput,
  SafeAreaView,
  CloseButton,
} from '../SearchProduct.style.native';
import { getSearchResult } from '../../../molecules/SearchBar/SearchBar.actions';
import { getLabelValue } from '../../../../../utils/index.native';

class SearchProduct extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      showRecentSearches: true,
      searchText: '',
      extraDataForSearch: '',
      listData: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { searchResults } = nextProps;
    const { searchResults: prevSearchResults, labels: slpLabels } = this.props;

    if (searchResults && searchResults !== prevSearchResults) {
      const { autosuggestList } = searchResults;
      const lookingForLabel = getLabelValue(slpLabels, 'lbl_search_looking_for');
      const lookingForData = autosuggestList.find(data => data.heading === lookingForLabel);
      const { suggestions } = lookingForData;
      // sets data with looking for results
      this.setState({
        listData: [
          {
            title: lookingForLabel,
            data: suggestions,
          },
        ],
      });
    }
  }

  /**
   * @function closeModal
   * closes search modal
   *
   * @memberof SearchProduct
   */
  closeModal = () => {
    this.setState({ modalVisible: false }, () => {
      const { closeSearchModal } = this.props;
      if (closeSearchModal) closeSearchModal();
    });
  };

  /**
   * @function onChangeText
   * called when text changes on search bar
   *
   * @memberof SearchProduct
   */
  onChangeText = text => {
    const { startSearch, labels } = this.props;
    const { searchText } = this.state;

    // should start search only after 2 characters are entered
    const shouldSearch = text.length >= 2 || searchText.length > text.length;
    if (startSearch && shouldSearch)
      startSearch({
        searchText: text,
        slpLabels: labels,
      });

    this.setState({
      searchText: text,
      extraDataForSearch: shouldSearch ? text : '',
      showRecentSearches: text.length < 2,
    });
  };

  /**
   * @function searchProducts
   * navigates to search result page with search text in param
   *
   * @memberof SearchProduct
   */
  searchProducts = name => {
    this.setState({ modalVisible: false }, () => {
      const { searchText } = this.state;
      const { goToSearchResultsPage } = this.props;
      const selectedSearchResult = name || searchText;
      if (goToSearchResultsPage) goToSearchResultsPage(selectedSearchResult);
    });
  };

  /**
   * @function clearSearchText
   * clears search text
   *
   * @memberof SearchProduct
   */
  clearSearchText = () => {
    this.onChangeText('');
  };

  /**
   * @function renderSearchContainer
   * renders search container with search bar
   *
   * @memberof SearchProduct
   */
  renderSearchContainer = () => {
    const cancelStyle = { borderWidth: 0 };
    const canceTextStyle = { textTransform: 'none', fontWeight: 'normal' };
    const { searchText } = this.state;
    return (
      <SearchContainer>
        <CustomIcon
          iconFontName={ICON_FONT_CLASS.Icomoon}
          name={ICON_NAME.search}
          size="fs25"
          color="blue.500"
        />
        <TextInput
          returnKeyType="search"
          onChangeText={this.onChangeText}
          autoFocus
          value={searchText}
          onSubmitEditing={() => {
            const { searchText: text } = this.state;
            this.searchProducts(text);
          }}
        />
        {searchText.length > 0 ? (
          <CloseButton>
            <CustomIcon
              iconFontName={ICON_FONT_CLASS.Icomoon}
              name={ICON_NAME.large}
              size="fs10"
              color="gray.900"
              isButton
              onPress={this.clearSearchText}
            />
          </CloseButton>
        ) : (
          <CustomIcon
            iconFontName={ICON_FONT_CLASS.Icomoon}
            name={ICON_NAME.qrcode}
            size="fs25"
            color="gray.600"
          />
        )}
        <Button
          buttonVariation="fixed-width"
          text="Cancel"
          fontSize="fs13"
          fontWeight="regular"
          fontFamily="secondary"
          onPress={this.closeModal}
          customTextStyle={canceTextStyle}
          style={cancelStyle}
        />
      </SearchContainer>
    );
  };

  /**
   * @function renderSectionHeader
   * renders section header with different titles
   *
   * @memberof SearchProduct
   */
  renderSectionHeader = ({ section: { title } }) => (
    <HeaderContainer>
      <BodyCopy
        fontWeight="regular"
        color="gray.900"
        mobileFontFamily="secondary"
        fontSize="fs13"
        text={title}
      />
    </HeaderContainer>
  );

  /**
   * @function renderItem
   * renders an item in list
   *
   * @memberof SearchProduct
   */
  renderItem = ({ item }) => {
    const { text } = item;
    const { searchText } = this.state;
    const indexOfSearchText = text.toLowerCase().indexOf(searchText.toLowerCase());
    const searchTextAvailable = indexOfSearchText > -1 && searchText.length > 0;
    let prefix = '';
    let suffix = '';
    let current = text;
    let currentFontWeight = 'regular';

    if (searchTextAvailable) {
      prefix = text.substring(0, indexOfSearchText);
      suffix = text.substring(indexOfSearchText + searchText.length);
      current = text.substring(indexOfSearchText, indexOfSearchText + searchText.length);
      currentFontWeight = 'semibold';
    }

    return (
      <ItemContainer onPress={() => this.searchProducts(text)}>
        {prefix.length > 0 && (
          <BodyCopy
            fontWeight="regular"
            color="gray.900"
            mobileFontFamily="secondary"
            fontSize="fs13"
            text={prefix}
          />
        )}
        <BodyCopy
          fontWeight={currentFontWeight}
          color="gray.900"
          mobileFontFamily="secondary"
          fontSize="fs13"
          text={current}
        />
        {suffix.length > 0 && (
          <BodyCopy
            fontWeight="regular"
            color="gray.900"
            mobileFontFamily="secondary"
            fontSize="fs13"
            text={suffix}
          />
        )}
      </ItemContainer>
    );
  };

  /**
   * @function keyExtractor
   * returns key for list data
   *
   * @memberof SearchProduct
   */
  keyExtractor = (_, index) => index.toString();

  render() {
    const { modalVisible, showRecentSearches, extraDataForSearch, listData } = this.state;
    const data = showRecentSearches ? [] : listData;

    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={this.closeModal}
      >
        <SafeAreaView>
          {this.renderSearchContainer()}
          <SectionList
            sections={data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
            keyboardShouldPersistTaps="handled"
            stickySectionHeadersEnabled={false}
            extraData={extraDataForSearch}
          />
        </SafeAreaView>
      </Modal>
    );
  }
}

/* PropTypes declaration */
SearchProduct.propTypes = {
  closeSearchModal: PropTypes.func,
  goToSearchResultsPage: PropTypes.func,
  startSearch: PropTypes.func,
  labels: PropTypes.instanceOf(Object),
  searchResults: PropTypes.instanceOf(Object),
};

SearchProduct.defaultProps = {
  closeSearchModal: null,
  goToSearchResultsPage: null,
  startSearch: null,
  labels: null,
  searchResults: {},
};

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.Search,
    searchResults: state.Search && state.Search.searchResults,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    startSearch: searchTerm => {
      dispatch(getSearchResult(searchTerm));
    },
  };
};

/* Export */
export { SearchProduct as SearchProductVanilla };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProduct);
