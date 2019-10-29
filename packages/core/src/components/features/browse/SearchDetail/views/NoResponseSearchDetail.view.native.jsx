import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { getLabelValue } from '@tcp/core/src/utils/utils';
import { SearchBar } from '@tcp/core/src/components/common/molecules';
import SearchProduct from '@tcp/core/src/components/common/organisms/SearchProduct';
import { navigateToNestedRoute } from '@tcp/core/src/utils';
import withStyles from '../../../../common/hoc/withStyles';
import {
  styles,
  PageContainer,
  RowContainer,
  AnchorContainer,
} from '../NoResponseSearchDetail.style.native';
import { BodyCopy, Anchor } from '../../../../common/atoms';

class NoResponseSearchDetailView extends React.PureComponent {
  // eslint-disable-next-line
  constructor(props) {
    super(props);

    this.state = {
      showSearchModal: false,
    };
  }

  /**
   * @function openSearchProductPage
   * opens search product modal
   */
  openSearchProductPage = () => {
    this.setState({ showSearchModal: true });
  };

  /**
   * @function closeSearchProductPage
   * closes search product modal
   */
  closeSearchProductPage = () => {
    this.setState({ showSearchModal: false });
  };

  goToSearchResultsPage = searchText => {
    this.closeSearchProductPage();
    const { navigation } = this.props;
    navigateToNestedRoute(navigation, 'HomeStack', 'SearchDetail', {
      title: searchText,
      isForceUpdate: true,
    });
  };

  renderSearchTopSection = () => {
    const { slpLabels, searchedText } = this.props;
    if (searchedText !== undefined) {
      return (
        <BodyCopy
          margin="16px 0 0 12px"
          dataLocator="slp_store_name_value"
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="semibold"
          color="gray.900"
          text={`${slpLabels.lbl_nothing_matched} "${searchedText}".`}
        />
      );
    }
    return null;
  };

  render() {
    const { slpLabels, searchResultSuggestions, labels } = this.props;

    const { showSearchModal } = this.state;

    const searchResultSuggestionsArg =
      searchResultSuggestions && searchResultSuggestions.length
        ? searchResultSuggestions.map(searchSuggestion => searchSuggestion.suggestion)
        : slpLabels.lbl_no_suggestion;

    const ProductMatchesLabel = () => {
      return (
        <BodyCopy fontFamily="secondary" className="boxHead matchProductHead">
          {getLabelValue(labels, 'lbl_search_product_matches')}
        </BodyCopy>
      );
    };

    const didYouMeanText = (text, suggestion) => {
      return (
        <BodyCopy
          margin="12px 0 0 0"
          dataLocator="slp_store_name_value"
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="semibold"
          color={suggestion ? 'blue.800' : 'gray.900'}
          text={text}
        />
      );
    };

    const lblTrySearching = slpLabels.lbl_try_searching && slpLabels.lbl_try_searching.split('(');

    return (
      <PageContainer>
        {this.renderSearchTopSection()}

        {searchResultSuggestionsArg !== slpLabels.lbl_no_suggestion && (
          <RowContainer>
            {didYouMeanText(`${slpLabels.lbl_didYouMean} `, false)}
            <Anchor
              customStyle={AnchorContainer}
              onPress={() => this.goToSearchResultsPage(searchResultSuggestionsArg.toString())}
            >
              {didYouMeanText(`"${searchResultSuggestionsArg}"`, true)}
              {didYouMeanText('?', false)}
            </Anchor>
          </RowContainer>
        )}

        <SearchBar
          showCustomizedSearch
          openSearchProductPage={this.openSearchProductPage}
          labels={slpLabels}
        />
        {showSearchModal && (
          <SearchProduct
            closeSearchModal={this.closeSearchProductPage}
            goToSearchResultsPage={this.goToSearchResultsPage}
          />
        )}

        <BodyCopy
          margin="68px 0 0 0"
          dataLocator="slp_store_name_value"
          fontFamily="secondary"
          fontSize="fs12"
          fontWeight="black"
          color="gray.900"
          text={`${slpLabels.lbl_tips}`}
        />
        <BodyCopy
          margin="6px 0 0 0"
          dataLocator="slp_store_name_value"
          fontFamily="secondary"
          fontSize="fs12"
          color="gray.1000"
          text={`${slpLabels.lbl_check_your_spelling}`}
        />
        <BodyCopy
          dataLocator="slp_store_name_value"
          fontFamily="secondary"
          fontSize="fs12"
          color="gray.1000"
          text={`${slpLabels.lbl_simplified_keywords}`}
        />
        {lblTrySearching && (
          <BodyCopy
            dataLocator="slp_store_name_value"
            fontFamily="secondary"
            fontSize="fs12"
            color="gray.1000"
            text={`${lblTrySearching[0]}`}
          />
        )}
        {lblTrySearching && (
          <BodyCopy
            dataLocator="slp_store_name_value"
            fontFamily="secondary"
            fontSize="fs12"
            color="gray.1000"
            text={`(${lblTrySearching[1]}`}
          />
        )}
        <BodyCopy
          dataLocator="slp_store_name_value"
          fontFamily="secondary"
          fontSize="fs12"
          color="gray.1000"
          text={`${slpLabels.lbl_narrow_searches}`}
        />
        <ProductMatchesLabel />
      </PageContainer>
    );
  }
}

NoResponseSearchDetailView.propTypes = {
  searchedText: PropTypes.string,
  slpLabels: PropTypes.shape({}),
  labels: PropTypes.shape({
    lbl_search_whats_trending: PropTypes.string,
    lbl_search_recent_search: PropTypes.string,
    lbl_search_looking_for: PropTypes.string,
    lbl_search_product_matches: PropTypes.string,
  }),
  navigation: PropTypes.shape({}).isRequired,
  searchResultSuggestions: PropTypes.arrayOf(PropTypes.shape({})),
};

NoResponseSearchDetailView.defaultProps = {
  searchedText: '',
  slpLabels: {},
  labels: PropTypes.shape({
    lbl_search_whats_trending: '',
    lbl_search_recent_search: '',
    lbl_search_looking_for: '',
    lbl_search_product_matches: '',
  }),
  searchResultSuggestions: [],
};

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.Search,
  };
};

export default connect(
  mapStateToProps,
  {}
)(withStyles(NoResponseSearchDetailView, styles));
export { NoResponseSearchDetailView as NoResponseSearchDetailVanilla };
